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
});
