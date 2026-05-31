import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ImageLightbox } from './ImageLightbox';

describe('ImageLightbox', () => {
  it('does not render when closed', () => {
    render(
      <ImageLightbox
        src="/images/products/product-01.jpg"
        alt="测试设备"
        open={false}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('locks scroll and closes with Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { unmount } = render(
      <ImageLightbox
        src="/images/products/product-01.jpg"
        alt="测试设备"
        open
        onClose={onClose}
      />
    );

    expect(screen.getByRole('dialog', { name: '测试设备 大图预览' })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
