import { describe, expect, it } from 'vitest';
import { productCategories, products } from './products';

describe('products data', () => {
  it('keeps every product connected to a known category', () => {
    const categoryKeys = new Set(productCategories.map((category) => category.key));

    expect(productCategories).toHaveLength(3);
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(categoryKeys.has(product.category)).toBe(true);
    }
  });

  it('keeps ids unique and image paths consistent', () => {
    const ids = new Set(products.map((product) => product.id));

    expect(ids.size).toBe(products.length);

    for (const product of products) {
      expect(product.name).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.image).toMatch(/^\/images\/products\/.+\.jpg$/);
    }
  });

  it('removes the loader product from public product data', () => {
    expect(products.some((product) => product.id === 'p15')).toBe(false);
    expect(products.some((product) => product.name === '装车机')).toBe(false);
  });
});
