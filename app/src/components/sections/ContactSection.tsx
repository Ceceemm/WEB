import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MapPin, MessageCircle, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section
      id="contact"
      data-nav-theme="warm"
      className="relative overflow-hidden bg-forge-orange py-16 md:py-28"
    >
      <div className="absolute inset-0 opacity-[0.12] factory-grid" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch md:gap-10">
          <ScrollReveal>
            <div className="flex h-full flex-col justify-between border border-forge-paper/30 bg-forge-orange p-7 md:p-10">
              <div>
                <p className="text-sm font-semibold text-forge-paper">联系我们</p>
                <h2 className="mt-3 space-y-[2mm] font-display text-4xl md:text-7xl font-black leading-none text-forge-paper md:mt-5">
                  <span className="block">需要选型</span>
                  <span className="block">先打电话</span>
                </h2>
              </div>
              <p className="mt-10 max-w-xl text-lg leading-9 text-forge-cream/80">
                告诉我们原料、产量、场地和用途，先判断适合的设备系列，再继续确认型号与配置。
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-forge-warm-text border border-forge-warm-text">
            <ContactRow icon={Phone} label="咨询热线" value="13606464864" href="tel:13606464864" />
            <ContactRow icon={MessageCircle} label="官方微信" value="AQZTJX" />
            <ContactRow icon={MapPin} label="公司地址" value="山东省潍坊市安丘市金安产业园以南" />
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-6 grid overflow-hidden border border-forge-warm-text bg-forge-paper lg:grid-cols-[1.05fr_0.95fr] md:mt-10">
            <div className="relative min-h-[320px] bg-forge-surface">
              <img
                src="/images/company-map.png"
                alt="安丘市金安产业园以南公司地址地图"
                className="h-full min-h-[320px] w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="border-t border-forge-warm-text p-7 md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold text-forge-orange">地址定位</p>
              <h3 className="mt-4 font-display text-2xl font-black leading-tight text-forge-warm-text md:text-5xl">
                山东省潍坊市安丘市
                <br />
                金安产业园以南
              </h3>
              <p className="mt-4 max-w-xl text-forge-warm-muted leading-8 md:mt-6">
                生产制造基地位于安丘市，便于周边客户实地看机、沟通配置和确认发货安排。
              </p>
              <a
                href="https://map.baidu.com/search/山东省潍坊市安丘市金安产业园以南"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-12 items-center gap-2 border border-forge-warm-text px-5 text-sm font-semibold text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange"
              >
                <MapPin size={18} aria-hidden="true" />
                打开地图搜索
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex min-h-[100px] items-center justify-between gap-4 bg-forge-paper p-5 transition-colors hover:bg-forge-surface md:min-h-[126px] md:gap-6 md:p-8">
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-forge-warm-border bg-forge-surface text-forge-orange">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm text-forge-warm-muted">{label}</p>
          <p className="mt-2 break-all font-mono text-xl font-bold text-forge-warm-text md:text-2xl">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-warm-text focus-visible:ring-offset-2 focus-visible:ring-offset-forge-orange">
      {content}
    </a>
  ) : (
    content
  );
}
