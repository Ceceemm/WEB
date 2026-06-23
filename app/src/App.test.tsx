import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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

  it('falls back to homepage for unknown path', () => {
    render(<App path="/nonexistent-path/index.html" />);
    // Unknown path falls back to homepage (getPageByPath returns pageRoutes[0])
    expect(screen.getAllByText(/安丘市增涛机械有限公司/).length).toBeGreaterThan(0);
  });
});
