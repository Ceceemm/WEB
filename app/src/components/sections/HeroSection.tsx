import { WebpImage } from '@/components/common/WebpImage';
import { ArrowDown, Phone, Ruler, Settings2 } from 'lucide-react';
import { siteInfo } from '@/data/site';

export function HeroSection() {
  return (
    <section
      id="hero"
      data-nav-theme="light"
      className="relative overflow-hidden bg-forge-paper pt-24 md:min-h-screen md:pt-28 factory-grid"
    >
      <div className="absolute right-0 top-0 h-full w-[44%] bg-forge-warm-text hidden lg:block" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10 pb-6 md:pb-10">
        <div className="grid lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-14 items-stretch">
          <div className="flex flex-col justify-between py-6 lg:py-14">
            <div>
              <p className="inline-flex items-center gap-3 border border-forge-warm-border bg-forge-surface px-4 py-2 text-xs font-semibold tracking-[0.18em] text-forge-warm-muted">
                <span className="h-2 w-2 bg-forge-orange" />
                山东潍坊 · 机械设备制造
              </p>

              <h1 className="mt-6 space-y-[2mm] font-display text-[clamp(2.6rem,10vw,9rem)] font-black leading-none tracking-normal text-forge-warm-text sm:mt-8 sm:text-[clamp(3.2rem,8.8vw,9rem)]">
                <span className="block">安丘增涛</span>
                <span className="block">机械有限公司</span>
              </h1>

              <p className="mt-5 max-w-[54ch] text-base leading-8 text-forge-warm-muted sm:mt-7 sm:text-lg md:text-xl md:leading-9">
                面向油脂加工、饲料生产、农田装备与煤炭装袋场景，提供从单机到配套产线的机械设备。
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  href="#products"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-forge-warm-text px-6 text-sm font-semibold text-forge-paper transition-colors hover:bg-forge-orange sm:w-auto"
                >
                  查看产品
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 border border-forge-warm-text px-6 text-sm font-semibold text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange sm:w-auto"
                >
                  <Phone size={17} aria-hidden="true" />
                  致电咨询 {siteInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-full lg:py-8">
            <div className="relative h-full min-h-[260px] overflow-hidden border border-forge-warm-text bg-forge-dark shadow-[8px_8px_0_hsl(18_76%_48%)] sm:min-h-[460px] sm:shadow-[18px_18px_0_hsl(18_76%_48%)]">
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
                    <p className="text-xs tracking-[0.2em] text-forge-cream/70">设备实拍</p>
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
