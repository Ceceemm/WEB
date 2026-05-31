import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SectionNumber } from '@/components/common/SectionNumber';

const FOUNDING_YEAR = 2012;
const yearsSinceFounding = new Date().getFullYear() - FOUNDING_YEAR;

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden bg-forge-paper">
      <SectionNumber number="02" className="-top-2 -right-8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <ScrollReveal direction="right">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forge-warm-text mb-8">
              关于增涛
            </h2>

            <div className="space-y-5 text-forge-warm-muted leading-relaxed text-base md:text-lg font-body">
              <p>
                安丘市增涛机械有限公司成立于
                <span className="text-forge-orange font-mono font-semibold"> 2012 </span>
                年，坐落于
                <span className="text-forge-warm-text font-semibold">山东省潍坊市安丘市金安产业园以南</span>，
                是一家集研发、生产、销售于一体的专业机械设备制造商。
              </p>
              <p>
                公司主营油脂加工机械、饲料生产专用设备、农田平地机械及农田挖掘机械，
                产品涵盖螺旋榨油机、液压榨油机、煤炭装袋机等多个系列，广泛应用于油脂加工、
                饲料生产、煤炭装运等领域。
              </p>
              <p>
                依托潍坊作为中国机械制造业重要基地的产业优势，公司始终坚持自主生产、
                严控品质，致力于为客户提供可靠、高效的机械设备解决方案。
              </p>
            </div>

            <hr className="divider-forge my-8" />

            <div className="flex flex-wrap gap-6 text-forge-warm-muted text-sm font-mono">
              <span>注册号：91370784MA3C52AM0W</span>
            </div>
          </ScrollReveal>

          {/* Right: Data Cards */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative space-y-6">
              {/* 注册资本 Card */}
              <div className="relative bg-forge-dark border border-forge-light/40 p-8 rounded-sm overflow-hidden group hover:border-forge-orange/60 transition-all duration-500">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-forge-gold" />
                <p className="text-forge-gray text-sm font-mono uppercase tracking-wider mb-3">注册资本</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-bold text-5xl text-forge-cream">200</span>
                  <span className="text-forge-gray text-lg font-body">万元</span>
                </div>
              </div>

              {/* 成立年份 Card */}
              <div className="relative bg-forge-dark border border-forge-light/40 p-8 rounded-sm overflow-hidden group hover:border-forge-orange/60 transition-all duration-500">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-forge-gold" />
                <p className="text-forge-gray text-sm font-mono uppercase tracking-wider mb-3">成立至今</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-bold text-5xl text-forge-cream">
                    {yearsSinceFounding}
                  </span>
                  <span className="text-forge-gray text-lg font-body">年</span>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-forge-orange/20" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
