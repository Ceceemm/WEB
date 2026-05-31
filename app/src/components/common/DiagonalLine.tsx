type Corner = 'tl' | 'tr' | 'bl' | 'br';

const coords: Record<Corner, readonly [string, string]> = {
  tl: ['0', '0'],
  tr: ['100', '0'],
  bl: ['0', '100'],
  br: ['100', '100'],
};

interface DiagonalLineProps {
  className?: string;
  from?: Corner;
  to?: Corner;
  color?: string;
  opacity?: number;
}

export function DiagonalLine({
  className = '',
  from = 'tr',
  to = 'bl',
  color = 'var(--forge-orange)',
  opacity = 0.08,
}: DiagonalLineProps) {
  const [x1, y1] = coords[from];
  const [x2, y2] = coords[to];
  const stroke = color.startsWith('hsl(') ? color : `hsl(${color})`;

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth="1"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
