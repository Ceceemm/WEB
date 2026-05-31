import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WebpImage } from './WebpImage';

describe('WebpImage', () => {
  it('omits the WebP source for JPG-only assets', () => {
    const { container } = render(
      <WebpImage
        src="/images/products/product-23-debug-new.jpg"
        alt="设备调试"
        useWebp={false}
      />,
    );

    expect(container.querySelector('source[type="image/webp"]')).toBeNull();
    expect(screen.getByAltText('设备调试')).toHaveAttribute(
      'src',
      '/images/products/product-23-debug-new.jpg',
    );
  });
});
