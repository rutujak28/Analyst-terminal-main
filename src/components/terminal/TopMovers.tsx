import { Stock, formatINR, getTopMovers } from '@/lib/marketData';

interface TopMoversProps {
  stocks: Stock[];
}

export function TopMovers({ stocks }: TopMoversProps) {
  const { winners, losers } = getTopMovers(stocks);

  return (
    <div className="terminal-panel p-3">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-display">
        Today's Movers
      </div>

      <div className="mb-3">
        <div className="text-[9px] text-terminal-green-dim uppercase tracking-widest mb-1.5">▲ Winners</div>
        {winners.map(s => (
          <div key={s.symbol} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
            <div>
              <div className="text-xs font-data text-foreground">{s.symbol}</div>
              <div className="text-[10px] text-muted-foreground">{s.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-data text-terminal-green">{formatINR(s.price)}</div>
              <div className="text-[10px] text-terminal-green-dim">+{s.changePct.toFixed(2)}%</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-[9px] text-terminal-red-dim uppercase tracking-widest mb-1.5">▼ Losers</div>
        {losers.map(s => (
          <div key={s.symbol} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
            <div>
              <div className="text-xs font-data text-foreground">{s.symbol}</div>
              <div className="text-[10px] text-muted-foreground">{s.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-data text-terminal-red">{formatINR(s.price)}</div>
              <div className="text-[10px] text-terminal-red-dim">{s.changePct.toFixed(2)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
