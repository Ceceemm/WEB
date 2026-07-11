import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App routing', () => {
  it('renders homepage for root path', () => {
    render(<App path="/" />);
    // Brand name appears in Navbar, Footer, and hero — verify it renders
    expect(screen.getAllByText(/安丘市增涛机械有限公司/).length).toBeGreaterThan(0);
  });

  it('renders about page for /gongsi/index.html', () => {
    render(<App path="/gongsi/index.html" />);
    expect(screen.getByText('做能进现场的机器')).toBeInTheDocument();
  });

  it('renders products overview for /chanpin/index.html', () => {
    render(<App path="/chanpin/index.html" />);
    expect(screen.getByText('榨油设备、处理设备、装袋设备')).toBeInTheDocument();
  });

  it('renders contact page for /lianxi/index.html', () => {
    render(<App path="/lianxi/index.html" />);
    expect(screen.getByText('需要选型，先打电话')).toBeInTheDocument();
  });

  it('renders FAQ page for /wenti/index.html', () => {
    render(<App path="/wenti/index.html" />);
    expect(screen.getByText('设备选型前先把问题说清楚')).toBeInTheDocument();
  });

  it('renders product detail page for /chanpin/luoxuan-zhayouji/index.html', () => {
    render(<App path="/chanpin/luoxuan-zhayouji/index.html" />);
    // Product name appears in breadcrumb and heading — verify multiple
    expect(screen.getAllByText('螺旋榨油机').length).toBeGreaterThan(0);
  });

  it('renders not-found page for unknown path', () => {
    render(<App path="/nonexistent-path/index.html" />);
    expect(screen.getByRole('heading', { name: '页面未找到' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回首页' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '查看产品分类' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '安丘增涛 机械有限公司' })).not.toBeInTheDocument();
  });

  it('focuses skip link before navigation', async () => {
    const user = userEvent.setup();
    render(<App path="/" />);

    await user.tab();

    const skipLink = screen.getByRole('link', { name: '跳到主要内容' });
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });
});
