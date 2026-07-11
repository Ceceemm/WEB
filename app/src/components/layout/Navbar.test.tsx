import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  function renderNavbar() {
    return render(
      <>
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <Navbar />
        <main id="main-content">主要内容</main>
        <footer>页脚</footer>
      </>,
    );
  }

  it('keeps mobile menu unfocusable while closed', () => {
    renderNavbar();

    const menu = document.getElementById('mobile-menu');
    if (!menu) throw new Error('Missing mobile menu');
    expect(menu).toHaveAttribute('aria-hidden', 'true');
    expect(menu).toHaveAttribute('inert');
    expect(within(menu).getByRole('button', { name: '关闭菜单', hidden: true })).toHaveAttribute('tabindex', '-1');
    for (const link of within(menu).getAllByRole('link', { hidden: true })) {
      expect(link).toHaveAttribute('tabindex', '-1');
    }
  });

  it('opens mobile menu with focus trap and restores background state', async () => {
    const user = userEvent.setup();
    renderNavbar();

    const openButton = screen.getByRole('button', { name: '打开菜单' });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');

    const main = screen.getByRole('main');
    main.setAttribute('inert', '');

    await user.click(openButton);

    expect(openButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    const menu = screen.getByRole('dialog', { name: '移动端导航菜单' });
    expect(menu).toHaveAttribute('aria-hidden', 'false');
    expect(menu).not.toHaveAttribute('inert');
    const closeButton = within(menu).getByRole('button', { name: '关闭菜单' });
    expect(closeButton).toHaveFocus();
    expect(closeButton).toHaveAttribute('tabindex', '0');
    for (const link of within(menu).getAllByRole('link')) {
      expect(link).toHaveAttribute('tabindex', '0');
    }
    expect(
      within(menu).getByRole('link', { name: '电话咨询 13606464864' })
    ).toHaveAttribute('href', 'tel:13606464864');
    expect(within(menu).getByText('微信 AQZTJX')).toBeInTheDocument();

    const menuLinks = within(menu).getAllByRole('link');
    const lastFocusable = menuLinks[menuLinks.length - 1];
    lastFocusable.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(lastFocusable).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(openButton).toHaveAttribute('aria-expanded', 'false');
    expect(openButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    expect(main).toHaveAttribute('inert');
    expect(screen.getByText('跳到主要内容')).not.toHaveAttribute('inert');
  });
});
