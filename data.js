// ArtScore — Mock Artist Market Intelligence Data
// All numbers are realistic based on actual art market knowledge

const ARTISTS = [
  {
    name: "Gerhard Richter",
    slug: "gerhard-richter",
    nationality: "German",
    flag: "🇩🇪",
    born: 1932,
    died: null,
    based: "Cologne, Germany",
    mediums: ["Painting", "Photography", "Print", "Drawing"],
    movements: ["Abstract Art", "Photorealism", "Contemporary"],
    marketScore: 94,
    trend12m: 12.3,
    kpis: {
      totalLots: 3847,
      sellThroughRate: 78,
      avgHammerPrice: 485000,
      medianHammerPrice: 127000,
      marketVolume12m: 89200000,
      allTimeHigh: { price: 46300000, title: "Abstraktes Bild (809-4)", year: 2015, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 820000, median: 95000, high: 5200000 },
      { year: 2015, avg: 1200000, median: 120000, high: 46300000 },
      { year: 2016, avg: 750000, median: 98000, high: 25500000 },
      { year: 2017, avg: 880000, median: 105000, high: 22000000 },
      { year: 2018, avg: 640000, median: 89000, high: 20800000 },
      { year: 2019, avg: 710000, median: 94000, high: 16800000 },
      { year: 2020, avg: 520000, median: 78000, high: 9800000 },
      { year: 2021, avg: 860000, median: 112000, high: 29000000 },
      { year: 2022, avg: 950000, median: 118000, high: 34200000 },
      { year: 2023, avg: 780000, median: 105000, high: 21300000 },
      { year: 2024, avg: 830000, median: 115000, high: 18700000 },
      { year: 2025, avg: 920000, median: 128000, high: 22100000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 2400000, range: "€50K–€46M", volumePercent: 45, sellThrough: 82 },
      { type: "Print/Edition", avgPrice: 14500, range: "€2K–€180K", volumePercent: 28, sellThrough: 85 },
      { type: "Work on Paper", avgPrice: 185000, range: "€8K–€2.5M", volumePercent: 15, sellThrough: 74 },
      { type: "Photography", avgPrice: 62000, range: "€5K–€450K", volumePercent: 10, sellThrough: 71 },
      { type: "Sculpture", avgPrice: 320000, range: "€40K–€1.8M", volumePercent: 2, sellThrough: 68 }
    ],
    periods: [
      { name: "Photorealism", years: "1962–1968", avgPrice: 2800000, works: 145, trend: "rising" },
      { name: "Color Charts", years: "1966–1974", avgPrice: 1200000, works: 67, trend: "stable" },
      { name: "Grey Paintings", years: "1968–1976", avgPrice: 680000, works: 89, trend: "stable" },
      { name: "Abstract Paintings", years: "1976–present", avgPrice: 4200000, works: 412, trend: "rising" },
      { name: "Overpainted Photos", years: "1989–present", avgPrice: 95000, works: 234, trend: "rising" },
      { name: "Cage Paintings", years: "2006–2009", avgPrice: 18500000, works: 12, trend: "stable" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 38 },
      { house: "Sotheby's", percent: 35 },
      { house: "Phillips", percent: 12 },
      { house: "Lempertz", percent: 5 },
      { house: "Others", percent: 10 }
    ],
    geographicDistribution: [
      { city: "London", percent: 35 },
      { city: "New York", percent: 30 },
      { city: "Hong Kong", percent: 12 },
      { city: "Cologne", percent: 8 },
      { city: "Paris", percent: 7 },
      { city: "Others", percent: 8 }
    ],
    comparables: [
      { name: "Cy Twombly", score: 88, avgPrice: 1800000, correlation: 0.72 },
      { name: "Sigmar Polke", score: 76, avgPrice: 620000, correlation: 0.81 },
      { name: "Anselm Kiefer", score: 79, avgPrice: 480000, correlation: 0.68 },
      { name: "Georg Baselitz", score: 71, avgPrice: 310000, correlation: 0.65 }
    ],
    recentSales: [
      { title: "Abstraktes Bild (636)", date: "2025-11-14", house: "Christie's", estimateLow: 12000000, estimateHigh: 18000000, hammer: 22100000 },
      { title: "Kerze", date: "2025-06-28", house: "Sotheby's", estimateLow: 8000000, estimateHigh: 12000000, hammer: 11400000 },
      { title: "Eisberg", date: "2025-03-05", house: "Phillips", estimateLow: 3000000, estimateHigh: 5000000, hammer: 4800000 },
      { title: "Abstraktes Bild (952-1)", date: "2024-11-15", house: "Christie's", estimateLow: 6000000, estimateHigh: 9000000, hammer: 14500000 },
      { title: "Aladin (913-8)", date: "2024-10-18", house: "Sotheby's", estimateLow: 4000000, estimateHigh: 6000000, hammer: 5200000 },
      { title: "Blau", date: "2024-05-16", house: "Christie's", estimateLow: 2500000, estimateHigh: 3500000, hammer: 3100000 }
    ],
    marketSummary: "Gerhard Richter maintains his position as the highest-valued living European artist, commanding consistent demand across all major auction houses. His abstract paintings (Abstraktes Bild series) remain the market's primary driver, with works from the 1980s–90s fetching the strongest prices. The market softened slightly in 2023 following the post-pandemic speculative surge, but 2024–25 has seen a notable recovery in sell-through rates and average hammer prices.\n\nRichter's print market provides an accessible entry point, with editions remaining liquid below €50K. The artist's advanced age (93) introduces a 'legacy premium' factor that historically amplifies values for post-war masters. Institutional demand remains robust, with major museums continuing to acquire across all periods.\n\nOutlook: Moderately bullish. The abstract paintings are the asset class to watch — works above 200cm consistently outperform. Photorealist works from the 1960s are increasingly scarce at auction, suggesting upward repricing potential. Risk factor: concentration in top-tier lots means market depth is thinner than headline numbers suggest."
  },
  {
    name: "Banksy",
    slug: "banksy",
    nationality: "British",
    flag: "🇬🇧",
    born: 1974,
    died: null,
    based: "Unknown",
    mediums: ["Print", "Painting", "Sculpture", "Street Art"],
    movements: ["Street Art", "Pop Art", "Contemporary"],
    marketScore: 88,
    trend12m: -4.7,
    kpis: {
      totalLots: 5120,
      sellThroughRate: 72,
      avgHammerPrice: 185000,
      medianHammerPrice: 48000,
      marketVolume12m: 62400000,
      allTimeHigh: { price: 25400000, title: "Love is in the Bin", year: 2021, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 95000, median: 32000, high: 1870000 },
      { year: 2015, avg: 88000, median: 28000, high: 1200000 },
      { year: 2016, avg: 92000, median: 30000, high: 1400000 },
      { year: 2017, avg: 110000, median: 35000, high: 2200000 },
      { year: 2018, avg: 145000, median: 38000, high: 1400000 },
      { year: 2019, avg: 165000, median: 42000, high: 12200000 },
      { year: 2020, avg: 210000, median: 52000, high: 4900000 },
      { year: 2021, avg: 320000, median: 68000, high: 25400000 },
      { year: 2022, avg: 245000, median: 55000, high: 8300000 },
      { year: 2023, avg: 195000, median: 46000, high: 6200000 },
      { year: 2024, avg: 175000, median: 44000, high: 5800000 },
      { year: 2025, avg: 188000, median: 48000, high: 7100000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 1850000, range: "€200K–€25M", volumePercent: 15, sellThrough: 88 },
      { type: "Print/Edition", avgPrice: 42000, range: "€5K–€850K", volumePercent: 62, sellThrough: 70 },
      { type: "Work on Paper", avgPrice: 220000, range: "€20K–€3M", volumePercent: 12, sellThrough: 76 },
      { type: "Sculpture", avgPrice: 380000, range: "€50K–€2.5M", volumePercent: 6, sellThrough: 72 },
      { type: "Mixed Media", avgPrice: 520000, range: "€30K–€8M", volumePercent: 5, sellThrough: 74 }
    ],
    periods: [
      { name: "Early Stencils", years: "1999–2003", avgPrice: 850000, works: 89, trend: "rising" },
      { name: "Barely Legal Era", years: "2003–2006", avgPrice: 620000, works: 134, trend: "stable" },
      { name: "Dismaland Period", years: "2006–2015", avgPrice: 380000, works: 245, trend: "declining" },
      { name: "Shredding & Beyond", years: "2018–present", avgPrice: 1400000, works: 42, trend: "rising" }
    ],
    auctionHouseDistribution: [
      { house: "Sotheby's", percent: 32 },
      { house: "Christie's", percent: 28 },
      { house: "Phillips", percent: 15 },
      { house: "Bonhams", percent: 10 },
      { house: "Others", percent: 15 }
    ],
    geographicDistribution: [
      { city: "London", percent: 42 },
      { city: "New York", percent: 28 },
      { city: "Hong Kong", percent: 12 },
      { city: "Paris", percent: 8 },
      { city: "Others", percent: 10 }
    ],
    comparables: [
      { name: "KAWS", score: 82, avgPrice: 165000, correlation: 0.78 },
      { name: "Shepard Fairey", score: 52, avgPrice: 18000, correlation: 0.62 },
      { name: "Invader", score: 61, avgPrice: 45000, correlation: 0.71 },
      { name: "Mr. Brainwash", score: 38, avgPrice: 12000, correlation: 0.55 }
    ],
    recentSales: [
      { title: "Girl with Balloon (Artist Proof)", date: "2025-10-12", house: "Sotheby's", estimateLow: 3000000, estimateHigh: 5000000, hammer: 7100000 },
      { title: "Devolved Parliament", date: "2025-06-20", house: "Christie's", estimateLow: 4000000, estimateHigh: 6000000, hammer: 5400000 },
      { title: "Laugh Now", date: "2025-03-08", house: "Phillips", estimateLow: 1500000, estimateHigh: 2500000, hammer: 2800000 },
      { title: "Kissing Coppers (Canvas)", date: "2024-11-22", house: "Sotheby's", estimateLow: 800000, estimateHigh: 1200000, hammer: 1450000 },
      { title: "Bomb Hugger (Signed)", date: "2024-09-15", house: "Christie's", estimateLow: 200000, estimateHigh: 300000, hammer: 380000 },
      { title: "Kate Moss (Print)", date: "2024-05-10", house: "Phillips", estimateLow: 40000, estimateHigh: 60000, hammer: 52000 }
    ],
    marketSummary: "Banksy remains the definitive market leader in street art, though the frothy post-2021 speculation has meaningfully corrected. The print market — which comprises roughly 62% of auction volume — has seen sell-through rates compress from 82% (2021) to 70% (2025), reflecting oversupply of unsigned editions and a more discerning buyer base.\n\nOriginal canvases and authenticated unique works continue to command premiums, with the 'shredding narrative' creating a distinct provenance premium for works associated with institutional critique. The anonymous identity remains a double-edged sword: it generates media buzz but introduces authentication risk.\n\nOutlook: Neutral to slightly bearish near-term. The print market is saturated and needs consolidation. Unique works and early stencils remain strong. Key risk: authentication controversies could undermine confidence. Key catalyst: any major public intervention or institutional show would likely reignite speculative demand."
  },
  {
    name: "KAWS",
    slug: "kaws",
    nationality: "American",
    flag: "🇺🇸",
    born: 1974,
    died: null,
    based: "Brooklyn, New York",
    mediums: ["Painting", "Sculpture", "Print", "Toy/Multiple"],
    movements: ["Pop Art", "Contemporary", "Street Art"],
    marketScore: 82,
    trend12m: -8.2,
    kpis: {
      totalLots: 4230,
      sellThroughRate: 68,
      avgHammerPrice: 165000,
      medianHammerPrice: 38000,
      marketVolume12m: 45800000,
      allTimeHigh: { price: 14800000, title: "THE KAWS ALBUM", year: 2019, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 52000, median: 15000, high: 820000 },
      { year: 2015, avg: 68000, median: 18000, high: 1100000 },
      { year: 2016, avg: 85000, median: 22000, high: 1500000 },
      { year: 2017, avg: 120000, median: 28000, high: 2800000 },
      { year: 2018, avg: 180000, median: 35000, high: 3400000 },
      { year: 2019, avg: 280000, median: 45000, high: 14800000 },
      { year: 2020, avg: 195000, median: 38000, high: 5800000 },
      { year: 2021, avg: 310000, median: 55000, high: 7600000 },
      { year: 2022, avg: 220000, median: 42000, high: 4200000 },
      { year: 2023, avg: 175000, median: 36000, high: 3800000 },
      { year: 2024, avg: 155000, median: 34000, high: 3200000 },
      { year: 2025, avg: 165000, median: 38000, high: 4100000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 1200000, range: "€100K–€14.8M", volumePercent: 25, sellThrough: 78 },
      { type: "Print/Edition", avgPrice: 18000, range: "€3K–€250K", volumePercent: 35, sellThrough: 65 },
      { type: "Sculpture", avgPrice: 280000, range: "€15K–€4M", volumePercent: 22, sellThrough: 72 },
      { type: "Toy/Multiple", avgPrice: 8500, range: "€500–€85K", volumePercent: 15, sellThrough: 62 },
      { type: "Work on Paper", avgPrice: 95000, range: "€10K–€800K", volumePercent: 3, sellThrough: 70 }
    ],
    periods: [
      { name: "Early Subvertising", years: "1996–2002", avgPrice: 420000, works: 45, trend: "rising" },
      { name: "Companion Era", years: "2002–2010", avgPrice: 680000, works: 189, trend: "stable" },
      { name: "Museum Crossover", years: "2010–2017", avgPrice: 350000, works: 312, trend: "declining" },
      { name: "Mega-Scale Sculpture", years: "2017–present", avgPrice: 1100000, works: 78, trend: "stable" }
    ],
    auctionHouseDistribution: [
      { house: "Phillips", percent: 32 },
      { house: "Christie's", percent: 28 },
      { house: "Sotheby's", percent: 25 },
      { house: "Heritage", percent: 8 },
      { house: "Others", percent: 7 }
    ],
    geographicDistribution: [
      { city: "Hong Kong", percent: 35 },
      { city: "New York", percent: 28 },
      { city: "London", percent: 18 },
      { city: "Tokyo", percent: 10 },
      { city: "Others", percent: 9 }
    ],
    comparables: [
      { name: "Banksy", score: 88, avgPrice: 185000, correlation: 0.78 },
      { name: "Yoshitomo Nara", score: 85, avgPrice: 520000, correlation: 0.74 },
      { name: "Takashi Murakami", score: 72, avgPrice: 280000, correlation: 0.82 },
      { name: "Daniel Arsham", score: 58, avgPrice: 65000, correlation: 0.69 }
    ],
    recentSales: [
      { title: "UNTITLED (FATAL GROUP)", date: "2025-09-18", house: "Phillips", estimateLow: 2000000, estimateHigh: 3000000, hammer: 4100000 },
      { title: "THE THINGS THAT COMFORT", date: "2025-05-15", house: "Christie's", estimateLow: 1500000, estimateHigh: 2500000, hammer: 1800000 },
      { title: "CLEAN SLATE", date: "2025-02-22", house: "Sotheby's", estimateLow: 800000, estimateHigh: 1200000, hammer: 950000 },
      { title: "SHARE (Painting)", date: "2024-11-08", house: "Phillips", estimateLow: 1200000, estimateHigh: 1800000, hammer: 2200000 },
      { title: "COMPANION (Passing Through)", date: "2024-07-12", house: "Christie's", estimateLow: 600000, estimateHigh: 900000, hammer: 720000 },
      { title: "CHUM (Black)", date: "2024-03-20", house: "Sotheby's", estimateLow: 80000, estimateHigh: 120000, hammer: 95000 }
    ],
    marketSummary: "KAWS experienced a parabolic rise from 2017–2021, driven heavily by Asian collector demand — particularly from Hong Kong, mainland China, and Japan. The market is now undergoing a necessary correction, with sell-through rates declining and the lower-tier multiples/toys showing the most weakness.\n\nThe artist's core paintings and large-scale sculptures retain institutional interest, but the commoditization of the brand through mass-market collaborations (Uniqlo, Dior) has introduced pricing confusion between art objects and consumer products. Phillips has positioned itself as the primary market maker.\n\nOutlook: Cautiously bearish. The correction appears healthy but incomplete. Major paintings from the early 2000s represent the best value proposition. The toy/multiple market needs significant price discovery downward before stabilizing. Asian demand — which drove the boom — has cooled notably since 2022."
  },
  {
    name: "Yayoi Kusama",
    slug: "yayoi-kusama",
    nationality: "Japanese",
    flag: "🇯🇵",
    born: 1929,
    died: null,
    based: "Tokyo, Japan",
    mediums: ["Painting", "Sculpture", "Installation", "Print"],
    movements: ["Contemporary", "Pop Art", "Minimalism", "Feminist Art"],
    marketScore: 91,
    trend12m: 8.5,
    kpis: {
      totalLots: 4680,
      sellThroughRate: 81,
      avgHammerPrice: 420000,
      medianHammerPrice: 95000,
      marketVolume12m: 112000000,
      allTimeHigh: { price: 10500000, title: "Interminable Net #4", year: 2023, house: "Christie's" }
    },
    priceHistory: [
      { year: 2014, avg: 280000, median: 62000, high: 5100000 },
      { year: 2015, avg: 310000, median: 68000, high: 3800000 },
      { year: 2016, avg: 350000, median: 72000, high: 5400000 },
      { year: 2017, avg: 390000, median: 78000, high: 7100000 },
      { year: 2018, avg: 420000, median: 82000, high: 6200000 },
      { year: 2019, avg: 385000, median: 76000, high: 7950000 },
      { year: 2020, avg: 340000, median: 70000, high: 4500000 },
      { year: 2021, avg: 480000, median: 92000, high: 8500000 },
      { year: 2022, avg: 520000, median: 98000, high: 9200000 },
      { year: 2023, avg: 480000, median: 88000, high: 10500000 },
      { year: 2024, avg: 410000, median: 90000, high: 7800000 },
      { year: 2025, avg: 450000, median: 96000, high: 8100000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 1800000, range: "€80K–€10.5M", volumePercent: 40, sellThrough: 86 },
      { type: "Print/Edition", avgPrice: 22000, range: "€3K–€320K", volumePercent: 30, sellThrough: 78 },
      { type: "Sculpture", avgPrice: 680000, range: "€50K–€5M", volumePercent: 15, sellThrough: 82 },
      { type: "Work on Paper", avgPrice: 120000, range: "€10K–€1.5M", volumePercent: 12, sellThrough: 80 },
      { type: "Mixed Media", avgPrice: 350000, range: "€25K–€3M", volumePercent: 3, sellThrough: 75 }
    ],
    periods: [
      { name: "Infinity Nets (Early)", years: "1958–1968", avgPrice: 4200000, works: 52, trend: "rising" },
      { name: "New York Period", years: "1958–1972", avgPrice: 2100000, works: 78, trend: "stable" },
      { name: "Return to Japan", years: "1973–1990", avgPrice: 380000, works: 145, trend: "stable" },
      { name: "Infinity Rooms", years: "1990–present", avgPrice: 850000, works: 210, trend: "rising" },
      { name: "My Eternal Soul", years: "2009–present", avgPrice: 620000, works: 185, trend: "rising" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 35 },
      { house: "Sotheby's", percent: 30 },
      { house: "Phillips", percent: 15 },
      { house: "SBI Art Auction", percent: 10 },
      { house: "Others", percent: 10 }
    ],
    geographicDistribution: [
      { city: "Hong Kong", percent: 32 },
      { city: "New York", percent: 25 },
      { city: "Tokyo", percent: 18 },
      { city: "London", percent: 15 },
      { city: "Others", percent: 10 }
    ],
    comparables: [
      { name: "Yoshitomo Nara", score: 85, avgPrice: 520000, correlation: 0.76 },
      { name: "Takashi Murakami", score: 72, avgPrice: 280000, correlation: 0.68 },
      { name: "Lee Ufan", score: 74, avgPrice: 350000, correlation: 0.62 },
      { name: "Liu Wei", score: 65, avgPrice: 190000, correlation: 0.58 }
    ],
    recentSales: [
      { title: "Infinity Nets (TWOWQ)", date: "2025-11-05", house: "Christie's", estimateLow: 5000000, estimateHigh: 7000000, hammer: 8100000 },
      { title: "Pumpkin (Large Sculpture)", date: "2025-06-14", house: "Sotheby's", estimateLow: 2000000, estimateHigh: 3000000, hammer: 3400000 },
      { title: "My Eternal Soul — Dancing Lights", date: "2025-03-20", house: "Phillips", estimateLow: 400000, estimateHigh: 600000, hammer: 720000 },
      { title: "Infinity Nets (OQAB)", date: "2024-10-25", house: "Christie's", estimateLow: 3000000, estimateHigh: 5000000, hammer: 4600000 },
      { title: "Dots Obsession", date: "2024-07-08", house: "Sotheby's", estimateLow: 800000, estimateHigh: 1200000, hammer: 1050000 },
      { title: "Pumpkin (Yellow)", date: "2024-04-18", house: "Phillips", estimateLow: 150000, estimateHigh: 250000, hammer: 285000 }
    ],
    marketSummary: "Yayoi Kusama's market continues to strengthen, driven by the extraordinary global popularity of her Infinity Mirror Rooms and the 'selfie economy' that has brought her work to mainstream audiences. At 96, she remains the highest-valued living female artist, with her market sustained by genuine institutional demand and a deep Asian collector base.\n\nThe early Infinity Net paintings from the New York period (1958–68) are the crown jewels — increasingly scarce and commanding premiums at every appearance. The My Eternal Soul series provides strong mid-market liquidity. The print/edition market remains accessible and liquid below €50K.\n\nOutlook: Bullish. Kusama's market benefits from structural tailwinds — museums continue to mount major retrospectives, the 'experience economy' drives brand awareness, and Asian wealth accumulation supports demand. Legacy premium is increasingly priced in. Risk: productivity of the studio at her age raises questions about attribution rigor for recent works."
  },
  {
    name: "Jean-Michel Basquiat",
    slug: "jean-michel-basquiat",
    nationality: "American",
    flag: "🇺🇸",
    born: 1960,
    died: 1988,
    based: "New York, NY",
    mediums: ["Painting", "Drawing", "Mixed Media", "Print"],
    movements: ["Neo-Expressionism", "Graffiti Art", "Contemporary"],
    marketScore: 96,
    trend12m: 5.1,
    kpis: {
      totalLots: 2890,
      sellThroughRate: 82,
      avgHammerPrice: 1250000,
      medianHammerPrice: 285000,
      marketVolume12m: 186000000,
      allTimeHigh: { price: 110500000, title: "Untitled (Skull)", year: 2017, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 780000, median: 185000, high: 14600000 },
      { year: 2015, avg: 920000, median: 210000, high: 48800000 },
      { year: 2016, avg: 1050000, median: 240000, high: 57300000 },
      { year: 2017, avg: 1800000, median: 320000, high: 110500000 },
      { year: 2018, avg: 1400000, median: 280000, high: 45000000 },
      { year: 2019, avg: 1200000, median: 250000, high: 25000000 },
      { year: 2020, avg: 980000, median: 220000, high: 12800000 },
      { year: 2021, avg: 1550000, median: 310000, high: 93100000 },
      { year: 2022, avg: 1350000, median: 290000, high: 85000000 },
      { year: 2023, avg: 1200000, median: 265000, high: 42200000 },
      { year: 2024, avg: 1150000, median: 275000, high: 38500000 },
      { year: 2025, avg: 1280000, median: 290000, high: 52000000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 6500000, range: "€200K–€110M", volumePercent: 40, sellThrough: 88 },
      { type: "Work on Paper", avgPrice: 420000, range: "€20K–€15M", volumePercent: 30, sellThrough: 80 },
      { type: "Print/Edition", avgPrice: 35000, range: "€5K–€450K", volumePercent: 15, sellThrough: 76 },
      { type: "Mixed Media", avgPrice: 1800000, range: "€50K–€40M", volumePercent: 12, sellThrough: 82 },
      { type: "Ceramics", avgPrice: 180000, range: "€15K–€800K", volumePercent: 3, sellThrough: 72 }
    ],
    periods: [
      { name: "SAMO Era", years: "1978–1980", avgPrice: 2200000, works: 35, trend: "rising" },
      { name: "Gallery Breakthrough", years: "1981–1983", avgPrice: 8500000, works: 120, trend: "stable" },
      { name: "Warhol Collaborations", years: "1983–1985", avgPrice: 4200000, works: 48, trend: "rising" },
      { name: "Peak Production", years: "1984–1986", avgPrice: 6800000, works: 185, trend: "stable" },
      { name: "Late Works", years: "1987–1988", avgPrice: 3800000, works: 92, trend: "stable" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 40 },
      { house: "Sotheby's", percent: 38 },
      { house: "Phillips", percent: 14 },
      { house: "Bonhams", percent: 3 },
      { house: "Others", percent: 5 }
    ],
    geographicDistribution: [
      { city: "New York", percent: 45 },
      { city: "London", percent: 25 },
      { city: "Hong Kong", percent: 15 },
      { city: "Paris", percent: 8 },
      { city: "Others", percent: 7 }
    ],
    comparables: [
      { name: "Keith Haring", score: 78, avgPrice: 380000, correlation: 0.72 },
      { name: "Cy Twombly", score: 88, avgPrice: 1800000, correlation: 0.65 },
      { name: "Andy Warhol", score: 95, avgPrice: 2100000, correlation: 0.78 },
      { name: "George Condo", score: 73, avgPrice: 420000, correlation: 0.61 }
    ],
    recentSales: [
      { title: "El Gran Espectaculo (The Nile)", date: "2025-11-12", house: "Christie's", estimateLow: 35000000, estimateHigh: 50000000, hammer: 52000000 },
      { title: "Warrior", date: "2025-05-18", house: "Sotheby's", estimateLow: 20000000, estimateHigh: 30000000, hammer: 28500000 },
      { title: "Victor 25448", date: "2025-03-02", house: "Phillips", estimateLow: 8000000, estimateHigh: 12000000, hammer: 10200000 },
      { title: "Untitled (Pollo Frito)", date: "2024-11-20", house: "Christie's", estimateLow: 25000000, estimateHigh: 35000000, hammer: 38500000 },
      { title: "Flesh and Spirit", date: "2024-06-28", house: "Sotheby's", estimateLow: 12000000, estimateHigh: 18000000, hammer: 15800000 },
      { title: "Untitled (Head)", date: "2024-03-15", house: "Phillips", estimateLow: 4000000, estimateHigh: 6000000, hammer: 7200000 }
    ],
    marketSummary: "Jean-Michel Basquiat occupies the apex of the contemporary art market, consistently ranking among the top three artists by auction turnover globally. The $110.5M record (2017) established him as a cultural and financial icon, and the market has maintained extraordinary depth across price levels.\n\nThe finite supply — Basquiat died at 27, producing roughly 1,500 paintings and 600+ drawings — creates genuine scarcity. Works from 1981–83, the breakthrough years, command the highest premiums. The Warhol collaborations represent a unique cross-collectible category with its own demand dynamics.\n\nOutlook: Strongly bullish. Basquiat's cultural relevance continues to grow with successive generations, and his market has proven remarkably resilient through multiple cycles. Institutional acquisitions and major museum shows provide structural support. The estate management has been disciplined. Risk factors are minimal — primarily liquidity concentration in mega-lots above $20M."
  },
  {
    name: "Damien Hirst",
    slug: "damien-hirst",
    nationality: "British",
    flag: "🇬🇧",
    born: 1965,
    died: null,
    based: "Devon, England",
    mediums: ["Painting", "Sculpture", "Installation", "Print"],
    movements: ["YBA", "Contemporary", "Conceptual Art"],
    marketScore: 68,
    trend12m: -12.5,
    kpis: {
      totalLots: 6420,
      sellThroughRate: 58,
      avgHammerPrice: 142000,
      medianHammerPrice: 28000,
      marketVolume12m: 34500000,
      allTimeHigh: { price: 19200000, title: "Lullaby Spring", year: 2007, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 185000, median: 35000, high: 4800000 },
      { year: 2015, avg: 165000, median: 30000, high: 3200000 },
      { year: 2016, avg: 148000, median: 28000, high: 2400000 },
      { year: 2017, avg: 155000, median: 32000, high: 5500000 },
      { year: 2018, avg: 140000, median: 26000, high: 3100000 },
      { year: 2019, avg: 125000, median: 24000, high: 2800000 },
      { year: 2020, avg: 110000, median: 22000, high: 1800000 },
      { year: 2021, avg: 165000, median: 30000, high: 4200000 },
      { year: 2022, avg: 210000, median: 35000, high: 6800000 },
      { year: 2023, avg: 175000, median: 30000, high: 3500000 },
      { year: 2024, avg: 148000, median: 27000, high: 2800000 },
      { year: 2025, avg: 135000, median: 26000, high: 2200000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 850000, range: "€50K–€19M", volumePercent: 20, sellThrough: 62 },
      { type: "Print/Edition", avgPrice: 8500, range: "€1K–€120K", volumePercent: 42, sellThrough: 52 },
      { type: "Sculpture", avgPrice: 420000, range: "€20K–€12M", volumePercent: 18, sellThrough: 65 },
      { type: "Spin Painting", avgPrice: 85000, range: "€15K–€800K", volumePercent: 12, sellThrough: 55 },
      { type: "Spot Painting", avgPrice: 320000, range: "€30K–€3M", volumePercent: 8, sellThrough: 68 }
    ],
    periods: [
      { name: "YBA Emergence", years: "1988–1995", avgPrice: 1200000, works: 85, trend: "stable" },
      { name: "Pharmacy & Vitrines", years: "1995–2003", avgPrice: 2800000, works: 120, trend: "declining" },
      { name: "Beautiful Inside", years: "2003–2008", avgPrice: 580000, works: 340, trend: "declining" },
      { name: "Post-Crash", years: "2009–2016", avgPrice: 180000, works: 520, trend: "declining" },
      { name: "Cherry Blossoms / NFT Era", years: "2017–present", avgPrice: 320000, works: 280, trend: "stable" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 30 },
      { house: "Sotheby's", percent: 28 },
      { house: "Phillips", percent: 18 },
      { house: "Bonhams", percent: 12 },
      { house: "Others", percent: 12 }
    ],
    geographicDistribution: [
      { city: "London", percent: 45 },
      { city: "New York", percent: 25 },
      { city: "Hong Kong", percent: 10 },
      { city: "Paris", percent: 8 },
      { city: "Others", percent: 12 }
    ],
    comparables: [
      { name: "Jeff Koons", score: 72, avgPrice: 280000, correlation: 0.74 },
      { name: "Tracey Emin", score: 62, avgPrice: 120000, correlation: 0.68 },
      { name: "Sarah Lucas", score: 48, avgPrice: 45000, correlation: 0.52 },
      { name: "Marc Quinn", score: 42, avgPrice: 38000, correlation: 0.58 }
    ],
    recentSales: [
      { title: "The Incomplete Truth", date: "2025-10-08", house: "Christie's", estimateLow: 1500000, estimateHigh: 2500000, hammer: 2200000 },
      { title: "Spot Painting (Chloroacetaldehyde)", date: "2025-06-20", house: "Sotheby's", estimateLow: 500000, estimateHigh: 800000, hammer: 580000 },
      { title: "Cherry Blossoms (Gardenia)", date: "2025-02-14", house: "Phillips", estimateLow: 800000, estimateHigh: 1200000, hammer: 720000 },
      { title: "Beautiful, kiss my fucking ass", date: "2024-11-12", house: "Christie's", estimateLow: 200000, estimateHigh: 300000, hammer: 185000 },
      { title: "Away from the Flock", date: "2024-07-05", house: "Sotheby's", estimateLow: 1200000, estimateHigh: 1800000, hammer: 1350000 },
      { title: "Spin Painting", date: "2024-04-22", house: "Phillips", estimateLow: 40000, estimateHigh: 60000, hammer: 42000 }
    ],
    marketSummary: "Damien Hirst's market tells a cautionary tale of oversupply and brand dilution. Once the highest-priced living artist (the infamous 2008 'Beautiful Inside My Head Forever' Sotheby's sale), his market has experienced a prolonged structural decline. The 58% sell-through rate is notably weak, dragged down by saturated print and spin painting categories.\n\nThe iconic works — shark, pharmacy cabinets, butterfly paintings — retain value, but the sheer volume of production has undermined collector confidence. The 'Currency' NFT project (2022) generated headlines but further complicated the market narrative. Cherry Blossom paintings showed brief promise but are already softening.\n\nOutlook: Bearish. Until production volume is meaningfully curtailed, the market faces structural headwinds. The early YBA-era pieces (pre-2000) represent the only category with defensible long-term value. Collectors should be highly selective and focus on museum-quality, one-of-a-kind works. The print market is effectively broken."
  },
  {
    name: "David Hockney",
    slug: "david-hockney",
    nationality: "British",
    flag: "🇬🇧",
    born: 1937,
    died: null,
    based: "Normandy, France",
    mediums: ["Painting", "Drawing", "Print", "Photography", "iPad Art"],
    movements: ["Pop Art", "Contemporary", "Figurative"],
    marketScore: 90,
    trend12m: 3.8,
    kpis: {
      totalLots: 5240,
      sellThroughRate: 76,
      avgHammerPrice: 380000,
      medianHammerPrice: 42000,
      marketVolume12m: 95000000,
      allTimeHigh: { price: 90300000, title: "Portrait of an Artist (Pool with Two Figures)", year: 2018, house: "Christie's" }
    },
    priceHistory: [
      { year: 2014, avg: 220000, median: 32000, high: 6400000 },
      { year: 2015, avg: 280000, median: 35000, high: 8200000 },
      { year: 2016, avg: 310000, median: 38000, high: 11500000 },
      { year: 2017, avg: 340000, median: 40000, high: 28500000 },
      { year: 2018, avg: 620000, median: 55000, high: 90300000 },
      { year: 2019, avg: 420000, median: 45000, high: 18500000 },
      { year: 2020, avg: 350000, median: 38000, high: 49400000 },
      { year: 2021, avg: 480000, median: 48000, high: 35400000 },
      { year: 2022, avg: 410000, median: 44000, high: 14800000 },
      { year: 2023, avg: 380000, median: 42000, high: 12500000 },
      { year: 2024, avg: 370000, median: 40000, high: 16200000 },
      { year: 2025, avg: 395000, median: 44000, high: 18900000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 3200000, range: "€150K–€90M", volumePercent: 30, sellThrough: 85 },
      { type: "Print/Edition", avgPrice: 18000, range: "€2K–€650K", volumePercent: 40, sellThrough: 72 },
      { type: "Work on Paper", avgPrice: 180000, range: "€10K–€5M", volumePercent: 15, sellThrough: 78 },
      { type: "Photography", avgPrice: 25000, range: "€3K–€200K", volumePercent: 8, sellThrough: 68 },
      { type: "iPad Drawing", avgPrice: 120000, range: "€20K–€800K", volumePercent: 7, sellThrough: 74 }
    ],
    periods: [
      { name: "Bradford & RCA", years: "1960–1964", avgPrice: 1800000, works: 68, trend: "rising" },
      { name: "California Pools", years: "1964–1971", avgPrice: 12000000, works: 42, trend: "stable" },
      { name: "Double Portraits", years: "1968–1977", avgPrice: 8500000, works: 55, trend: "rising" },
      { name: "Joiners & Photo", years: "1980–1990", avgPrice: 180000, works: 120, trend: "stable" },
      { name: "Yorkshire & Normandy", years: "2004–present", avgPrice: 850000, works: 280, trend: "rising" },
      { name: "iPad Works", years: "2010–present", avgPrice: 120000, works: 95, trend: "stable" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 38 },
      { house: "Sotheby's", percent: 32 },
      { house: "Phillips", percent: 14 },
      { house: "Bonhams", percent: 8 },
      { house: "Others", percent: 8 }
    ],
    geographicDistribution: [
      { city: "London", percent: 38 },
      { city: "New York", percent: 30 },
      { city: "Hong Kong", percent: 12 },
      { city: "Los Angeles", percent: 8 },
      { city: "Paris", percent: 6 },
      { city: "Others", percent: 6 }
    ],
    comparables: [
      { name: "Gerhard Richter", score: 94, avgPrice: 485000, correlation: 0.68 },
      { name: "Ed Ruscha", score: 80, avgPrice: 320000, correlation: 0.72 },
      { name: "Wayne Thiebaud", score: 74, avgPrice: 280000, correlation: 0.65 },
      { name: "Peter Doig", score: 83, avgPrice: 1200000, correlation: 0.70 }
    ],
    recentSales: [
      { title: "Nichols Canyon", date: "2025-11-10", house: "Christie's", estimateLow: 12000000, estimateHigh: 18000000, hammer: 18900000 },
      { title: "Sun on the Pool, LA", date: "2025-06-25", house: "Sotheby's", estimateLow: 8000000, estimateHigh: 12000000, hammer: 9800000 },
      { title: "30 Sunflowers", date: "2025-03-14", house: "Phillips", estimateLow: 1000000, estimateHigh: 1500000, hammer: 1850000 },
      { title: "Garden with Blue Terrace", date: "2024-11-18", house: "Christie's", estimateLow: 5000000, estimateHigh: 8000000, hammer: 6200000 },
      { title: "Henry Geldzahler and Christopher Scott", date: "2024-06-15", house: "Sotheby's", estimateLow: 15000000, estimateHigh: 25000000, hammer: 16200000 },
      { title: "Pool Made with Paper (Print)", date: "2024-03-08", house: "Phillips", estimateLow: 100000, estimateHigh: 150000, hammer: 185000 }
    ],
    marketSummary: "David Hockney's market rests on an extraordinarily broad base — from affordable prints to $90M paintings — making it one of the most liquid and accessible of any living artist. The California pool paintings (1964–71) are the market's apex, with only a handful remaining in private hands, creating intense competition when they appear.\n\nThe post-$90M record (2018) recalibrated the entire Hockney market upward, and subsequent years have shown impressive price stability even as the broader contemporary market softened. The Yorkshire and Normandy landscapes have developed their own collector base, and the iPad works represent an innovative new category with growing institutional acceptance.\n\nOutlook: Moderately bullish. Hockney at 88 benefits from the same legacy premium dynamics as Richter. The print market provides excellent liquidity. Double portraits and California works are trophy assets. The Normandy body of work is still being absorbed by the market and may represent undervalued entry points. Risk: print oversupply in the sub-€10K range."
  },
  {
    name: "Yoshitomo Nara",
    slug: "yoshitomo-nara",
    nationality: "Japanese",
    flag: "🇯🇵",
    born: 1959,
    died: null,
    based: "Tochigi, Japan",
    mediums: ["Painting", "Drawing", "Sculpture", "Ceramic"],
    movements: ["Neo-Pop", "Contemporary", "Superflat"],
    marketScore: 85,
    trend12m: 6.2,
    kpis: {
      totalLots: 3150,
      sellThroughRate: 75,
      avgHammerPrice: 520000,
      medianHammerPrice: 85000,
      marketVolume12m: 68000000,
      allTimeHigh: { price: 25000000, title: "Knife Behind Back", year: 2019, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 180000, median: 42000, high: 2800000 },
      { year: 2015, avg: 210000, median: 48000, high: 3200000 },
      { year: 2016, avg: 245000, median: 55000, high: 4500000 },
      { year: 2017, avg: 290000, median: 60000, high: 5200000 },
      { year: 2018, avg: 350000, median: 68000, high: 6800000 },
      { year: 2019, avg: 620000, median: 95000, high: 25000000 },
      { year: 2020, avg: 480000, median: 82000, high: 8200000 },
      { year: 2021, avg: 720000, median: 105000, high: 12500000 },
      { year: 2022, avg: 580000, median: 90000, high: 8500000 },
      { year: 2023, avg: 510000, median: 82000, high: 7200000 },
      { year: 2024, avg: 490000, median: 80000, high: 6800000 },
      { year: 2025, avg: 540000, median: 88000, high: 9100000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 2800000, range: "€200K–€25M", volumePercent: 35, sellThrough: 82 },
      { type: "Work on Paper", avgPrice: 85000, range: "€8K–€1.5M", volumePercent: 28, sellThrough: 72 },
      { type: "Sculpture", avgPrice: 420000, range: "€30K–€5M", volumePercent: 18, sellThrough: 78 },
      { type: "Print/Edition", avgPrice: 12000, range: "€2K–€150K", volumePercent: 12, sellThrough: 68 },
      { type: "Ceramic", avgPrice: 65000, range: "€5K–€450K", volumePercent: 7, sellThrough: 74 }
    ],
    periods: [
      { name: "Düsseldorf Period", years: "1988–2000", avgPrice: 1500000, works: 95, trend: "rising" },
      { name: "Angry Girl Era", years: "2000–2006", avgPrice: 3200000, works: 145, trend: "stable" },
      { name: "Softer Expression", years: "2006–2012", avgPrice: 850000, works: 120, trend: "stable" },
      { name: "Cosmic Girls", years: "2012–present", avgPrice: 1800000, works: 180, trend: "rising" }
    ],
    auctionHouseDistribution: [
      { house: "Sotheby's", percent: 32 },
      { house: "Christie's", percent: 28 },
      { house: "Phillips", percent: 20 },
      { house: "SBI Art Auction", percent: 12 },
      { house: "Others", percent: 8 }
    ],
    geographicDistribution: [
      { city: "Hong Kong", percent: 38 },
      { city: "New York", percent: 22 },
      { city: "Tokyo", percent: 18 },
      { city: "London", percent: 12 },
      { city: "Others", percent: 10 }
    ],
    comparables: [
      { name: "KAWS", score: 82, avgPrice: 165000, correlation: 0.74 },
      { name: "Takashi Murakami", score: 72, avgPrice: 280000, correlation: 0.80 },
      { name: "Yayoi Kusama", score: 91, avgPrice: 420000, correlation: 0.76 },
      { name: "Mr.", score: 45, avgPrice: 22000, correlation: 0.62 }
    ],
    recentSales: [
      { title: "In the Milky Lake", date: "2025-10-22", house: "Sotheby's", estimateLow: 5000000, estimateHigh: 7000000, hammer: 9100000 },
      { title: "Thinking One More Night", date: "2025-05-10", house: "Christie's", estimateLow: 2000000, estimateHigh: 3000000, hammer: 3400000 },
      { title: "Not Everything But / Green Eyes", date: "2025-02-18", house: "Phillips", estimateLow: 1200000, estimateHigh: 1800000, hammer: 2100000 },
      { title: "Bambi Girl", date: "2024-11-15", house: "Sotheby's", estimateLow: 800000, estimateHigh: 1200000, hammer: 1450000 },
      { title: "Slash with a Knife", date: "2024-07-20", house: "Christie's", estimateLow: 3000000, estimateHigh: 5000000, hammer: 4200000 },
      { title: "Pup Cup (FRP Sculpture)", date: "2024-04-12", house: "Phillips", estimateLow: 200000, estimateHigh: 300000, hammer: 350000 }
    ],
    marketSummary: "Yoshitomo Nara has solidified his position as one of the most important Japanese contemporary artists, with a market that draws heavily from Asian collectors — particularly in Hong Kong and mainland China. The $25M record for 'Knife Behind Back' (2019) marked a dramatic rerating that has largely held.\n\nNara's appeal lies in the deceptive simplicity of his imagery — the rebellious girl figures carry emotional depth that resonates across cultures. The Düsseldorf-period works (during his time in Germany) are increasingly recognized as pivotal, with prices reflecting growing institutional interest. Ceramics and smaller works on paper provide accessible entry points.\n\nOutlook: Moderately bullish. Nara benefits from structural Asian demand and a manageable production volume. The 2019–21 speculative spike has corrected to more sustainable levels. Major paintings remain trophy assets with limited supply. Risk: over-reliance on Asian collectors creates geographic concentration vulnerability."
  },
  {
    name: "Jeff Koons",
    slug: "jeff-koons",
    nationality: "American",
    flag: "🇺🇸",
    born: 1955,
    died: null,
    based: "New York, NY",
    mediums: ["Sculpture", "Painting", "Installation"],
    movements: ["Neo-Pop", "Contemporary", "Kitsch"],
    marketScore: 72,
    trend12m: -6.8,
    kpis: {
      totalLots: 2480,
      sellThroughRate: 64,
      avgHammerPrice: 280000,
      medianHammerPrice: 52000,
      marketVolume12m: 42000000,
      allTimeHigh: { price: 91100000, title: "Rabbit", year: 2019, house: "Christie's" }
    },
    priceHistory: [
      { year: 2014, avg: 420000, median: 65000, high: 58400000 },
      { year: 2015, avg: 350000, median: 58000, high: 12400000 },
      { year: 2016, avg: 310000, median: 52000, high: 8200000 },
      { year: 2017, avg: 280000, median: 48000, high: 6500000 },
      { year: 2018, avg: 260000, median: 45000, high: 5800000 },
      { year: 2019, avg: 520000, median: 55000, high: 91100000 },
      { year: 2020, avg: 240000, median: 42000, high: 3200000 },
      { year: 2021, avg: 320000, median: 50000, high: 12800000 },
      { year: 2022, avg: 290000, median: 48000, high: 8500000 },
      { year: 2023, avg: 265000, median: 46000, high: 5200000 },
      { year: 2024, avg: 255000, median: 48000, high: 4800000 },
      { year: 2025, avg: 268000, median: 50000, high: 6200000 }
    ],
    priceTiers: [
      { type: "Sculpture", avgPrice: 1800000, range: "€100K–€91M", volumePercent: 35, sellThrough: 72 },
      { type: "Oil Painting", avgPrice: 850000, range: "€50K–€18M", volumePercent: 20, sellThrough: 65 },
      { type: "Print/Edition", avgPrice: 15000, range: "€2K–€200K", volumePercent: 25, sellThrough: 58 },
      { type: "Porcelain", avgPrice: 120000, range: "€10K–€1.2M", volumePercent: 12, sellThrough: 62 },
      { type: "Inflatables (Editions)", avgPrice: 42000, range: "€5K–€350K", volumePercent: 8, sellThrough: 60 }
    ],
    periods: [
      { name: "The New", years: "1980–1983", avgPrice: 580000, works: 35, trend: "stable" },
      { name: "Equilibrium & Luxury", years: "1985–1988", avgPrice: 3200000, works: 42, trend: "stable" },
      { name: "Banality", years: "1988–1991", avgPrice: 8500000, works: 28, trend: "rising" },
      { name: "Celebration", years: "1994–2006", avgPrice: 12000000, works: 18, trend: "stable" },
      { name: "Antiquity & Gazing Ball", years: "2009–present", avgPrice: 1200000, works: 85, trend: "declining" }
    ],
    auctionHouseDistribution: [
      { house: "Christie's", percent: 42 },
      { house: "Sotheby's", percent: 35 },
      { house: "Phillips", percent: 12 },
      { house: "Bonhams", percent: 5 },
      { house: "Others", percent: 6 }
    ],
    geographicDistribution: [
      { city: "New York", percent: 45 },
      { city: "London", percent: 25 },
      { city: "Hong Kong", percent: 12 },
      { city: "Paris", percent: 10 },
      { city: "Others", percent: 8 }
    ],
    comparables: [
      { name: "Damien Hirst", score: 68, avgPrice: 142000, correlation: 0.74 },
      { name: "Takashi Murakami", score: 72, avgPrice: 280000, correlation: 0.66 },
      { name: "Claes Oldenburg", score: 62, avgPrice: 180000, correlation: 0.58 },
      { name: "Richard Prince", score: 65, avgPrice: 250000, correlation: 0.62 }
    ],
    recentSales: [
      { title: "Balloon Dog (Yellow) — Edition", date: "2025-11-05", house: "Christie's", estimateLow: 3000000, estimateHigh: 5000000, hammer: 6200000 },
      { title: "Gazing Ball (Titian Diana and Actaeon)", date: "2025-06-18", house: "Sotheby's", estimateLow: 1500000, estimateHigh: 2500000, hammer: 1800000 },
      { title: "Sacred Heart (Red/Gold)", date: "2025-02-25", house: "Phillips", estimateLow: 2000000, estimateHigh: 3000000, hammer: 2400000 },
      { title: "Metallic Venus", date: "2024-11-14", house: "Christie's", estimateLow: 4000000, estimateHigh: 6000000, hammer: 4800000 },
      { title: "Play-Doh", date: "2024-06-22", house: "Sotheby's", estimateLow: 8000000, estimateHigh: 12000000, hammer: 7200000 },
      { title: "Balloon Monkey (Magenta)", date: "2024-03-10", house: "Christie's", estimateLow: 5000000, estimateHigh: 8000000, hammer: 5600000 }
    ],
    marketSummary: "Jeff Koons occupies a peculiar position in the art market: the holder of the living artist auction record ($91.1M for 'Rabbit', 2019) yet a market in structural decline. The 64% sell-through rate and downward price trend reflect deep market skepticism about non-trophy works.\n\nThe Celebration series sculptures (Balloon Dog, Rabbit, etc.) remain blue-chip trophy assets, but these represent fewer than 20 works. Everything else — the prints, editions, Gazing Ball series — faces persistent buyer resistance. Production costs for new works reportedly strain the studio's economics.\n\nOutlook: Mixed. Trophy sculptures are bulletproof assets with institutional demand. Everything below the mega-lot tier is structurally challenged. The Banality series is quietly repricing upward as art historical reassessment positions it as the artist's most conceptually rigorous body of work. The print/edition market lacks conviction."
  },
  {
    name: "Cecily Brown",
    slug: "cecily-brown",
    nationality: "British",
    flag: "🇬🇧",
    born: 1969,
    died: null,
    based: "New York, NY",
    mediums: ["Painting", "Drawing", "Print", "Monotype"],
    movements: ["Abstract Expressionism", "Contemporary", "Figurative"],
    marketScore: 86,
    trend12m: 18.4,
    kpis: {
      totalLots: 890,
      sellThroughRate: 84,
      avgHammerPrice: 720000,
      medianHammerPrice: 185000,
      marketVolume12m: 52000000,
      allTimeHigh: { price: 6700000, title: "The Triumph of Death", year: 2023, house: "Sotheby's" }
    },
    priceHistory: [
      { year: 2014, avg: 180000, median: 65000, high: 1200000 },
      { year: 2015, avg: 210000, median: 72000, high: 1400000 },
      { year: 2016, avg: 245000, median: 80000, high: 1800000 },
      { year: 2017, avg: 280000, median: 85000, high: 2200000 },
      { year: 2018, avg: 350000, median: 95000, high: 2800000 },
      { year: 2019, avg: 420000, median: 110000, high: 3400000 },
      { year: 2020, avg: 380000, median: 105000, high: 2200000 },
      { year: 2021, avg: 550000, median: 140000, high: 4200000 },
      { year: 2022, avg: 680000, median: 165000, high: 5800000 },
      { year: 2023, avg: 820000, median: 195000, high: 6700000 },
      { year: 2024, avg: 750000, median: 180000, high: 5200000 },
      { year: 2025, avg: 850000, median: 210000, high: 6400000 }
    ],
    priceTiers: [
      { type: "Oil Painting", avgPrice: 1800000, range: "€100K–€6.7M", volumePercent: 55, sellThrough: 88 },
      { type: "Work on Paper", avgPrice: 85000, range: "€8K–€450K", volumePercent: 20, sellThrough: 82 },
      { type: "Monotype", avgPrice: 120000, range: "€15K–€380K", volumePercent: 12, sellThrough: 80 },
      { type: "Print/Edition", avgPrice: 12000, range: "€2K–€80K", volumePercent: 8, sellThrough: 75 },
      { type: "Drawing", avgPrice: 45000, range: "€5K–€200K", volumePercent: 5, sellThrough: 78 }
    ],
    periods: [
      { name: "Early Abstractions", years: "1994–2000", avgPrice: 850000, works: 65, trend: "rising" },
      { name: "Figure in Landscape", years: "2000–2008", avgPrice: 1200000, works: 120, trend: "rising" },
      { name: "Old Master Reinterpretation", years: "2008–2016", avgPrice: 1600000, works: 95, trend: "rising" },
      { name: "Epic Scale", years: "2016–present", avgPrice: 2800000, works: 68, trend: "rising" }
    ],
    auctionHouseDistribution: [
      { house: "Sotheby's", percent: 35 },
      { house: "Christie's", percent: 32 },
      { house: "Phillips", percent: 22 },
      { house: "Bonhams", percent: 5 },
      { house: "Others", percent: 6 }
    ],
    geographicDistribution: [
      { city: "New York", percent: 42 },
      { city: "London", percent: 30 },
      { city: "Hong Kong", percent: 12 },
      { city: "Paris", percent: 8 },
      { city: "Others", percent: 8 }
    ],
    comparables: [
      { name: "Jenny Saville", score: 82, avgPrice: 650000, correlation: 0.78 },
      { name: "Dana Schutz", score: 74, avgPrice: 420000, correlation: 0.72 },
      { name: "Adrian Ghenie", score: 80, avgPrice: 580000, correlation: 0.68 },
      { name: "Peter Doig", score: 83, avgPrice: 1200000, correlation: 0.65 }
    ],
    recentSales: [
      { title: "Where, When, How Often and with Whom", date: "2025-11-08", house: "Sotheby's", estimateLow: 3500000, estimateHigh: 5000000, hammer: 6400000 },
      { title: "The Last Shipwreck", date: "2025-05-22", house: "Christie's", estimateLow: 2000000, estimateHigh: 3000000, hammer: 3800000 },
      { title: "Skulldiver IV", date: "2025-02-10", house: "Phillips", estimateLow: 1200000, estimateHigh: 1800000, hammer: 2200000 },
      { title: "Park (Large)", date: "2024-11-14", house: "Sotheby's", estimateLow: 1500000, estimateHigh: 2500000, hammer: 3200000 },
      { title: "Untitled (Figures)", date: "2024-07-08", house: "Christie's", estimateLow: 800000, estimateHigh: 1200000, hammer: 1450000 },
      { title: "Boy Trouble (Monotype)", date: "2024-04-20", house: "Phillips", estimateLow: 80000, estimateHigh: 120000, hammer: 145000 }
    ],
    marketSummary: "Cecily Brown is experiencing the strongest market momentum of any painter in the current cycle. The +18.4% twelve-month trend is driven by a confluence of factors: the Met Breuer retrospective's critical acclaim, institutional acquisitions by major museums, and a market correction in male-dominated abstract expressionism that has redirected capital toward Brown's work.\n\nHer paintings — which blur figuration and abstraction with an Old Master's command of paint — have found a collector base that spans traditional and contemporary art buyers. The 84% sell-through rate and consistent over-estimate results signal genuine demand rather than speculative froth. Supply is relatively controlled, with approximately 30–40 paintings per year.\n\nOutlook: Bullish. Brown is in her artistic prime with critical and commercial momentum aligned. The art historical positioning — bridging de Kooning, Rubens, and contemporary figuration — gives her market unusual durability. Works above 200cm are the strongest performers. The monotype market is an underappreciated entry point. Risk: rapid price escalation could invite profit-taking, but institutional demand provides a floor."
  }
];

// Helper to find artists by search query
function searchArtists(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return ARTISTS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.slug.includes(q) ||
    a.nationality.toLowerCase().includes(q) ||
    a.movements.some(m => m.toLowerCase().includes(q)) ||
    a.mediums.some(m => m.toLowerCase().includes(q))
  );
}

function getArtistBySlug(slug) {
  return ARTISTS.find(a => a.slug === slug);
}
