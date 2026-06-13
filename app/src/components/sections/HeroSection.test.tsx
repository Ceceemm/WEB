import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('shows the phone consultation action with the plain phone number', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: '电话咨询' })).toHaveAttribute(
      'href',
      'tel:13606464864'
    );
    expect(screen.getByText('13606464864')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '拨打咨询电话 13606464864' })).toHaveAttribute(
      'href',
      'tel:13606464864'
    );
  });
});
