import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('shows mobile contact actions and locks scroll while the menu is open', async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const openButton = screen.getByRole('button', { name: '打开菜单' });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(openButton);

    expect(openButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(
      screen.getByRole('link', { name: '电话咨询 13606464864' })
    ).toHaveAttribute('href', 'tel:13606464864');
    expect(screen.getByText('微信 AQZTJX')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '关闭菜单' }));

    expect(openButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });
});
