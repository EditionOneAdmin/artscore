// ArtScore — App Logic
// Search, Render, Charts

(function() {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // DOM refs
  const hero = $('.hero');
  const searchInput = $('#search-input');
  const dropdown = $('#search-dropdown');
  const dashboard = $('#dashboard');
  const suggestions = $('.hero-suggestions');

  // State
  let activeDropdownIndex = -1;
  let currentArtist = null;
  let priceChart = null;

  // Color palette for charts
  const CHART_COLORS = ['#58a6ff', '#e3b341', '#3fb950', '#f85149', '#bc8cff', '#f0883e', '#39d2c0', '#8b949e'];
  const PERIOD_COLORS = ['#f85149', '#f0883e', '#e3b341', '#3fb950', '#58a6ff', '#bc8cff', '#39d2c0', '#8b949e'];

  // ── Formatters ──────────────────────────────────────────
  function formatCurrency(val, compact = true) {
    if (val == null) return '—';
    const abs = Math.abs(val);
    if (compact) {
      if (abs >= 1e9) return '€' + (val / 1e9).toFixed(1) + 'B';
      if (abs >= 1e6) return '€' + (val / 1e6).toFixed(1) + 'M';
      if (abs >= 1e3) return '€' + (val / 1e3).toFixed(0) + 'K';
    }
    return '€' + val.toLocaleString('en-US');
  }

  function formatNumber(val) {
    if (val == null) return '—';
    return val.toLocaleString('en-US');
  }

  function formatPercent(val) {
    if (val == null) return '—';
    return val.toFixed(1) + '%';
  }

  function getScoreClass(score) {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 55) return 'score-average';
    if (score >= 40) return 'score-poor';
    return 'score-bad';
  }

  function getScoreGradient(score) {
    if (score >= 85) return 'linear-gradient(90deg, #3fb950, #58a6ff)';
    if (score >= 70) return 'linear-gradient(90deg, #58a6ff, #bc8cff)';
    if (score >= 55) return 'linear-gradient(90deg, #e3b341, #f0883e)';
    return 'linear-gradient(90deg, #f0883e, #f85149)';
  }

  function getTrendIcon(val) {
    return val >= 0 ? '↑' : '↓';
  }

  function saleBadge(hammer, low, high) {
    if (hammer > high) {
      const pct = (((hammer - high) / high) * 100).toFixed(0);
      return `<span class="sale-badge over">+${pct}% Over</span>`;
    }
    if (hammer < low) {
      const pct = (((low - hammer) / low) * 100).toFixed(0);
      return `<span class="sale-badge under">-${pct}% Under</span>`;
    }
    return `<span class="sale-badge within">Within</span>`;
  }

  // ── Animated counter ────────────────────────────────────
  function animateValue(el, end, duration = 1200, formatter = formatNumber) {
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = formatter(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── Search Logic ────────────────────────────────────────
  searchInput.addEventListener('input', function() {
    const q = this.value.trim();
    if (q.length === 0) {
      dropdown.classList.remove('active');
      activeDropdownIndex = -1;
      return;
    }

    const results = searchArtists(q);
    if (results.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    renderDropdown(results);
    dropdown.classList.add('active');
    activeDropdownIndex = -1;
  });

  searchInput.addEventListener('keydown', function(e) {
    const items = $$('.search-dropdown-item', dropdown);
    if (!dropdown.classList.contains('active') || items.length === 0) {
      if (e.key === 'Enter') {
        const results = searchArtists(this.value.trim());
        if (results.length > 0) selectArtist(results[0]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeDropdownIndex = Math.min(activeDropdownIndex + 1, items.length - 1);
      updateDropdownHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeDropdownIndex = Math.max(activeDropdownIndex - 1, 0);
      updateDropdownHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeDropdownIndex >= 0) {
        items[activeDropdownIndex].click();
      } else {
        const results = searchArtists(this.value.trim());
        if (results.length > 0) selectArtist(results[0]);
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  searchInput.addEventListener('focus', function() {
    if (this.value.trim().length > 0) {
      const results = searchArtists(this.value.trim());
      if (results.length > 0) {
        renderDropdown(results);
        dropdown.classList.add('active');
      }
    }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      dropdown.classList.remove('active');
    }
  });

  function renderDropdown(artists) {
    dropdown.innerHTML = artists.map((a, i) => `
      <div class="search-dropdown-item" data-slug="${a.slug}">
        <div class="artist-info">
          <span class="artist-flag">${a.flag}</span>
          <div>
            <div class="artist-name">${a.name}</div>
            <div class="artist-meta">${a.nationality} · ${a.mediums.slice(0, 2).join(', ')} · ${a.movements[0]}</div>
          </div>
        </div>
        <span class="artist-score ${getScoreClass(a.marketScore)}">${a.marketScore}/100</span>
      </div>
    `).join('');

    $$('.search-dropdown-item', dropdown).forEach(item => {
      item.addEventListener('click', () => {
        const artist = getArtistBySlug(item.dataset.slug);
        if (artist) selectArtist(artist);
      });
    });
  }

  function updateDropdownHighlight(items) {
    items.forEach((el, i) => {
      el.classList.toggle('active', i === activeDropdownIndex);
    });
  }

  // ── Suggestion Clicks ───────────────────────────────────
  $$('.suggestion-link').forEach(link => {
    link.addEventListener('click', function() {
      const slug = this.dataset.slug;
      const artist = getArtistBySlug(slug);
      if (artist) {
        searchInput.value = artist.name;
        selectArtist(artist);
      }
    });
  });

  // ── Select Artist ───────────────────────────────────────
  function selectArtist(artist) {
    currentArtist = artist;
    searchInput.value = artist.name;
    dropdown.classList.remove('active');
    hero.classList.add('collapsed');
    dashboard.classList.add('active');
    renderDashboard(artist);
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Back to Search ──────────────────────────────────────
  window.goBack = function() {
    hero.classList.remove('collapsed');
    dashboard.classList.remove('active');
    dashboard.innerHTML = '';
    searchInput.value = '';
    searchInput.focus();
    if (priceChart) { priceChart.destroy(); priceChart = null; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Render Dashboard ────────────────────────────────────
  function renderDashboard(a) {
    if (priceChart) { priceChart.destroy(); priceChart = null; }

    const lifespan = a.died ? `${a.born}–${a.died}` : `b. ${a.born}`;

    dashboard.innerHTML = `
      <button class="back-btn" onclick="goBack()">← Back to Search</button>

      <!-- HEADER -->
      <div class="artist-header">
        <div class="artist-header-top">
          <div class="artist-header-left">
            <div class="artist-name-row">
              <span class="artist-flag-large">${a.flag}</span>
              <span class="artist-name-large">${a.name}</span>
            </div>
            <div class="artist-dates">${a.nationality} · ${lifespan}</div>
            <div class="artist-based">${a.based}</div>
            <div class="artist-tags">
              ${a.mediums.map(m => `<span class="tag tag-medium">${m}</span>`).join('')}
              ${a.movements.map(m => `<span class="tag tag-movement">${m}</span>`).join('')}
            </div>
          </div>
          <div class="market-score-widget">
            <div class="market-score-label">Market Score</div>
            <div class="market-score-number ${getScoreClass(a.marketScore)}" id="score-num">0</div>
            <div class="market-score-bar">
              <div class="market-score-fill" id="score-bar" style="width: 0%; background: ${getScoreGradient(a.marketScore)}"></div>
            </div>
            <div class="trend-badge ${a.trend12m >= 0 ? 'positive' : 'negative'}">
              ${getTrendIcon(a.trend12m)} ${a.trend12m >= 0 ? '+' : ''}${a.trend12m}% 12M
            </div>
          </div>
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Lots</div>
          <div class="kpi-value" id="kpi-lots">0</div>
          <div class="kpi-sub">All-time auction lots</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Sell-Through Rate</div>
          <div class="kpi-value" id="kpi-str">0%</div>
          <div class="kpi-sub">% lots sold at auction</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Avg Hammer Price</div>
          <div class="kpi-value" id="kpi-avg">€0</div>
          <div class="kpi-sub">Across all categories</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Median Hammer</div>
          <div class="kpi-value" id="kpi-median">€0</div>
          <div class="kpi-sub">50th percentile</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Market Vol. 12M</div>
          <div class="kpi-value" id="kpi-vol">€0</div>
          <div class="kpi-sub">Last 12 months turnover</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">All-Time Record</div>
          <div class="kpi-value" id="kpi-record">€0</div>
          <div class="kpi-record-detail">"${a.kpis.allTimeHigh.title}" · ${a.kpis.allTimeHigh.year} · ${a.kpis.allTimeHigh.house}</div>
        </div>
      </div>

      <!-- PRICE HISTORY CHART -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">📈</span> Price History</div>
        <div class="chart-container">
          <canvas id="price-chart"></canvas>
        </div>
      </div>

      <!-- PRICE TIERS -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">📊</span> Price Tier Breakdown</div>
        <div style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Avg Price</th>
                <th>Price Range</th>
                <th>% Volume</th>
                <th>Sell-Through</th>
              </tr>
            </thead>
            <tbody>
              ${a.priceTiers.map(t => `
                <tr>
                  <td style="font-weight:600">${t.type}</td>
                  <td>${formatCurrency(t.avgPrice)}</td>
                  <td style="color:var(--text-secondary)">${t.range}</td>
                  <td>${t.volumePercent}%</td>
                  <td>
                    <span style="color: ${t.sellThrough >= 75 ? 'var(--green)' : t.sellThrough >= 60 ? 'var(--gold)' : 'var(--red)'}; font-weight:600">${t.sellThrough}%</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- CREATIVE PERIODS -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">🎨</span> Creative Periods & Phases</div>
        <div class="periods-container" id="periods-container">
          ${renderPeriods(a.periods)}
        </div>
      </div>

      <!-- DISTRIBUTIONS -->
      <div class="section-grid-row">
        <div class="section-card">
          <div class="section-title"><span class="section-title-icon">🏛️</span> Auction House Distribution</div>
          <div id="auction-dist"></div>
        </div>
        <div class="section-card">
          <div class="section-title"><span class="section-title-icon">🌍</span> Geographic Distribution</div>
          <div id="geo-dist"></div>
        </div>
      </div>

      <!-- COMPARABLES -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">👥</span> Comparable Artists (Peer Group)</div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Artist</th>
                <th>Score</th>
                <th>Avg Price</th>
                <th>Correlation</th>
              </tr>
            </thead>
            <tbody>
              ${a.comparables.map(c => `
                <tr>
                  <td style="font-weight:600">${c.name}</td>
                  <td><span class="${getScoreClass(c.score)}" style="font-weight:700">${c.score}/100</span></td>
                  <td>${formatCurrency(c.avgPrice)}</td>
                  <td>
                    <div class="correlation-bar">
                      <div class="correlation-track"><div class="correlation-fill" style="width:${c.correlation * 100}%"></div></div>
                      <span style="font-variant-numeric:tabular-nums; color:var(--text-secondary)">${c.correlation.toFixed(2)}</span>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- RECENT SALES -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">🔨</span> Recent Notable Sales</div>
        <div style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Work</th>
                <th>Date</th>
                <th>House</th>
                <th>Estimate</th>
                <th>Hammer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              ${a.recentSales.map(s => `
                <tr>
                  <td class="sale-title" title="${s.title}">${s.title}</td>
                  <td style="font-variant-numeric:tabular-nums; white-space:nowrap">${new Date(s.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric'})}</td>
                  <td class="sale-house">${s.house}</td>
                  <td class="sale-estimate">${formatCurrency(s.estimateLow)}–${formatCurrency(s.estimateHigh)}</td>
                  <td class="sale-hammer" style="color:var(--gold)">${formatCurrency(s.hammer)}</td>
                  <td>${saleBadge(s.hammer, s.estimateLow, s.estimateHigh)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- MARKET SUMMARY -->
      <div class="section-card">
        <div class="section-title"><span class="section-title-icon">📝</span> Market Summary & Outlook</div>
        <div class="market-summary-text">
          ${a.marketSummary.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
    `;

    // Animate score
    requestAnimationFrame(() => {
      const scoreEl = $('#score-num');
      const scoreBar = $('#score-bar');
      animateValue(scoreEl, a.marketScore, 1500, v => v);
      setTimeout(() => { scoreBar.style.width = a.marketScore + '%'; }, 100);

      // Animate KPIs
      animateValue($('#kpi-lots'), a.kpis.totalLots, 1200, formatNumber);
      animateValue($('#kpi-str'), a.kpis.sellThroughRate, 1200, v => v + '%');
      animateValue($('#kpi-avg'), a.kpis.avgHammerPrice, 1200, formatCurrency);
      animateValue($('#kpi-median'), a.kpis.medianHammerPrice, 1200, formatCurrency);
      animateValue($('#kpi-vol'), a.kpis.marketVolume12m, 1200, formatCurrency);
      animateValue($('#kpi-record'), a.kpis.allTimeHigh.price, 1200, formatCurrency);

      // Render chart
      renderPriceChart(a);

      // Render distributions
      renderHBarDistribution('#auction-dist', a.auctionHouseDistribution, 'house');
      renderHBarDistribution('#geo-dist', a.geographicDistribution, 'city');

      // Animate period bars
      setTimeout(() => {
        $$('.period-bar').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 200);
    });
  }

  // ── Periods ─────────────────────────────────────────────
  function renderPeriods(periods) {
    const maxPrice = Math.max(...periods.map(p => p.avgPrice));
    return periods.map((p, i) => {
      const widthPct = Math.max((p.avgPrice / maxPrice) * 100, 8);
      const color = PERIOD_COLORS[i % PERIOD_COLORS.length];
      return `
        <div class="period-row">
          <div>
            <div class="period-name">${p.name}</div>
            <div class="period-years">${p.years}</div>
          </div>
          <div style="font-size:0.85rem;font-weight:700;font-variant-numeric:tabular-nums;color:var(--gold)">${formatCurrency(p.avgPrice)}</div>
          <div class="period-bar-container">
            <div class="period-bar" style="width:0;background:${color}" data-width="${widthPct}%">${formatCurrency(p.avgPrice)}</div>
          </div>
          <div class="period-works">${p.works} works</div>
          <div class="period-trend ${p.trend}">${p.trend === 'rising' ? '▲ Rising' : p.trend === 'declining' ? '▼ Declining' : '● Stable'}</div>
        </div>
      `;
    }).join('');
  }

  // ── H-Bar Distribution ──────────────────────────────────
  function renderHBarDistribution(selector, data, labelKey) {
    const container = $(selector);
    const maxPct = Math.max(...data.map(d => d.percent));

    container.innerHTML = data.map((d, i) => {
      const color = CHART_COLORS[i % CHART_COLORS.length];
      const w = (d.percent / maxPct) * 100;
      return `
        <div class="hbar-row">
          <div class="hbar-label">${d[labelKey]}</div>
          <div class="hbar-track">
            <div class="hbar-fill" style="width:${w}%;background:${color}">${d.percent}%</div>
          </div>
          <div class="hbar-value" style="color:${color}">${d.percent}%</div>
        </div>
      `;
    }).join('');
  }

  // ── Price History Chart ─────────────────────────────────
  function renderPriceChart(a) {
    const ctx = document.getElementById('price-chart');
    if (!ctx) return;

    const labels = a.priceHistory.map(p => p.year);
    const avgData = a.priceHistory.map(p => p.avg);
    const medianData = a.priceHistory.map(p => p.median);
    const highData = a.priceHistory.map(p => p.high);

    priceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Average Hammer',
            data: avgData,
            borderColor: '#58a6ff',
            backgroundColor: 'rgba(88, 166, 255, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#58a6ff',
            pointBorderColor: '#0d1117',
            pointBorderWidth: 2,
          },
          {
            label: 'Median Hammer',
            data: medianData,
            borderColor: '#e3b341',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [6, 3],
            fill: false,
            tension: 0.3,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: '#e3b341',
            pointBorderColor: '#0d1117',
            pointBorderWidth: 2,
          },
          {
            label: 'Record Sale',
            data: highData,
            borderColor: 'rgba(248, 81, 73, 0.4)',
            backgroundColor: 'rgba(248, 81, 73, 0.06)',
            borderWidth: 1.5,
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#f85149',
            pointBorderColor: '#0d1117',
            pointBorderWidth: 2,
            pointStyle: 'rectRot',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#8b949e',
              font: { family: 'Inter', size: 11, weight: 500 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              boxWidth: 8,
            }
          },
          tooltip: {
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            titleColor: '#f0f6fc',
            bodyColor: '#8b949e',
            borderColor: 'rgba(240, 246, 252, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter', weight: 700 },
            bodyFont: { family: 'Inter', weight: 500 },
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': ' + formatCurrency(ctx.raw, true);
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(240, 246, 252, 0.04)',
              drawBorder: false,
            },
            ticks: {
              color: '#6e7681',
              font: { family: 'Inter', size: 11 },
            }
          },
          y: {
            grid: {
              color: 'rgba(240, 246, 252, 0.04)',
              drawBorder: false,
            },
            ticks: {
              color: '#6e7681',
              font: { family: 'Inter', size: 11 },
              callback: function(value) {
                return formatCurrency(value, true);
              }
            },
            beginAtZero: false,
          }
        }
      }
    });
  }

  // ── Keyboard shortcut (/) to focus search ───────────────
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // ── Initial focus ───────────────────────────────────────
  searchInput.focus();

  // ══════════════════════════════════════════════════════════
  // ── COMPARE MODE ──────────────────────────────────────────
  // ══════════════════════════════════════════════════════════

  const compareSection = $('#compare-section');
  const compareDashboard = $('#compare-dashboard');
  const compareInputA = $('#compare-input-a');
  const compareInputB = $('#compare-input-b');
  const compareDropdownA = $('#compare-dropdown-a');
  const compareDropdownB = $('#compare-dropdown-b');
  const compareBtn = $('#compare-btn');
  const navBtns = $$('.topbar-nav-btn');

  let compareArtistA = null;
  let compareArtistB = null;
  let compareCharts = [];

  // ── Mode Switching ──────────────────────────────────────
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.dataset.mode;
      navBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (mode === 'explore') {
        compareSection.classList.remove('active');
        hero.style.display = '';
        if (currentArtist) {
          dashboard.style.display = '';
        }
        destroyCompareCharts();
      } else {
        hero.style.display = 'none';
        dashboard.style.display = 'none';
        dashboard.classList.remove('active');
        compareSection.classList.add('active');
      }
    });
  });

  // ── Compare Search Logic ────────────────────────────────
  function setupCompareSearch(input, dropdown, side) {
    input.addEventListener('input', function() {
      const q = this.value.trim();
      if (q.length === 0) {
        dropdown.classList.remove('active');
        if (side === 'a') compareArtistA = null;
        else compareArtistB = null;
        input.classList.remove('selected');
        updateCompareBtn();
        return;
      }
      const results = searchArtists(q);
      if (results.length === 0) { dropdown.classList.remove('active'); return; }
      renderCompareDropdown(dropdown, results, input, side);
      dropdown.classList.add('active');
    });

    input.addEventListener('focus', function() {
      if (this.value.trim().length > 0) {
        const results = searchArtists(this.value.trim());
        if (results.length > 0) {
          renderCompareDropdown(dropdown, results, input, side);
          dropdown.classList.add('active');
        }
      }
    });
  }

  function renderCompareDropdown(dropdown, artists, input, side) {
    dropdown.innerHTML = artists.map(a => `
      <div class="compare-dropdown-item" data-slug="${a.slug}">
        <span class="cdi-name">${a.flag} ${a.name}</span>
        <span class="cdi-score ${getScoreClass(a.marketScore)}">${a.marketScore}</span>
      </div>
    `).join('');

    $$('.compare-dropdown-item', dropdown).forEach(item => {
      item.addEventListener('click', () => {
        const artist = getArtistBySlug(item.dataset.slug);
        if (!artist) return;
        input.value = artist.name;
        input.classList.add('selected');
        dropdown.classList.remove('active');
        if (side === 'a') compareArtistA = artist;
        else compareArtistB = artist;
        updateCompareBtn();
      });
    });
  }

  function updateCompareBtn() {
    compareBtn.disabled = !(compareArtistA && compareArtistB);
  }

  setupCompareSearch(compareInputA, compareDropdownA, 'a');
  setupCompareSearch(compareInputB, compareDropdownB, 'b');

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.compare-search-wrapper')) {
      compareDropdownA.classList.remove('active');
      compareDropdownB.classList.remove('active');
    }
  });

  // ── Compare Button Click ────────────────────────────────
  compareBtn.addEventListener('click', function() {
    if (!compareArtistA || !compareArtistB) return;
    renderComparison(compareArtistA, compareArtistB);
  });

  // ── Suggestion Links ────────────────────────────────────
  $$('.compare-suggestion-link').forEach(link => {
    link.addEventListener('click', function() {
      const a = getArtistBySlug(this.dataset.a);
      const b = getArtistBySlug(this.dataset.b);
      if (a && b) {
        compareArtistA = a;
        compareArtistB = b;
        compareInputA.value = a.name;
        compareInputB.value = b.name;
        compareInputA.classList.add('selected');
        compareInputB.classList.add('selected');
        updateCompareBtn();
        renderComparison(a, b);
      }
    });
  });

  // ── Hero Compare Button ─────────────────────────────────
  const heroCompareBtn = document.getElementById('hero-compare-btn');
  if (heroCompareBtn) {
    heroCompareBtn.addEventListener('click', function() {
      // Switch to compare mode
      navBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('.topbar-nav-btn[data-mode="compare"]').classList.add('active');
      hero.style.display = 'none';
      dashboard.style.display = 'none';
      dashboard.classList.remove('active');
      compareSection.classList.add('active');
      // Focus first input
      setTimeout(() => compareInputA.focus(), 300);
    });
  }

  // ── Destroy Compare Charts ──────────────────────────────
  function destroyCompareCharts() {
    compareCharts.forEach(c => c.destroy());
    compareCharts = [];
  }

  // ── Render Comparison Dashboard ─────────────────────────
  function renderComparison(a, b) {
    destroyCompareCharts();

    // Build unified year range
    const allYearsA = a.priceHistory.map(p => p.year);
    const allYearsB = b.priceHistory.map(p => p.year);
    const minYear = Math.min(allYearsA[0], allYearsB[0]);
    const maxYear = Math.max(allYearsA[allYearsA.length - 1], allYearsB[allYearsB.length - 1]);
    const years = [];
    for (let y = minYear; y <= maxYear; y++) years.push(y);

    const mapByYear = (hist) => {
      const m = {};
      hist.forEach(p => m[p.year] = p);
      return m;
    };
    const mapA = mapByYear(a.priceHistory);
    const mapB = mapByYear(b.priceHistory);

    const dataA = years.map(y => mapA[y] ? mapA[y].avg : null);
    const dataB = years.map(y => mapB[y] ? mapB[y].avg : null);

    // Normalized data
    const firstA = a.priceHistory[0].avg;
    const firstB = b.priceHistory[0].avg;
    const normA = years.map(y => mapA[y] ? (mapA[y].avg / firstA) * 100 : null);
    const normB = years.map(y => mapB[y] ? (mapB[y].avg / firstB) * 100 : null);

    // KPI faceoff data
    const kpis = [
      { label: 'Market Score', valA: a.marketScore, valB: b.marketScore, fmtA: a.marketScore + '/100', fmtB: b.marketScore + '/100', higher: true },
      { label: 'Total Lots', valA: a.kpis.totalLots, valB: b.kpis.totalLots, fmtA: formatNumber(a.kpis.totalLots), fmtB: formatNumber(b.kpis.totalLots), higher: true },
      { label: 'Sell-Through', valA: a.kpis.sellThroughRate, valB: b.kpis.sellThroughRate, fmtA: a.kpis.sellThroughRate + '%', fmtB: b.kpis.sellThroughRate + '%', higher: true },
      { label: 'Avg Price', valA: a.kpis.avgHammerPrice, valB: b.kpis.avgHammerPrice, fmtA: formatCurrency(a.kpis.avgHammerPrice), fmtB: formatCurrency(b.kpis.avgHammerPrice), higher: true },
      { label: 'All-Time High', valA: a.kpis.allTimeHigh.price, valB: b.kpis.allTimeHigh.price, fmtA: formatCurrency(a.kpis.allTimeHigh.price), fmtB: formatCurrency(b.kpis.allTimeHigh.price), higher: true },
      { label: '12M Volume', valA: a.kpis.marketVolume12m, valB: b.kpis.marketVolume12m, fmtA: formatCurrency(a.kpis.marketVolume12m), fmtB: formatCurrency(b.kpis.marketVolume12m), higher: true },
      { label: '12M Trend', valA: a.trend12m, valB: b.trend12m, fmtA: (a.trend12m >= 0 ? '+' : '') + a.trend12m + '%', fmtB: (b.trend12m >= 0 ? '+' : '') + b.trend12m + '%', higher: true }
    ];

    compareDashboard.innerHTML = `
      <!-- PRICE HISTORY OVERLAY -->
      <div class="compare-chart-card">
        <div class="section-title"><span class="section-title-icon">📈</span> Market Maturation Comparison</div>
        <div class="compare-chart-container">
          <canvas id="compare-price-chart"></canvas>
        </div>
      </div>

      <!-- NORMALIZED CHART -->
      <div class="compare-chart-card">
        <div class="section-title"><span class="section-title-icon">📊</span> Relative Growth Index (Base = 100)</div>
        <div class="compare-chart-container">
          <canvas id="compare-norm-chart"></canvas>
        </div>
      </div>

      <!-- KPI FACEOFF -->
      <div class="compare-chart-card">
        <div class="section-title"><span class="section-title-icon">⚡</span> KPI Face-Off</div>
        <table class="kpi-faceoff">
          <thead>
            <tr>
              <th>Metric</th>
              <th class="artist-a-head">${a.flag} ${a.name}</th>
              <th class="vs-head">vs</th>
              <th class="artist-b-head">${b.flag} ${b.name}</th>
            </tr>
          </thead>
          <tbody>
            ${kpis.map(k => {
              const aWins = k.higher ? k.valA > k.valB : k.valA < k.valB;
              const tie = k.valA === k.valB;
              const arrowA = tie ? '—' : (aWins ? '◄' : '');
              const arrowB = tie ? '' : (aWins ? '' : '◄');
              return `<tr>
                <td class="metric-label">${k.label}</td>
                <td class="val-a ${aWins && !tie ? 'winner' : 'loser'}">${k.fmtA}</td>
                <td class="vs-col"><span class="arrow-win">${aWins && !tie ? '◄' : (!tie ? '►' : '—')}</span></td>
                <td class="val-b ${!aWins && !tie ? 'winner' : 'loser'}">${k.fmtB}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- AUCTION HOUSE COMPARISON -->
      <div class="compare-chart-card">
        <div class="section-title"><span class="section-title-icon">🏛️</span> Auction House Comparison</div>
        <div class="compare-dist-row">
          <div class="compare-dist-col compare-dist-col-a">
            <h3>${a.flag} ${a.name}</h3>
            <div id="compare-auction-a"></div>
          </div>
          <div class="compare-dist-col compare-dist-col-b">
            <h3>${b.flag} ${b.name}</h3>
            <div id="compare-auction-b"></div>
          </div>
        </div>
      </div>

      <!-- GEOGRAPHIC COMPARISON -->
      <div class="compare-chart-card">
        <div class="section-title"><span class="section-title-icon">🌍</span> Geographic Comparison</div>
        <div class="compare-dist-row">
          <div class="compare-dist-col compare-dist-col-a">
            <h3>${a.flag} ${a.name}</h3>
            <div id="compare-geo-a"></div>
          </div>
          <div class="compare-dist-col compare-dist-col-b">
            <h3>${b.flag} ${b.name}</h3>
            <div id="compare-geo-b"></div>
          </div>
        </div>
      </div>
    `;

    // Render charts
    requestAnimationFrame(() => {
      renderCompareLineChart('compare-price-chart', years, dataA, dataB, a.name, b.name, false);
      renderCompareLineChart('compare-norm-chart', years, normA, normB, a.name, b.name, true);
      renderHBarDistribution('#compare-auction-a', a.auctionHouseDistribution, 'house');
      renderHBarDistribution('#compare-auction-b', b.auctionHouseDistribution, 'house');
      renderHBarDistribution('#compare-geo-a', a.geographicDistribution, 'city');
      renderHBarDistribution('#compare-geo-b', b.geographicDistribution, 'city');
    });

    compareDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Compare Line Chart ──────────────────────────────────
  function renderCompareLineChart(canvasId, labels, dataA, dataB, nameA, nameB, isNormalized) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: nameA,
            data: dataA,
            borderColor: '#58a6ff',
            backgroundColor: 'rgba(88, 166, 255, 0.08)',
            borderWidth: 2.5,
            fill: false,
            tension: 0.3,
            pointRadius: 2,
            pointHoverRadius: 6,
            pointBackgroundColor: '#58a6ff',
            pointBorderColor: '#0d1117',
            pointBorderWidth: 2,
            spanGaps: false,
          },
          {
            label: nameB,
            data: dataB,
            borderColor: '#e3b341',
            backgroundColor: 'rgba(227, 179, 65, 0.08)',
            borderWidth: 2.5,
            fill: false,
            tension: 0.3,
            pointRadius: 2,
            pointHoverRadius: 6,
            pointBackgroundColor: '#e3b341',
            pointBorderColor: '#0d1117',
            pointBorderWidth: 2,
            spanGaps: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#8b949e',
              font: { family: 'Inter', size: 12, weight: 600 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              boxWidth: 10,
            }
          },
          tooltip: {
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            titleColor: '#f0f6fc',
            bodyColor: '#8b949e',
            borderColor: 'rgba(240, 246, 252, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter', weight: 700 },
            bodyFont: { family: 'Inter', weight: 500 },
            callbacks: {
              label: function(ctx) {
                if (ctx.raw == null) return null;
                if (isNormalized) return ctx.dataset.label + ': ' + ctx.raw.toFixed(0);
                return ctx.dataset.label + ': ' + formatCurrency(ctx.raw, true);
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(240, 246, 252, 0.04)', drawBorder: false },
            ticks: { color: '#6e7681', font: { family: 'Inter', size: 11 }, maxTicksLimit: 20 }
          },
          y: {
            grid: { color: 'rgba(240, 246, 252, 0.04)', drawBorder: false },
            ticks: {
              color: '#6e7681',
              font: { family: 'Inter', size: 11 },
              callback: function(value) {
                if (isNormalized) return value.toFixed(0);
                return formatCurrency(value, true);
              }
            },
            beginAtZero: false,
          }
        }
      }
    });
    compareCharts.push(chart);
  }

})();
