import { productCategories } from '@/data/products';
import { categoryDetails } from '@/data/pages';
import { LinkCard, PageHero, TextBand } from '@/pages/shared';

export function ProductsOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="产品分类"
        title="榨油设备、处理设备、装袋设备"
        description="从压榨、筛选、粉碎、炒制到煤炭装袋，按现场工序拆分产品页面，便于采购者直接找到对应设备。"
      />
      <TextBand>
        <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border md:grid-cols-3">
          {productCategories.map((category) => (
            <LinkCard
              key={category.id}
              href={categoryDetails[category.key].path}
              title={category.label}
              text={`${category.description}。${categoryDetails[category.key].intro}`}
            />
          ))}
        </div>
      </TextBand>
    </>
  );
}
