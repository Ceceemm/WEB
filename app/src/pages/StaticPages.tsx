import { WebpImage } from '@/components/common/WebpImage';
import { categoryDetails, getCategoryProducts, getProductPageDetail, getProductPageDetailByPath } from '@/data/pages';
import { productCategories, products } from '@/data/products';
import { faqItems, siteInfo } from '@/data/site';
import type { ProductCategory } from '@/data/products';
import { ArrowRight, Factory, MapPin, MessageCircle, Phone, Wrench, ChevronRight } from 'lucide-react';

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-forge-warm-text pb-12 pt-24 text-forge-paper md:pb-24 md:pt-36"
    >
      <div className="absolute inset-0 opacity-[0.08] factory-grid" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-10">
        <p className="text-sm font-semibold text-forge-orange">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-3xl font-black leading-tight md:mt-5 md:text-7xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-forge-cream/78 md:mt-6 md:text-lg md:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}

function TextBand({ children }: { children: React.ReactNode }) {
  return (
    <section data-nav-theme="light" className="bg-forge-paper py-12 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">{children}</div>
    </section>
  );
}

function LinkCard({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="group block border border-forge-warm-border bg-forge-surface p-6 transition-colors hover:border-forge-orange hover:bg-forge-paper"
    >
      <div className="flex items-start justify-between gap-5">
        <h2 className="font-display text-2xl font-black text-forge-warm-text group-hover:text-forge-orange">
          {title}
        </h2>
        <ArrowRight className="mt-1 shrink-0 text-forge-orange" size={20} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-7 text-forge-warm-muted">{text}</p>
    </a>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="公司介绍"
        title="安丘市增涛机械有限公司"
        description={`${siteInfo.name}成立于${siteInfo.foundingYear}年，坐落于${siteInfo.address.text}，是一家集研发、生产、销售于一体的机械设备制造商。`}
      />
      <TextBand>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-forge-orange">制造属性</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
              做能进现场的机器
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-forge-warm-muted md:space-y-6 md:text-lg">
            <p>
              公司主营油脂加工机械、饲料生产专用设备、农田平地机械及农田挖掘机械，
              产品涵盖螺旋榨油机、液压榨油机、煤炭装袋机等多个系列。
            </p>
            <p>
              生产制造基地位于山东省潍坊市安丘市，便于周边客户实地看机、沟通配置，
              并围绕原料、产量、场地、电力条件和出料方式确认设备方案。
            </p>
            <p>
              设备发货前会围绕压力、输送、传动、安全部位和基础运行状态进行调试检查，
              减少到场后的安装和试机沟通成本。
            </p>
            <p>
              统一社会信用代码：
              <span className="font-mono font-semibold text-forge-warm-text">
                {siteInfo.registrationNumber}
              </span>
              。
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3">
          <InfoTile icon={Factory} title="主营业务" text="油脂加工机械、处理设备、装袋设备" />
          <InfoTile icon={MapPin} title="制造基地" text={siteInfo.address.text} />
          <InfoTile icon={Phone} title="咨询热线" text={siteInfo.phone} />
        </div>
      </TextBand>
    </>
  );
}

function InfoTile({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Factory;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-forge-warm-border bg-forge-surface p-5 md:p-6">
      <Icon size={24} className="text-forge-orange" aria-hidden="true" />
      <h2 className="mt-5 font-display text-2xl font-black text-forge-warm-text">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-forge-warm-muted">{text}</p>
    </div>
  );
}

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
            const detail = getProductPageDetail(product.id);
            const hasDetailPage = !!detail;
            const CardWrapper = hasDetailPage ? 'a' : 'div';
            const cardProps = hasDetailPage ? { href: detail.path } : {};

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

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="联系方式"
        title="需要选型，先打电话"
        description="告诉我们原料、产量、场地和用途，先判断适合的设备系列，再继续确认型号与配置。"
      />
      <TextBand>
        <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border lg:grid-cols-3">
          <ContactTile icon={Phone} title="咨询热线" value={siteInfo.phone} href={`tel:${siteInfo.phone}`} />
          <ContactTile icon={MessageCircle} title="官方微信" value={siteInfo.wechat} />
          <ContactTile icon={MapPin} title="公司地址" value={siteInfo.address.text} />
        </div>
        <div className="mt-10 grid overflow-hidden border border-forge-warm-border bg-forge-surface lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src="/images/company-map.png"
            alt="安丘市金安产业园以南公司地址地图"
            className="h-full min-h-[320px] w-full object-cover"
            loading="lazy"
          />
          <div className="p-7 md:p-10">
            <h2 className="font-display text-2xl font-black text-forge-warm-text md:text-3xl">
              服务地区
            </h2>
            <p className="mt-4 text-base leading-8 text-forge-warm-muted md:mt-5">
              当前重点服务地区包括{siteInfo.serviceAreas.join('、')}。外地客户也可以先通过电话或微信沟通原料、产量、场地和发货安排。
            </p>
            <a
              href={`https://map.baidu.com/search/${siteInfo.address.text}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 border border-forge-warm-text px-5 text-sm font-semibold text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange"
            >
              <MapPin size={18} aria-hidden="true" />
              打开地图搜索
            </a>
          </div>
        </div>
      </TextBand>
    </>
  );
}

function ContactTile({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="bg-forge-surface p-5 md:p-6">
      <Icon size={24} className="text-forge-orange" aria-hidden="true" />
      <h2 className="mt-4 text-sm text-forge-warm-muted md:mt-5">{title}</h2>
      <p className="mt-2 break-all font-mono text-xl font-bold text-forge-warm-text">{value}</p>
    </div>
  );

  return href ? <a href={href}>{body}</a> : body;
}

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="常见问题"
        title="设备选型前先把问题说清楚"
        description="围绕选型、看机、发货、安装、售后和适用原料，把采购者最常问的问题拆成可直接摘取的问答。"
      />
      <TextBand>
        <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border">
          {faqItems.map((item) => (
            <article key={item.question} className="bg-forge-surface p-5 md:p-8">
              <h2 className="font-display text-xl font-black text-forge-warm-text md:text-2xl">
                {item.question}
              </h2>
              <p className="mt-4 text-base leading-8 text-forge-warm-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </TextBand>
    </>
  );
}

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
