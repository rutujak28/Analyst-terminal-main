import { CrisisEvent } from '@/lib/marketData';
import { motion, AnimatePresence } from 'framer-motion';

interface CritMeterProps {
  critPercent: number;
  crisis: CrisisEvent;
}

export function CritMeter({ critPercent, crisis }: CritMeterProps) {
  const displayPct = Math.round(critPercent);
  const isHot = critPercent > 40;
  const isCritical = critPercent > 70;

  return (
    <div className="terminal-panel p-3">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-display">
        CRIT %
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span
          className={`text-3xl font-bold font-data tabular-nums ${
            isCritical ? 'text-terminal-red glow-red crit-pulse' :
            isHot ? 'text-terminal-amber glow-amber' :
            'text-terminal-green-dim'
          }`}
        >
          {displayPct}
        </span>
        <span className="text-xs text-muted-foreground mb-1">%</span>
      </div>

      {/* Bar */}
      <div className="h-2 bg-muted rounded-sm overflow-hidden mb-3">
        <motion.div
          className={`h-full rounded-sm ${
            isCritical ? 'bg-terminal-red' :
            isHot ? 'bg-terminal-amber' :
            'bg-terminal-green-dim'
          }`}
          animate={{ width: `${Math.min(critPercent, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            boxShadow: isCritical ? '0 0 12px hsl(348 100% 51% / 0.5)' :
                       isHot ? '0 0 8px hsl(38 100% 50% / 0.3)' : 'none'
          }}
        />
      </div>

      {/* Crisis label */}
      <AnimatePresence mode="wait">
        {crisis.active && (
          <motion.div
            key={crisis.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`text-[10px] leading-tight font-data ${
              isCritical ? 'text-terminal-red' : 'text-terminal-amber'
            }`}
          >
            {crisis.label}
          </motion.div>
        )}
        {!crisis.active && critPercent < 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-muted-foreground font-data"
          >
            Systems nominal
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
