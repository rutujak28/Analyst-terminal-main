import { useEffect, useState } from 'react';

export function TerminalHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const ist = new Date(time.getTime() + (5.5 * 60 * 60 * 1000 - time.getTimezoneOffset() * 60 * 1000));

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          <span className="text-xs font-display font-bold text-foreground tracking-wide">FIELD LOG</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-data">Market Operations Desk</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-[10px] text-muted-foreground font-data">
          NSE / BSE
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">IST</span>
          <span className="text-xs font-data text-terminal-green tabular-nums glow-green">
            {ist.toLocaleTimeString('en-IN', { hour12: false })}
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground font-data">
          {time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </header>
  );
}
