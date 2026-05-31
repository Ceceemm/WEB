import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductsSection } from './ProductsSection';

describe('ProductsSection', () => {
  it('renders category tabs with accessible selected state', async () => {
    const user = userEvent.setup();

    render(<ProductsSection />);

    const oilPressTab = screen.getByRole('tab', { name: '榨油设备' });
    const processingTab = screen.getByRole('tab', { name: '处理设备' });

    expect(oilPressTab).toHaveAttribute('aria-selected', 'true');

    await user.click(processingTab);

    expect(processingTab).toHaveAttribute('aria-selected', 'true');
    expect(oilPressTab).toHaveAttribute('aria-selected', 'false');
  });

  it('shows products for the selected category', async () => {
    const user = userEvent.setup();

    render(<ProductsSection />);

    await user.click(screen.getByRole('tab', { name: '处理设备' }));

    const panel = screen.getByRole('tabpanel', { name: '处理设备' });
    expect(within(panel).getByText('筛选机')).toBeInTheDocument();
  });
});
