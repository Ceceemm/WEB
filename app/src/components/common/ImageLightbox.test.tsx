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

  it('traps focus, restores trigger focus, and preserves existing inert state', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const trigger = document.createElement('button');
    document.body.append(trigger);
    trigger.focus();
    const root = document.createElement('div');
    root.id = 'root';
    root.setAttribute('inert', '');
    document.body.append(root);

    const { unmount } = render(
      <ImageLightbox src="/test.jpg" alt="测试设备" open onClose={onClose} />,
    );

    const closeButton = screen.getByRole('button', { name: '关闭图片预览' });
    expect(closeButton).toHaveFocus();
    await user.keyboard('{Tab}');
    expect(closeButton).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    expect(root).toHaveAttribute('inert');
    trigger.remove();
    root.remove();
  });

  it('removes only its own inert state and uses latest onClose callback', async () => {
    const user = userEvent.setup();
    const firstOnClose = vi.fn();
    const secondOnClose = vi.fn();
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
    const { rerender, unmount } = render(
      <ImageLightbox src="/test.jpg" alt="测试设备" open onClose={firstOnClose} />,
    );

    expect(root).toHaveAttribute('inert');
    rerender(<ImageLightbox src="/test.jpg" alt="测试设备" open onClose={secondOnClose} />);
    expect(screen.getByRole('button', { name: '关闭图片预览' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(firstOnClose).not.toHaveBeenCalled();
    expect(secondOnClose).toHaveBeenCalledTimes(1);

    unmount();
    expect(root).not.toHaveAttribute('inert');
    root.remove();
  });
});
