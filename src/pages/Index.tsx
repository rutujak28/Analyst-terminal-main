import { TerminalHeader } from '@/components/terminal/TerminalHeader';
import { TickerTape } from '@/components/terminal/TickerTape';
import { IndexPanel } from '@/components/terminal/IndexPanel';
import { CritMeter } from '@/components/terminal/CritMeter';
import { TopMovers } from '@/components/terminal/TopMovers';
import { WhisperPanel } from '@/components/terminal/WhisperPanel';
import { StockTable } from '@/components/terminal/StockTable';
import { useMarketEngine } from '@/hooks/useMarketEngine';

const Index = () => {
  const { stocks, indices, crisis, whispers, critPercent, dismissWhisper } = useMarketEngine();

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      <TerminalHeader />
      <TickerTape stocks={stocks} />

      <div className="flex-1 p-3 grid grid-cols-12 gap-3 max-h-[calc(100vh-72px)] overflow-hidden">
        {/* Left column: Indices + CRIT + Movers */}
        <div className="col-span-3 flex flex-col gap-3 overflow-y-auto">
          <IndexPanel indices={indices} />
          <CritMeter critPercent={critPercent} crisis={crisis} />
          <TopMovers stocks={stocks} />
        </div>

        {/* Center: Stock table */}
        <div className="col-span-6 overflow-y-auto">
          <StockTable stocks={stocks} />
        </div>

        {/* Right column: Whispers */}
        <div className="col-span-3 flex flex-col gap-3 overflow-y-auto">
          <WhisperPanel whispers={whispers} onDismiss={dismissWhisper} />

          {/* Sector heatmap mini */}
          <div className="terminal-panel p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-display">
              Sector Pulse
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {getSectorData(stocks).map(sector => (
                <div
                  key={sector.name}
                  className={`p-2 rounded-sm text-center border ${
                    sector.avg >= 0
                      ? 'border-terminal-green/20 bg-terminal-green/5'
                      : 'border-terminal-red/20 bg-terminal-red/5'
                  }`}
                >
                  <div className="text-[8px] text-muted-foreground truncate">{sector.name}</div>
                  <div className={`text-[10px] font-data font-semibold tabular-nums ${
                    sector.avg >= 0 ? 'text-terminal-green' : 'text-terminal-red'
                  }`}>
                    {sector.avg >= 0 ? '+' : ''}{sector.avg.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getSectorData(stocks: { sector: string; changePct: number }[]) {
  const map = new Map<string, number[]>();
  stocks.forEach(s => {
    const arr = map.get(s.sector) || [];
    arr.push(s.changePct);
    map.set(s.sector, arr);
  });
  return Array.from(map.entries()).map(([name, vals]) => ({
    name,
    avg: vals.reduce((a, b) => a + b, 0) / vals.length,
  }));
}

export default Index;
