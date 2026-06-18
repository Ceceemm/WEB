import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'right' | 'left' | 'fade';
  delay?: number; // ms
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (isVisible) return;

    const node = ref.current;
    if (!node) return;

    let revealTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = window.setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (revealTimer) window.clearTimeout(revealTimer);
    };
  }, [delay, isVisible, threshold]);

  const hiddenTransform = (() => {
    switch (direction) {
      case 'up':    return 'translateY(16px)';
      case 'right': return 'translateX(-16px)';
      case 'left':  return 'translateX(16px)';
      default:      return 'translateY(16px)';
    }
  })();

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0)' : hiddenTransform,
    transition: `opacity 0.4s cubic-bezier(0.21, 0.6, 0.35, 1), transform 0.4s cubic-bezier(0.21, 0.6, 0.35, 1)`,
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
