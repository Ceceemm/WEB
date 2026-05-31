import { useState } from 'react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { WebpImage } from '@/components/common/WebpImage';
import { productCategories, products, type Product, type ProductCategory } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory['key']>('oil-press');

  const currentCategory =
    productCategories.find((c) => c.key === activeCategory) ?? productCategories[0];
  const categoryProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="relative overflow-hidden bg-forge-paper py-24 md:py-32">
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <ScrollReveal>
            <div>
              <p className="text-sm font-semibold text-forge-orange">产品系列</p>
              <h2 className="mt-4 font-display text-4xl md:text-6xl font-black leading-tight text-forge-warm-text">
                按现场工序选设备
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="max-w-2xl text-base md:text-lg leading-8 text-forge-warm-muted">
              从压榨、筛选、粉碎、炒制到煤炭装袋和装车，产品以真实设备照片为主，便于快速判断型号与使用场景。
            </p>
          </ScrollReveal>
        </div>

        {/* Category Tabs */}
        <ScrollReveal delay={100}>
          <div
            className="mb-10 grid gap-2 border-y border-forge-warm-border py-2 sm:grid-cols-3"
            role="tablist"
            aria-label="产品分类"
          >
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                id={`product-tab-${cat.key}`}
                type="button"
                role="tab"
                aria-label={cat.label}
                aria-selected={activeCategory === cat.key}
                aria-controls={`product-panel-${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-5 py-4 text-left text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-forge-warm-text text-forge-paper'
                    : 'bg-forge-surface text-forge-warm-muted hover:text-forge-warm-text'
                }`}
              >
                <span className="block text-base">{cat.label}</span>
                <span className={`mt-2 block text-xs leading-5 ${activeCategory === cat.key ? 'text-forge-cream/75' : 'text-forge-warm-muted'}`}>
                  {cat.description}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Category Description */}
        <ScrollReveal delay={150}>
          <p className="mb-8 text-sm font-semibold text-forge-orange">
            {currentCategory.description}
          </p>
        </ScrollReveal>

        {/* Product Grid */}
        <div
          id={`product-panel-${activeCategory}`}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-forge-warm-border border border-forge-warm-border"
          role="tabpanel"
          aria-labelledby={`product-tab-${activeCategory}`}
          aria-label={currentCategory.label}
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
    <article className="group relative bg-forge-surface overflow-hidden transition-colors duration-300 hover:bg-forge-paper">
      {/* Image container */}
      <div className="aspect-[4/3] bg-forge-warm-border/40 overflow-hidden">
        {imgError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-forge-warm-muted/60 font-display text-sm">{product.name}</p>
          </div>
        ) : (
          <WebpImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ willChange: 'transform' }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Info */}
      <div className="min-h-[154px] p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-black text-xl text-forge-warm-text group-hover:text-forge-orange transition-colors">
            {product.name}
          </h3>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-forge-warm-muted group-hover:text-forge-orange" aria-hidden="true" />
        </div>
        <p className="mt-3 text-forge-warm-muted text-sm leading-7">
          {product.description}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-forge-orange transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  );
}
