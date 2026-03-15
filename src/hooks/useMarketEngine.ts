import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Stock, MarketIndex, CrisisEvent, Whisper,
  initializeStocks, initializeIndices,
  tickStock, tickIndex, maybeSpawnCrisis, detectAnomaly,
} from '@/lib/marketData';

export function useMarketEngine() {
  const [stocks, setStocks] = useState<Stock[]>(() => initializeStocks());
  const [indices, setIndices] = useState<MarketIndex[]>(() => initializeIndices());
  const [crisis, setCrisis] = useState<CrisisEvent>({ type: 'none', label: '', severity: 0, active: false, startedAt: 0 });
  const [whispers, setWhispers] = useState<Whisper[]>([]);
  const [critPercent, setCritPercent] = useState(0);
  const crisisRef = useRef(crisis);

  useEffect(() => { crisisRef.current = crisis; }, [crisis]);

  const tick = useCallback(() => {
    const currentCrisis = crisisRef.current;

    setStocks(prev => prev.map(s => tickStock(s, currentCrisis)));
    setIndices(prev => prev.map(i => tickIndex(i, currentCrisis)));

    const elapsed = currentCrisis.active ? Date.now() - currentCrisis.startedAt : 0;
    const newCrisis = maybeSpawnCrisis(currentCrisis, elapsed);
    setCrisis(newCrisis);

    if (newCrisis.active) {
      setCritPercent(prev => Math.min(99, prev + (newCrisis.severity / 200) * (Math.random() + 0.5)));
    } else {
      setCritPercent(prev => Math.max(0, prev - 0.8));
    }

    setStocks(prev => {
      const whisper = detectAnomaly(prev);
      if (whisper) {
        setWhispers(w => [whisper, ...w].slice(0, 8));
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const dismissWhisper = useCallback((id: string) => {
    setWhispers(w => w.filter(x => x.id !== id));
  }, []);

  return { stocks, indices, crisis, whispers, critPercent, dismissWhisper };
}
