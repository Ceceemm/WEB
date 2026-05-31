import { useState } from 'react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { WebpImage } from '@/components/common/WebpImage';
import { productCategories, products, type Product, type ProductCategory } from '@/data/products';

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory['key']>('oil-press');

  const currentCategory =
    productCategories.find((c) => c.key === activeCategory) ?? productCategories[0];
  const categoryProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="relative py-32 md:py-48 overflow-hidden bg-forge-black">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forge-cream mb-12">
            产品系列
          </h2>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={100}>
          <div
            className="flex gap-2 mb-16 border-b border-forge-light/20 overflow-x-auto pb-1"
            role="tablist"
            aria-label="产品分类"
          >
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                id={`product-tab-${cat.key}`}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.key}
                aria-controls={`product-panel-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-6 py-3 font-body font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? 'text-forge-cream'
                    : 'text-forge-gray hover:text-forge-cream/70'
                }`}
              >
                {cat.label}
                {activeCategory === cat.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-forge-orange animate-forge-glow" />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Category Description */}
        <ScrollReveal delay={150}>
          <p className="text-forge-gray text-sm font-mono tracking-wider mb-12">
            {currentCategory.description}
          </p>
        </ScrollReveal>

        {/* Product Grid */}
        <div
          id={`product-panel-${activeCategory}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-labelledby={`product-tab-${activeCategory}`}
          aria-label={`${currentCategory.label}产品列表`}
        >
          {categoryProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-forge-dark border border-forge-light/30 rounded-sm overflow-hidden transition-all duration-500 hover:border-forge-orange/60 hover:shadow-forge">
      {/* Image container */}
      <div className="aspect-[4/3] bg-forge-mid overflow-hidden">
        {imgError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-forge-gray/30 font-display text-sm">{product.name}</p>
          </div>
        ) : (
          <WebpImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ willChange: 'transform' }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-forge-cream group-hover:text-forge-orange transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-forge-gray text-sm font-body leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Heat line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forge-orange/0 to-transparent group-hover:via-forge-orange/70 transition-all duration-500" />
    </div>
  );
}
