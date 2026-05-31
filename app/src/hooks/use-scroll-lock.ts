import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function lockBodyScroll() {
  if (lockCount === 0) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}

/**
 * Locks body scroll when `locked` is true, compensating for scrollbar width
 * to prevent layout shift. Multiple overlays can hold the lock safely.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockBodyScroll();
    return unlockBodyScroll;
  }, [locked]);
}
