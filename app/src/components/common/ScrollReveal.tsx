import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'right' | 'left' | 'fade';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
}: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
