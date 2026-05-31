import { SectionNumber } from '@/components/common/SectionNumber';
import { DiagonalLine } from '@/components/common/DiagonalLine';
import { WebpImage } from '@/components/common/WebpImage';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-forge-black"
    >
      {/* Background image with forge glow overlay */}
      <div className="absolute inset-0 z-0">
        <WebpImage
          src="/images/products/hero-main.jpg"
          alt=""
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-25 saturate-[0.75] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forge-black/60 via-forge-black/40 to-forge-black" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-forge-orange/20 to-transparent" />
      </div>

      {/* Decorative elements */}
      <DiagonalLine from="tr" to="bl" opacity={0.05} />
      <SectionNumber number="01" className="-bottom-8 -left-8" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Product image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] bg-forge-dark rounded-sm border border-forge-light/30 overflow-hidden animate-forge-glow">
              <WebpImage
                src="/images/products/hero-main.jpg"
                alt="增涛机械新型全自动压榨机实拍"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-forge-black/35 via-transparent to-forge-orange/10" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-forge-orange/20 rounded-sm -z-10" />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-8 py-32 lg:py-0">
            <p
              className="text-forge-orange font-mono text-sm tracking-[0.3em] uppercase animate-slide-up stagger-1 opacity-0"
              style={{ animationFillMode: 'forwards' }}
            >
              EST. 2012 &middot; 山东潍坊
            </p>

            <h1
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-forge-cream whitespace-nowrap animate-slide-up stagger-2 opacity-0"
              style={{ animationFillMode: 'forwards' }}
            >
              安丘增涛机械
            </h1>

            <p
              className="text-lg md:text-xl text-forge-gray tracking-[0.15em] font-body animate-slide-up stagger-3 opacity-0"
              style={{ animationFillMode: 'forwards' }}
            >
              油脂加工 &middot; 饲料生产 &middot; 农田装备
            </p>

            <div
              className="flex flex-wrap gap-4 animate-slide-up stagger-4 opacity-0"
              style={{ animationFillMode: 'forwards' }}
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-forge-orange text-forge-white font-body font-medium rounded-sm hover:bg-forge-orange/90 transition-all hover:shadow-forge active:scale-[0.98]"
              >
                查看产品
                <span className="text-lg" aria-hidden="true">&darr;</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 border border-forge-cream/30 text-forge-cream font-body font-medium rounded-sm hover:border-forge-orange hover:text-forge-orange hover:shadow-forge transition-all"
              >
                联系我们
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
