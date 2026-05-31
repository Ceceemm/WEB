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

  it('hides gallery-only items from product category panels', async () => {
    const user = userEvent.setup();

    render(<ProductsSection />);

    const oilPanel = screen.getByRole('tabpanel', { name: '榨油设备' });
    expect(within(oilPanel).queryByText('设备组装')).not.toBeInTheDocument();
    expect(within(oilPanel).queryByText('成品设备')).not.toBeInTheDocument();
    expect(within(oilPanel).queryByText('榨油机细节')).not.toBeInTheDocument();
    expect(within(oilPanel).queryByText('榨油设备展示')).not.toBeInTheDocument();
    expect(within(oilPanel).queryByText('机械产品展示')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: '处理设备' }));
    const processingPanel = screen.getByRole('tabpanel', { name: '处理设备' });
    expect(within(processingPanel).queryByText('生产车间')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: '装袋设备' }));
    const baggingPanel = screen.getByRole('tabpanel', { name: '装袋设备' });
    expect(within(baggingPanel).queryByText('装车机')).not.toBeInTheDocument();
  });
});
