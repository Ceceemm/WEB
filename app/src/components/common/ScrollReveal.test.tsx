import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollReveal } from './ScrollReveal';

describe('ScrollReveal', () => {
  it('renders children and passes className to wrapper', () => {
    render(<ScrollReveal className="test-wrapper"><span>内容</span></ScrollReveal>);
    expect(screen.getByText('内容').parentElement).toHaveClass('test-wrapper');
  });
});
