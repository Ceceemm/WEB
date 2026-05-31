import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useScrollLock(open);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forge-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `${alt} 大图预览` : '图片预览'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-forge-mid/80 hover:bg-forge-orange text-forge-cream transition-colors"
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
}
