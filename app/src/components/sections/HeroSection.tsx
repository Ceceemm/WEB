import { WebpImage } from '@/components/common/WebpImage';
import { ArrowDown, Phone, Ruler, Settings2 } from 'lucide-react';

const heroStats = [
  { value: '2012', label: '成立年份' },
  { value: '200万', label: '注册资本' },
  { value: '3大类', label: '核心设备系列' },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-forge-paper pt-24 md:pt-28 factory-grid"
    >
      <div className="absolute right-0 top-0 h-full w-[44%] bg-forge-warm-text hidden lg:block" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10 pb-10">
        <div className="grid min-h-[calc(100vh-7rem)] lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-stretch">
          <div className="flex flex-col justify-between py-8 lg:py-14">
            <div>
              <p
                className="inline-flex items-center gap-3 border border-forge-warm-border bg-forge-surface px-4 py-2 text-xs font-semibold tracking-[0.18em] text-forge-warm-muted animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards' }}
              >
                <span className="h-2 w-2 bg-forge-orange" />
                山东潍坊 · 机械设备制造
              </p>

              <h1
                className="mt-8 space-y-[2mm] font-display text-[clamp(3.2rem,8.8vw,9rem)] font-black leading-none tracking-normal text-forge-warm-text animate-slide-up stagger-2 opacity-0"
                style={{ animationFillMode: 'forwards' }}
              >
                <span className="block">安丘增涛</span>
                <span className="block">机械有限公司</span>
              </h1>

              <p
                className="mt-7 max-w-[54ch] text-lg md:text-xl leading-9 text-forge-warm-muted animate-slide-up stagger-3 opacity-0"
                style={{ animationFillMode: 'forwards' }}
              >
                面向油脂加工、饲料生产、农田装备与煤炭装袋场景，提供从单机到配套产线的机械设备。
              </p>

              <div
                className="mt-9 flex flex-wrap gap-3 animate-slide-up stagger-4 opacity-0"
                style={{ animationFillMode: 'forwards' }}
              >
                <a
                  href="#products"
                  className="inline-flex h-12 items-center gap-2 bg-forge-warm-text px-6 text-sm font-semibold text-forge-paper transition-colors hover:bg-forge-orange"
                >
                  查看产品
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:13606464864"
                    className="inline-flex h-12 items-center justify-center gap-2 border border-forge-warm-text px-6 text-sm font-semibold text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange"
                  >
                    <Phone size={17} aria-hidden="true" />
                    电话咨询
                  </a>
                  <a
                    href="tel:13606464864"
                    aria-label="拨打咨询电话 13606464864"
                    className="inline-flex min-h-8 items-center justify-center border border-forge-warm-border bg-forge-surface px-3 font-mono text-sm font-bold tracking-[0.08em] text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-orange focus-visible:ring-offset-2 focus-visible:ring-offset-forge-paper"
                  >
                    13606464864
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 border-y border-forge-warm-border">
              {heroStats.map((item) => (
                <div key={item.label} className="py-5 pr-4">
                  <p className="font-mono text-2xl font-bold text-forge-warm-text">{item.value}</p>
                  <p className="mt-1 text-xs text-forge-warm-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[460px] lg:min-h-full lg:py-8">
            <div className="relative h-full min-h-[460px] overflow-hidden border border-forge-warm-text bg-forge-dark shadow-[18px_18px_0_hsl(18_76%_48%)]">
              <WebpImage
                src="/images/products/hero-main.jpg"
                alt="增涛机械榨油设备实拍"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover contrast-110 saturate-[0.88]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-forge-warm-text/88 p-5 text-forge-paper md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-forge-cream/70">FEATURED MACHINE</p>
                    <p className="mt-2 font-display text-2xl font-black">螺旋榨油机系列</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-forge-cream/35">
                      <Settings2 size={18} aria-hidden="true" />
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-forge-cream/35">
                      <Ruler size={18} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
