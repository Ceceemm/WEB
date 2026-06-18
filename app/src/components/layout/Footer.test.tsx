import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('links the ICP filing number to the MIIT filing system entry page', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: '鲁ICP备2026031639号' })).toHaveAttribute(
      'href',
      'https://beian.miit.gov.cn/#/Integrated/index',
    );
  });

  it('links the public security filing number with the filing icon', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: /公安备案图标鲁公网安备37078402000544号/ }),
    ).toHaveAttribute(
      'href',
      'https://beian.mps.gov.cn/#/query/webSearch?code=37078402000544',
    );
    expect(screen.getByRole('img', { name: '公安备案图标' })).toHaveAttribute(
      'src',
      '/images/beian-icon.png',
    );
  });
});
