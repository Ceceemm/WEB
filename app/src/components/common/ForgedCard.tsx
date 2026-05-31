import type { ReactNode } from 'react';

interface ForgedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  clipCorner?: boolean;
}

export function ForgedCard({
  children,
  className = '',
  hover = true,
  clipCorner = false,
}: ForgedCardProps) {
  return (
    <div
      className={`
        relative bg-forge-dark border border-forge-light
        ${hover ? 'animate-heat-border cursor-pointer' : ''}
        ${clipCorner ? 'clip-corner' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
