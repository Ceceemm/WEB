import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('shows a single, explicit phone consultation action', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: '致电咨询 13606464864' })).toHaveAttribute(
      'href',
      'tel:13606464864'
    );
  });
});
