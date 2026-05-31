interface SectionNumberProps {
  number: string;
  className?: string;
}

export function SectionNumber({ number, className = '' }: SectionNumberProps) {
  return (
    <div
      className={`absolute select-none pointer-events-none font-display font-black text-[200px] md:text-[300px] leading-none text-forge-warm-muted/[0.04] ${className}`}
      aria-hidden="true"
    >
      {number}
    </div>
  );
}
