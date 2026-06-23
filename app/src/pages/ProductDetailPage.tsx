import { ArrowRight, ChevronRight, MessageCircle, Phone, Wrench } from 'lucide-react';
import { WebpImage } from '@/components/common/WebpImage';
import { categoryDetails, getProductPageDetailByPath } from '@/data/pages';
import { productCategories, products } from '@/data/products';
import { siteInfo } from '@/data/site';
import { PageHero, TextBand } from '@/pages/shared';

export function ProductDetailPage({ path }: { path: string }) {
  const detail = getProductPageDetailByPath(path);

  if (!detail) {
    return (
      <>
        <PageHero
          eyebrow="产品详情"
          title="页面未找到"
          description="该产品详情页暂未上线，请通过产品分类浏览或致电 13606464864 咨询。"
        />
      </>
    );
  }

  const product = products.find((p) => p.id === detail.productId);
  const categoryDetail = categoryDetails[detail.categoryKey];
  const category = productCategories.find((c) => c.key === detail.categoryKey);

  return (
    <>
      <PageHero
        eyebrow={category?.label ?? '产品详情'}
        title={detail.h1}
        description={detail.description}
      />

      {/* 面包屑导航 */}
      <div data-nav-theme="light" className="bg-forge-paper border-b border-forge-warm-border">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10 py-4">
          <nav className="flex items-center gap-2 text-sm text-forge-warm-muted">
            <a href="/" className="hover:text-forge-orange transition-colors">首页</a>
            <ChevronRight size={14} aria-hidden="true" />
            <a href="/chanpin/index.html" className="hover:text-forge-orange transition-colors">产品分类</a>
            <ChevronRight size={14} aria-hidden="true" />
            <a href={categoryDetail.path} className="hover:text-forge-orange transition-colors">{category?.label}</a>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-forge-warm-text font-semibold">{detail.h1}</span>
          </nav>
        </div>
      </div>

      {/* 产品主图 + 简介 */}
      <TextBand>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden border border-forge-warm-border bg-forge-surface">
            {product && (
              <WebpImage
                src={product.image}
                alt={detail.h1}
                className="h-full min-h-[320px] w-full object-cover"
                useWebp={product.hasWebp !== false}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-forge-orange">产品介绍</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
              {detail.h1}
            </h2>
            <p className="mt-6 text-base leading-8 text-forge-warm-muted">{detail.intro}</p>
          </div>
        </div>
      </TextBand>

      {/* 适用场景 */}
      <section data-nav-theme="light" className="bg-forge-surface py-12 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="text-sm font-semibold text-forge-orange">适用场景</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
            按工况确认方案
          </h2>
          <div className="mt-8 grid gap-px border border-forge-warm-border bg-forge-warm-border sm:grid-cols-3">
            {detail.scenarios.map((item) => (
              <div key={item} className="bg-forge-paper p-5 md:p-6">
                <Wrench size={22} className="text-forge-orange" aria-hidden="true" />
                <p className="mt-4 text-sm leading-7 text-forge-warm-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 选型要点 */}
      <TextBand>
        <p className="text-sm font-semibold text-forge-orange">选型要点</p>
        <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
          确认参数再下单
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {detail.selectionPoints.map((point, i) => (
            <div key={i} className="border border-forge-warm-border bg-forge-surface p-5 md:p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forge-orange/10 text-sm font-bold text-forge-orange">
                {i + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-forge-warm-muted">{point}</p>
            </div>
          ))}
        </div>
      </TextBand>

      {/* 常见问题 */}
      <section data-nav-theme="light" className="bg-forge-surface py-12 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="text-sm font-semibold text-forge-orange">常见问题</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
            选型前先看这里
          </h2>
          <div className="mt-8 grid gap-px border border-forge-warm-border bg-forge-warm-border">
            {detail.faqItems.map((item) => (
              <article key={item.question} className="bg-forge-paper p-5 md:p-8">
                <h3 className="font-display text-lg font-black text-forge-warm-text md:text-xl">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-forge-warm-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 联系方式 CTA */}
      <TextBand>
        <div className="text-center">
          <p className="text-sm font-semibold text-forge-orange">需要选型？</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
            告诉我们原料和产量
          </h2>
          <p className="mt-4 text-base leading-8 text-forge-warm-muted">
            把原料种类、计划产量、场地条件和电力情况说清楚，先判断适合的设备系列，
            再确认具体配置。
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`tel:${siteInfo.phone}`}
              className="inline-flex h-12 items-center gap-2 bg-forge-orange px-6 text-sm font-semibold text-forge-paper transition-colors hover:bg-forge-orange/90"
            >
              <Phone size={18} aria-hidden="true" />
              致电咨询 {siteInfo.phone}
            </a>
            <span className="inline-flex h-12 items-center gap-2 border border-forge-warm-border px-6 text-sm font-semibold text-forge-warm-text">
              <MessageCircle size={18} className="text-forge-orange" aria-hidden="true" />
              微信 {siteInfo.wechat}
            </span>
          </div>
          <div className="mt-8">
            <a
              href={categoryDetail.path}
              className="inline-flex items-center gap-2 text-sm text-forge-warm-muted hover:text-forge-orange transition-colors"
            >
              <ArrowRight size={14} aria-hidden="true" />
              返回{category?.label ?? '所属分类'}
            </a>
          </div>
        </div>
      </TextBand>
    </>
  );
}
