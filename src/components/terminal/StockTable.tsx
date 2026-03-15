import { Stock, formatINR, formatVolume } from '@/lib/marketData';
import { MiniChart } from './MiniChart';
import { useState } from 'react';

interface StockTableProps {
  stocks: Stock[];
}

export function StockTable({ stocks }: StockTableProps) {
  const [sortKey, setSortKey] = useState<'changePct' | 'volume' | 'symbol'>('changePct');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...stocks].sort((a, b) => {
    const mul = sortDir === 'desc' ? -1 : 1;
    if (sortKey === 'symbol') return mul * a.symbol.localeCompare(b.symbol);
    return mul * ((a[sortKey] as number) - (b[sortKey] as number));
  });

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  return (
    <div className="terminal-panel p-3 scanline">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-display">
        Live Instruments
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] font-data">
          <thead>
            <tr className="text-muted-foreground border-b border-border/50">
              <th className="text-left py-1.5 pr-2 cursor-pointer hover:text-foreground" onClick={() => toggleSort('symbol')}>
                SYMBOL {sortKey === 'symbol' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right py-1.5 px-2">PRICE</th>
              <th className="text-right py-1.5 px-2 cursor-pointer hover:text-foreground" onClick={() => toggleSort('changePct')}>
                CHG% {sortKey === 'changePct' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right py-1.5 px-2 cursor-pointer hover:text-foreground" onClick={() => toggleSort('volume')}>
                VOL {sortKey === 'volume' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right py-1.5 pl-2 w-20">TREND</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(s => (
              <tr key={s.symbol} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                <td className="py-1.5 pr-2">
                  <div className="text-foreground">{s.symbol}</div>
                  <div className="text-[9px] text-muted-foreground">{s.sector}</div>
                </td>
                <td className={`text-right py-1.5 px-2 tabular-nums ${s.change >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {formatINR(s.price)}
                </td>
                <td className={`text-right py-1.5 px-2 tabular-nums ${s.change >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {s.change >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                </td>
                <td className="text-right py-1.5 px-2 text-muted-foreground tabular-nums">
                  {formatVolume(s.volume)}
                </td>
                <td className="py-1.5 pl-2">
                  <div className="w-16 h-6 ml-auto">
                    <MiniChart data={s.history.slice(-30)} positive={s.change >= 0} height={24} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
