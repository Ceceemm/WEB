import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SectionNumber } from '@/components/common/SectionNumber';
import { Cog, Package, Clock, MapPin } from 'lucide-react';

const advantages = [
  {
    icon: Cog,
    title: '自主生产能力',
    description: '从设计到制造全流程自主把控，确保每一台设备的品质与可靠性。',
  },
  {
    icon: Package,
    title: '多品类覆盖',
    description: '涵盖榨油设备、饲料机械、装袋设备三大系列，满足多样化需求。',
  },
  {
    icon: Clock,
    title: '十年制造经验',
    description: '自2012年成立以来，持续深耕机械设备制造，积累了丰富的行业经验。',
  },
  {
    icon: MapPin,
    title: '山东制造基地',
    description: '位于中国机械制造重镇潍坊，依托完善的供应链与产业配套优势。',
  },
];

export function AdvantagesSection() {
  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-forge-paper py-16 md:py-32"
    >
      <SectionNumber number="05" className="-top-8 -left-8 text-forge-warm-text/5" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] md:mb-12">
          <ScrollReveal>
            <h2 className="font-display font-black text-3xl md:text-6xl text-forge-warm-text">
              为什么选择我们
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="max-w-2xl text-forge-warm-muted leading-8">
              采购机械设备更看重稳定、匹配和后续沟通。优势不做空泛口号，直接对应客户会问的四件事。
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-px border border-forge-warm-border bg-forge-warm-border sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="group relative min-h-[200px] bg-forge-surface p-6 transition-colors duration-300 hover:bg-forge-warm-text md:min-h-[250px] md:p-7">
                <div className="flex h-full flex-col justify-between gap-10">
                  <div className="flex h-12 w-12 items-center justify-center border border-forge-warm-border group-hover:border-forge-orange">
                    <item.icon
                      size={22}
                      className="text-forge-orange transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-forge-warm-text mb-3 group-hover:text-forge-paper">
                      {item.title}
                    </h3>
                    <p className="text-forge-warm-muted text-sm leading-7 group-hover:text-forge-cream/75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
