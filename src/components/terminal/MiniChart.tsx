interface MiniChartProps {
  data: number[];
  positive: boolean;
  height?: number;
}

export function MiniChart({ data, positive, height = 40 }: MiniChartProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const fillPoints = `0,${height} ${points} ${w},${height}`;
  const color = positive ? 'hsl(140, 100%, 50%)' : 'hsl(348, 100%, 51%)';
  const fillColor = positive ? 'hsl(140, 100%, 50%)' : 'hsl(348, 100%, 51%)';

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <polygon points={fillPoints} fill={fillColor} opacity="0.08" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {/* Current value dot */}
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
        r="2"
        fill={color}
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
