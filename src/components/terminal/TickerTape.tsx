import { Stock, formatINR } from '@/lib/marketData';

interface TickerTapeProps {
  stocks: Stock[];
}

export function TickerTape({ stocks }: TickerTapeProps) {
  const items = [...stocks, ...stocks]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-b border-border bg-muted/30 h-8 flex items-center">
      <div className="flex whitespace-nowrap ticker-scroll">
        {items.map((stock, i) => (
          <span key={`${stock.symbol}-${i}`} className="inline-flex items-center gap-1.5 px-4 text-xs font-data">
            <span className="text-muted-foreground">{stock.symbol}</span>
            <span className={stock.change >= 0 ? 'text-terminal-green' : 'text-terminal-red'}>
              {formatINR(stock.price)}
            </span>
            <span className={`text-[10px] ${stock.change >= 0 ? 'text-terminal-green-dim' : 'text-terminal-red-dim'}`}>
              {stock.change >= 0 ? '▲' : '▼'}{Math.abs(stock.changePct).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
