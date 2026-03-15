import { Whisper } from '@/lib/marketData';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WhisperPanelProps {
  whispers: Whisper[];
  onDismiss: (id: string) => void;
}

export function WhisperPanel({ whispers, onDismiss }: WhisperPanelProps) {
  return (
    <div className="terminal-panel p-3">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-display flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal-cyan animate-pulse" />
        Anomaly Whispers
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        <AnimatePresence>
          {whispers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-muted-foreground italic font-data"
            >
              Listening for anomalies...
            </motion.div>
          )}
          {whispers.map(w => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -8, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`text-[10px] font-data p-2 rounded-sm border flex items-start gap-2 ${
                w.severity === 'critical'
                  ? 'border-terminal-red/30 bg-terminal-red/5 text-terminal-red'
                  : w.severity === 'warning'
                  ? 'border-terminal-amber/30 bg-terminal-amber/5 text-terminal-amber'
                  : 'border-terminal-cyan/20 bg-terminal-cyan/5 text-terminal-cyan'
              }`}
            >
              <span className="flex-1 leading-relaxed">{w.message}</span>
              <button onClick={() => onDismiss(w.id)} className="opacity-40 hover:opacity-100 mt-0.5 flex-shrink-0">
                <X size={10} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
