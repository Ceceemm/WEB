import { useState } from 'react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { ImageLightbox } from '@/components/common/ImageLightbox';
import { WebpImage } from '@/components/common/WebpImage';
import { products } from '@/data/products';
import { Search } from 'lucide-react';

export function GallerySection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // All products, featured first
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);
  const displayProducts = [...featured, ...rest];

  return (
    <section id="gallery" className="relative py-32 md:py-48 overflow-hidden bg-forge-paper">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forge-warm-text mb-12">
            设备实拍
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-forge-warm-muted font-mono text-sm tracking-wider mb-16">
            点击图片查看大图
          </p>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {displayProducts.map((product, index) => {
            const isFeatured = product.featured && index === 0;
            return (
              <ScrollReveal key={product.id} delay={index * 60}>
                <button
                  type="button"
                  className="break-inside-avoid group relative block w-full cursor-pointer overflow-hidden rounded-sm border border-forge-warm-border/50 text-left transition-all duration-500 hover:border-forge-orange/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-orange focus-visible:ring-offset-2 focus-visible:ring-offset-forge-paper"
                  onClick={() =>
                    setLightbox({ src: product.image, alt: product.name })
                  }
                  aria-label={`查看${product.name}大图`}
                >
                  {/* Product image */}
                  <div
                    className={`relative bg-forge-warm-border/30 overflow-hidden ${
                      isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <WebpImage
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ willChange: 'transform' }}
                    />
                    {/* Warm overlay - lifts on hover */}
                    <div className="absolute inset-0 bg-forge-warm-text/15 group-hover:bg-forge-warm-text/5 transition-all duration-500" />
                    {/* Forge glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-forge-inner" />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forge-warm-text/70 to-transparent">
                    <p className="text-forge-surface font-display font-bold text-sm group-hover:text-forge-orange transition-colors">
                      {product.name}
                    </p>
                  </div>

                  {/* Magnifier icon on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-forge-warm-text/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 border border-forge-warm-border">
                    <Search size={14} className="text-forge-surface" aria-hidden="true" />
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        src={lightbox?.src ?? ''}
        alt={lightbox?.alt ?? ''}
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
