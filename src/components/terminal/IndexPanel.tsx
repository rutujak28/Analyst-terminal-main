import { MarketIndex, formatINR } from '@/lib/marketData';
import { MiniChart } from './MiniChart';

interface IndexPanelProps {
  indices: MarketIndex[];
}

export function IndexPanel({ indices }: IndexPanelProps) {
  return (
    <div className="terminal-panel p-3">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-display">
        Market Indices
      </div>
      <div className="space-y-3">
        {indices.map(idx => (
          <div key={idx.name} className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground truncate">{idx.name}</div>
              <div className={`text-sm font-semibold font-data ${idx.change >= 0 ? 'text-terminal-green glow-green' : 'text-terminal-red glow-red'}`}>
                {formatINR(idx.value)}
              </div>
              <div className={`text-[10px] ${idx.change >= 0 ? 'text-terminal-green-dim' : 'text-terminal-red-dim'}`}>
                {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePct.toFixed(2)}%)
              </div>
            </div>
            <div className="w-24 h-10 flex-shrink-0">
              <MiniChart data={idx.history} positive={idx.change >= 0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
