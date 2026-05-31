interface WebpImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
  useWebp?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Renders a <picture> element with WebP source + original format fallback.
 * Uses .webp when a matching sibling file is available.
 */
export function WebpImage({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  useWebp = true,
  onError,
}: WebpImageProps) {
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

  return (
    <picture className="block h-full w-full">
      {useWebp && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        onError={onError}
      />
    </picture>
  );
}
