import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const appRoot = document.getElementById('root');
    appRoot?.setAttribute('inert', '');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      appRoot?.removeAttribute('inert');
      previousFocus?.focus();
    };
  }, [open, onClose]);

  useScrollLock(open);

  if (!open) return null;

  const lightbox = (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forge-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `${alt} 大图预览` : '图片预览'}
    >
      <button
        type="button"
        onClick={onClose}
        ref={closeButtonRef}
        className="absolute top-6 right-6 z-10 rounded-full bg-forge-mid/80 p-2 text-forge-cream transition-colors hover:bg-forge-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-paper"
        aria-label="关闭图片预览"
      >
        <X size={24} />
      </button>

      <div
        className="relative max-w-[90vw] max-h-[90vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          decoding="async"
          className="max-w-full max-h-[85vh] object-contain rounded-sm border border-forge-light/30"
        />
        <p className="text-center mt-4 text-forge-gray font-body text-sm">{alt}</p>
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}
