// Indian Stock Market Data Engine

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  prevClose: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  volume: number;
  history: number[];
}

export interface MarketIndex {
  name: string;
  value: number;
  prevClose: number;
  change: number;
  changePct: number;
  history: number[];
}

export interface CrisisEvent {
  type: 'war' | 'energy' | 'strike' | 'none';
  label: string;
  severity: number; // 0-100
  active: boolean;
  startedAt: number;
}

export interface Whisper {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: number;
  symbol?: string;
}

const INDIAN_STOCKS: Omit<Stock, 'change' | 'changePct' | 'high' | 'low' | 'volume' | 'history'>[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', price: 2485, prevClose: 2485 },
  { symbol: 'TCS', name: 'Tata Consultancy', sector: 'IT', price: 3820, prevClose: 3820 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', price: 1645, prevClose: 1645 },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', price: 1520, prevClose: 1520 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', price: 1180, prevClose: 1180 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', price: 2340, prevClose: 2340 },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', price: 435, prevClose: 435 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', price: 625, prevClose: 625 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', price: 1560, prevClose: 1560 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', price: 1785, prevClose: 1785 },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infra', price: 3420, prevClose: 3420 },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', price: 1095, prevClose: 1095 },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT', price: 465, prevClose: 465 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', sector: 'Conglomerate', price: 2780, prevClose: 2780 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', price: 945, prevClose: 945 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', sector: 'Pharma', price: 1680, prevClose: 1680 },
  { symbol: 'ONGC', name: 'ONGC', sector: 'Energy', price: 265, prevClose: 265 },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', sector: 'Power', price: 315, prevClose: 315 },
  { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Power', price: 365, prevClose: 365 },
  { symbol: 'COALINDIA', name: 'Coal India', sector: 'Mining', price: 445, prevClose: 445 },
];

const CRISIS_EVENTS: Omit<CrisisEvent, 'active' | 'startedAt'>[] = [
  { type: 'war', label: '⚠ BORDER TENSION ESCALATION — DEFENCE MOBILIZED', severity: 85 },
  { type: 'energy', label: '⛽ CRUDE OIL SUPPLY DISRUPTION — OPEC EMERGENCY', severity: 72 },
  { type: 'strike', label: '🏭 NATIONAL WORKERS STRIKE — PRODUCTION HALTED', severity: 60 },
  { type: 'war', label: '🚨 REGIONAL CONFLICT — SHIPPING ROUTES THREATENED', severity: 78 },
  { type: 'energy', label: '⚡ ENERGY GRID FAILURE — ROLLING BLACKOUTS', severity: 65 },
];

function generateHistory(base: number, points: number, volatility: number): number[] {
  const history: number[] = [];
  let current = base * (1 + (Math.random() - 0.5) * 0.05);
  for (let i = 0; i < points; i++) {
    current += current * (Math.random() - 0.5) * volatility;
    history.push(Math.round(current * 100) / 100);
  }
  return history;
}

export function initializeStocks(): Stock[] {
  return INDIAN_STOCKS.map(s => {
    const history = generateHistory(s.price, 60, 0.004);
    const currentPrice = history[history.length - 1];
    const change = currentPrice - s.prevClose;
    return {
      ...s,
      price: currentPrice,
      change: Math.round(change * 100) / 100,
      changePct: Math.round((change / s.prevClose) * 10000) / 100,
      high: Math.max(...history),
      low: Math.min(...history),
      volume: Math.floor(Math.random() * 5000000) + 500000,
      history,
    };
  });
}

export function initializeIndices(): MarketIndex[] {
  const niftyHistory = generateHistory(22450, 60, 0.002);
  const sensexHistory = generateHistory(73800, 60, 0.002);
  const bankNiftyHistory = generateHistory(48200, 60, 0.003);

  return [
    {
      name: 'NIFTY 50',
      value: niftyHistory[niftyHistory.length - 1],
      prevClose: 22450,
      change: niftyHistory[niftyHistory.length - 1] - 22450,
      changePct: ((niftyHistory[niftyHistory.length - 1] - 22450) / 22450) * 100,
      history: niftyHistory,
    },
    {
      name: 'SENSEX',
      value: sensexHistory[sensexHistory.length - 1],
      prevClose: 73800,
      change: sensexHistory[sensexHistory.length - 1] - 73800,
      changePct: ((sensexHistory[sensexHistory.length - 1] - 73800) / 73800) * 100,
      history: sensexHistory,
    },
    {
      name: 'BANK NIFTY',
      value: bankNiftyHistory[bankNiftyHistory.length - 1],
      prevClose: 48200,
      change: bankNiftyHistory[bankNiftyHistory.length - 1] - 48200,
      changePct: ((bankNiftyHistory[bankNiftyHistory.length - 1] - 48200) / 48200) * 100,
      history: bankNiftyHistory,
    },
  ];
}

export function tickStock(stock: Stock, crisis: CrisisEvent): Stock {
  const crisisImpact = crisis.active ? -(crisis.severity / 5000) * (Math.random() * 0.8 + 0.2) : 0;
  const drift = (Math.random() - 0.5) * 0.003 + crisisImpact;
  const newPrice = Math.round((stock.price * (1 + drift)) * 100) / 100;
  const newHistory = [...stock.history.slice(-119), newPrice];
  const change = newPrice - stock.prevClose;

  return {
    ...stock,
    price: newPrice,
    change: Math.round(change * 100) / 100,
    changePct: Math.round((change / stock.prevClose) * 10000) / 100,
    high: Math.max(stock.high, newPrice),
    low: Math.min(stock.low, newPrice),
    volume: stock.volume + Math.floor(Math.random() * 10000),
    history: newHistory,
  };
}

export function tickIndex(index: MarketIndex, crisis: CrisisEvent): MarketIndex {
  const crisisImpact = crisis.active ? -(crisis.severity / 6000) * (Math.random() * 0.7 + 0.3) : 0;
  const drift = (Math.random() - 0.5) * 0.0015 + crisisImpact;
  const newValue = Math.round((index.value * (1 + drift)) * 100) / 100;
  const newHistory = [...index.history.slice(-119), newValue];
  const change = newValue - index.prevClose;

  return {
    ...index,
    value: newValue,
    change: Math.round(change * 100) / 100,
    changePct: Math.round((change / index.prevClose) * 10000) / 100,
    history: newHistory,
  };
}

export function maybeSpawnCrisis(current: CrisisEvent, elapsed: number): CrisisEvent {
  if (current.active) {
    // Crisis lasts 20-40 seconds
    if (elapsed > 20000 + Math.random() * 20000) {
      return { type: 'none', label: '', severity: 0, active: false, startedAt: 0 };
    }
    // Severity escalates over time
    return {
      ...current,
      severity: Math.min(95, current.severity + Math.random() * 0.3),
    };
  }

  // ~2% chance per tick to spawn a crisis (roughly every 50s on avg at 1s ticks)
  if (Math.random() < 0.02) {
    const event = CRISIS_EVENTS[Math.floor(Math.random() * CRISIS_EVENTS.length)];
    return { ...event, active: true, startedAt: Date.now() };
  }

  return current;
}

export function detectAnomaly(stocks: Stock[]): Whisper | null {
  // Only fire occasionally
  if (Math.random() > 0.08) return null;

  const anomalies: Whisper[] = [];

  for (const stock of stocks) {
    const recent = stock.history.slice(-10);
    if (recent.length < 5) continue;

    const avgChange = recent.slice(1).reduce((sum, v, i) => sum + Math.abs(v - recent[i]), 0) / (recent.length - 1);
    const lastChange = Math.abs(recent[recent.length - 1] - recent[recent.length - 2]);

    if (lastChange > avgChange * 2.5) {
      const direction = recent[recent.length - 1] > recent[recent.length - 2] ? 'surge' : 'drop';
      anomalies.push({
        id: `${Date.now()}-${stock.symbol}`,
        message: `Unusual ${direction} detected in ${stock.symbol} — velocity ${(lastChange / avgChange).toFixed(1)}x normal`,
        severity: lastChange > avgChange * 4 ? 'critical' : 'warning',
        timestamp: Date.now(),
        symbol: stock.symbol,
      });
    }
  }

  // Volume anomaly
  const highVolStock = stocks.reduce((a, b) => a.volume > b.volume ? a : b);
  if (Math.random() < 0.3) {
    anomalies.push({
      id: `${Date.now()}-vol`,
      message: `Heavy accumulation in ${highVolStock.symbol} — volume ${(highVolStock.volume / 1000000).toFixed(1)}M`,
      severity: 'info',
      timestamp: Date.now(),
      symbol: highVolStock.symbol,
    });
  }

  return anomalies.length > 0 ? anomalies[Math.floor(Math.random() * anomalies.length)] : null;
}

export function getTopMovers(stocks: Stock[]): { winners: Stock[]; losers: Stock[] } {
  const sorted = [...stocks].sort((a, b) => b.changePct - a.changePct);
  return {
    winners: sorted.slice(0, 2),
    losers: sorted.slice(-2).reverse(),
  };
}

export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatVolume(v: number): string {
  if (v >= 10000000) return `${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toString();
}
