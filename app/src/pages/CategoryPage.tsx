import { Wrench } from 'lucide-react';
import { WebpImage } from '@/components/common/WebpImage';
import { categoryDetails, getCategoryProducts, getProductPageDetail } from '@/data/pages';
import { productCategories } from '@/data/products';
import type { ProductCategory } from '@/data/products';
import { PageHero, TextBand } from '@/pages/shared';

export function CategoryPage({ categoryKey }: { categoryKey: ProductCategory['key'] }) {
  const detail = categoryDetails[categoryKey];
  const category = productCategories.find((item) => item.key === categoryKey);
  const categoryProducts = getCategoryProducts(categoryKey);

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
            const CardWrapper = hasDetailPage ? 'a' : 'div';
            const cardProps = hasDetailPage ? { href: productDetail.path } : {};

            return (
              <CardWrapper key={product.id} {...cardProps} className={hasDetailPage ? 'bg-forge-surface block group transition-colors hover:bg-forge-paper' : 'bg-forge-surface'}>
                <div className="aspect-[4/3] bg-forge-warm-border/40">
                  <WebpImage
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    useWebp={product.hasWebp !== false}
                  />
                </div>
                <div className="min-h-[130px] p-4 md:min-h-[150px] md:p-5">
                  <h2 className={`font-display text-lg font-black md:text-xl ${hasDetailPage ? 'text-forge-warm-text group-hover:text-forge-orange transition-colors' : 'text-forge-warm-text'}`}>
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-forge-warm-muted">
                    {product.description}
                  </p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </TextBand>
    </>
  );
}
