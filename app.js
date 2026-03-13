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

})();
