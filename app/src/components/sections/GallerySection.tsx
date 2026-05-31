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
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden bg-forge-surface">
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <ScrollReveal>
            <div>
              <p className="text-sm font-semibold text-forge-orange">设备实拍</p>
              <h2 className="mt-4 font-display font-black text-4xl md:text-6xl text-forge-warm-text">
                真实机器，比渲染图更有用
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="max-w-sm text-sm leading-7 text-forge-warm-muted">
              点击图片查看大图，重点观察结构、比例、出料口、输送位置和现场占地。
            </p>
          </ScrollReveal>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {displayProducts.map((product, index) => {
            const isFeatured = product.featured && index === 0;
            return (
              <ScrollReveal key={product.id} delay={index * 60}>
                <button
                  type="button"
                  className="break-inside-avoid group relative block w-full cursor-pointer overflow-hidden border border-forge-warm-border bg-forge-paper text-left transition-all duration-500 hover:border-forge-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-orange focus-visible:ring-offset-2 focus-visible:ring-offset-forge-surface"
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
                    <div className="absolute inset-0 bg-forge-warm-text/10 group-hover:bg-transparent transition-all duration-500" />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-forge-warm-text/82">
                    <p className="text-forge-paper font-display font-bold text-sm group-hover:text-forge-orange transition-colors">
                      {product.name}
                    </p>
                  </div>

                  {/* Magnifier icon on hover */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-forge-paper flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 border border-forge-warm-border">
                    <Search size={15} className="text-forge-warm-text" aria-hidden="true" />
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
