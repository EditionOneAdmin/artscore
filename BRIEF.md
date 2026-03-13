# ArtScore — Artist Market Intelligence MVP

## What to Build
A stunning single-page web app that functions as a "Bloomberg Terminal for Art". User searches for an artist → gets a full market intelligence card/dashboard.

## Tech
Vanilla HTML/CSS/JS (no build step). Must open directly in browser via index.html.

## Design Direction
- **DARK MODE.** Deep charcoal (#0d1117) background, not pure black.
- Accent colors: Electric blue (#58a6ff) for primary, Gold (#e3b341) for highlights, Green (#3fb950) for positive, Red (#f85149) for negative
- Typography: Inter (Google Fonts). Monospace numbers (tabular-nums).
- Glass-morphism cards with subtle borders (rgba white borders)
- Clean data visualization — think Bloomberg Terminal meets Stripe Dashboard
- Responsive but desktop-first (this is a pro tool)

## Core Feature: Artist Search → Market Card

### Search Bar (Hero)
- Big centered search bar: "Search any artist..."
- Autocomplete with artist suggestions as you type
- Pre-populated suggestions: "Try: Gerhard Richter, Banksy, KAWS, Yayoi Kusama, Jean-Michel Basquiat"

### The Artist Market Card (appears after search)

Since we can't access real auction price APIs without paid subscriptions, we'll use a **hybrid approach**:
- Use Artsy's public API (https://api.artsy.net/api/v1/) for real artist data (bio, nationality, dates, artworks)
- Generate REALISTIC mock auction/market data based on the artist's profile

**BUT: Create a rich, realistic mock dataset for these specific artists that we hardcode:**
1. Gerhard Richter
2. Banksy  
3. KAWS (Brian Donnelly)
4. Yayoi Kusama
5. Jean-Michel Basquiat
6. Damien Hirst
7. David Hockney
8. Yoshitomo Nara
9. Jeff Koons
10. Cecily Brown

For each artist, create a detailed mock data object with realistic numbers based on real art market knowledge.

### Card Layout (Dashboard Sections):

#### 1. HEADER BAR
- Artist name (large)
- Nationality flag emoji + birth/death dates
- Medium tags (Painting, Sculpture, Print, etc.)
- Movement tags (Contemporary, Pop Art, etc.)
- Market Score: X/100 with a colored progress bar
- 12-month trend arrow with percentage

#### 2. KEY METRICS ROW (6 KPI boxes in a grid)
Each box: big number + label + small trend indicator
- Total Lots at Auction (all time)
- Sell-Through Rate (%)
- Average Hammer Price (€)
- Median Hammer Price (€)
- Market Volume 12M (€)
- All-Time Record (€ + year)

#### 3. PRICE HISTORY CHART
- Use Canvas or a lightweight chart library (Chart.js via CDN is fine)
- Line chart showing average hammer price over years (at least 10 years)
- Include: Average line + Median line + Record sales as dots
- Tooltips on hover
- Y-axis in € with smart formatting (K, M)

#### 4. PRICE TIER BREAKDOWN (Table)
By work type (Oil Painting, Print/Edition, Work on Paper, Sculpture, Photography)
- Average Price
- Price Range  
- % of Volume
- Sell-Through Rate

#### 5. CREATIVE PERIODS / PHASES (Timeline)
This is the killer feature. A visual timeline showing:
- Period name + years
- Average price for works from that period
- Bar width proportional to value
- Color coding (hotter = more valuable)
- Number of works from that period at auction

#### 6. AUCTION HOUSE DISTRIBUTION
Horizontal bar chart or donut:
- Christie's %
- Sotheby's %
- Phillips %
- Others %

#### 7. GEOGRAPHIC DISTRIBUTION
Where works sell:
- New York %
- London %
- Hong Kong %
- Paris %
- Others %

#### 8. COMPARABLE ARTISTS (Peer Group)
Table with 3-5 comparable artists:
- Name
- Market Score
- Avg Price
- Price Correlation

#### 9. RECENT NOTABLE SALES
Table of last 5-8 significant sales:
- Title of work
- Sale date
- Auction house
- Estimate range
- Hammer price
- Over/Under estimate badge

#### 10. MARKET SUMMARY (AI-style text block)
2-3 paragraph text summary of the artist's market position, trends, and outlook.
Written in professional art advisory tone.

## Mock Data Structure (per artist)

```javascript
{
  name: "Gerhard Richter",
  slug: "gerhard-richter",
  nationality: "German",
  flag: "🇩🇪",
  born: 1932,
  died: null,
  based: "Cologne, Germany",
  mediums: ["Painting", "Photography", "Print"],
  movements: ["Abstract Art", "Photorealism", "Contemporary"],
  marketScore: 94,
  trend12m: +12.3,
  
  kpis: {
    totalLots: 3847,
    sellThroughRate: 78,
    avgHammerPrice: 485000,
    medianHammerPrice: 127000,
    marketVolume12m: 89200000,
    allTimeHigh: { price: 46300000, title: "Abstraktes Bild", year: 2015, house: "Sotheby's" }
  },
  
  priceHistory: [
    { year: 2014, avg: 820000, median: 95000, high: 5200000 },
    { year: 2015, avg: 1200000, median: 120000, high: 46300000 },
    // ... etc
  ],
  
  priceTiers: [
    { type: "Oil Painting", avgPrice: 1200000, range: "€50K–€46M", volumePercent: 65, sellThrough: 82 },
    { type: "Print/Edition", avgPrice: 12000, range: "€2K–€180K", volumePercent: 20, sellThrough: 85 },
    // ...
  ],
  
  periods: [
    { name: "Photorealism", years: "1962–1968", avgPrice: 2100000, works: 145, trend: "stable" },
    { name: "Color Charts", years: "1966–1974", avgPrice: 890000, works: 67, trend: "rising" },
    // ...
  ],
  
  auctionHouseDistribution: [
    { house: "Christie's", percent: 42 },
    { house: "Sotheby's", percent: 38 },
    // ...
  ],
  
  geographicDistribution: [
    { city: "London", percent: 35 },
    { city: "New York", percent: 32 },
    // ...
  ],
  
  comparables: [
    { name: "Cy Twombly", score: 88, avgPrice: 1800000, correlation: 0.72 },
    // ...
  ],
  
  recentSales: [
    { title: "Abstraktes Bild (XXX)", date: "2024-11-15", house: "Christie's", estimateLow: 8000000, estimateHigh: 12000000, hammer: 14500000 },
    // ...
  ],
  
  marketSummary: "Gerhard Richter remains one of the most..."
}
```

**CREATE REALISTIC DATA FOR ALL 10 ARTISTS.** Use your knowledge of real art market values. This is critical — the numbers must feel real to someone who knows the market.

## Additional UI Elements

### Top Navigation Bar
- Logo: "ArtScore" in bold + "BETA" badge
- Tagline: "Art Market Intelligence"
- Dark, minimal

### Footer
- "Data sources: Auction records 1985–2026"
- "Powered by ArtScore"
- Small print about mock data for demo

## File Structure
- index.html
- style.css  
- data.js (all 10 artist mock datasets)
- app.js (search, render, charts)

## Critical Requirements
1. The search MUST filter and show matching artists from the 10 pre-loaded ones
2. Clicking an artist MUST render the full dashboard card
3. Charts MUST be real (use Chart.js from CDN)
4. Numbers MUST be formatted properly (€1.2M not €1200000)
5. The whole thing MUST look like a professional fintech/data product
6. Must work offline (all data is local, Chart.js from CDN is ok)
7. Animations: smooth card entrance, counter animations for KPIs
8. The "creative periods" timeline should be visually stunning — the signature feature
