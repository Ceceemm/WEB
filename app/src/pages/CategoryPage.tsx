import { useState } from 'react';
import { Wrench } from 'lucide-react';
import { ImageLightbox } from '@/components/common/ImageLightbox';
import { WebpImage } from '@/components/common/WebpImage';
import { categoryDetails, getCategoryProducts, getProductPageDetail } from '@/data/pages';
import { productCategories } from '@/data/products';
import type { ProductCategory } from '@/data/products';
import { PageHero, TextBand } from '@/pages/shared';

export function CategoryPage({ categoryKey }: { categoryKey: ProductCategory['key'] }) {
  const detail = categoryDetails[categoryKey];
  const category = productCategories.find((item) => item.key === categoryKey);
  const categoryProducts = getCategoryProducts(categoryKey);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <PageHero
        eyebrow={category?.label ?? '产品详情'}
        title={detail.h1}
        description={detail.description}
      />
      <TextBand>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold text-forge-orange">适用场景</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
              按工况确认型号
            </h2>
            <p className="mt-6 text-base leading-8 text-forge-warm-muted">{detail.intro}</p>
          </div>
          <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border sm:grid-cols-3">
            {detail.applications.map((item) => (
              <div key={item} className="bg-forge-surface p-5">
                <Wrench size={22} className="text-forge-orange" aria-hidden="true" />
                <p className="mt-4 text-sm leading-7 text-forge-warm-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-px border border-forge-warm-border bg-forge-warm-border sm:grid-cols-2 xl:grid-cols-4">
          {categoryProducts.map((product) => {
            const productDetail = getProductPageDetail(product.id);
            const hasDetailPage = !!productDetail;

            const cardInner = (
              <>
                <div className="aspect-[4/3] bg-forge-warm-border/40">
                  <WebpImage
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    useWebp={product.hasWebp !== false}
                  />
                </div>
                <div className="min-h-[130px] p-4 md:min-h-[150px] md:p-5">
                  <h2 className="font-display text-lg font-black text-forge-warm-text transition-colors group-hover:text-forge-orange md:text-xl">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-forge-warm-muted">
                    {product.description}
                  </p>
                </div>
              </>
            );

            if (hasDetailPage) {
              return (
                <a
                  key={product.id}
                  href={productDetail.path}
                  className="group block bg-forge-surface transition-colors hover:bg-forge-paper"
                >
                  {cardInner}
                </a>
              );
            }

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setLightbox({ src: product.image, alt: product.name })}
                className="group block w-full cursor-pointer bg-forge-surface text-left transition-colors hover:bg-forge-paper"
                aria-label={`${product.name} 查看大图`}
              >
                {cardInner}
              </button>
            );
          })}
        </div>
      </TextBand>
      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          open={true}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
