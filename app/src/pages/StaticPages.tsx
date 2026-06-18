import { WebpImage } from '@/components/common/WebpImage';
import { categoryDetails, getCategoryProducts } from '@/data/pages';
import { productCategories } from '@/data/products';
import { faqItems, siteInfo } from '@/data/site';
import type { ProductCategory } from '@/data/products';
import { ArrowRight, Factory, MapPin, MessageCircle, Phone, Wrench } from 'lucide-react';

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
      className="relative overflow-hidden bg-forge-warm-text pb-16 pt-28 text-forge-paper md:pb-24 md:pt-36"
    >
      <div className="absolute inset-0 opacity-[0.08] factory-grid" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-10">
        <p className="text-sm font-semibold text-forge-orange">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-display text-5xl font-black leading-tight md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-forge-cream/78 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

function TextBand({ children }: { children: React.ReactNode }) {
  return (
    <section data-nav-theme="light" className="bg-forge-paper py-16 md:py-24">
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
            <h2 className="mt-4 font-display text-4xl font-black leading-tight text-forge-warm-text">
              做能进现场的机器
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-forge-warm-muted md:text-lg">
            <p>
              公司主营油脂加工机械、饲料生产专用设备、农田平地机械及农田挖掘机械，
              产品涵盖螺旋榨油机、液压榨油机、煤炭装袋机等多个系列。
            </p>
            <p>
              生产制造基地位于山东省潍坊市安丘市，便于周边客户实地看机、沟通配置，
              并围绕原料、产量、场地、电力条件和出料方式确认设备方案。
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
        <div className="mt-12 grid gap-4 md:grid-cols-3">
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
    <div className="border border-forge-warm-border bg-forge-surface p-6">
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
            <h2 className="mt-4 font-display text-4xl font-black leading-tight text-forge-warm-text">
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
          {categoryProducts.map((product) => (
            <article key={product.id} className="bg-forge-surface">
              <div className="aspect-[4/3] bg-forge-warm-border/40">
                <WebpImage
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  useWebp={product.hasWebp !== false}
                />
              </div>
              <div className="min-h-[150px] p-5">
                <h2 className="font-display text-xl font-black text-forge-warm-text">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-forge-warm-muted">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
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
            <h2 className="font-display text-3xl font-black text-forge-warm-text">
              服务地区
            </h2>
            <p className="mt-5 text-base leading-8 text-forge-warm-muted">
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
    <div className="bg-forge-surface p-6">
      <Icon size={24} className="text-forge-orange" aria-hidden="true" />
      <h2 className="mt-5 text-sm text-forge-warm-muted">{title}</h2>
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
            <article key={item.question} className="bg-forge-surface p-6 md:p-8">
              <h2 className="font-display text-2xl font-black text-forge-warm-text">
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
