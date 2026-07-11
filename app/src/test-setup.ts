import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

/**
 * Controllable IntersectionObserver mock.
 *
 * By default, observe() reports isIntersecting: true (backward compatible
 * with existing tests). Tests that need to verify the "not visible" branch
 * can set (globalThis as any).__ioVisible = false before rendering.
 */
class MockIntersectionObserver {
  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    const visible = (globalThis as Record<string, unknown>).__ioVisible !== false;
    this.callback(
      [{ isIntersecting: visible, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  // Reset IO visibility to default for next test
  delete (globalThis as Record<string, unknown>).__ioVisible;
});
