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
    <section className="relative pt-32 md:pt-48 pb-6 md:pb-8 overflow-hidden bg-forge-black">
      <SectionNumber number="03" className="-top-8 -left-8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forge-cream mb-16">
            为什么选择我们
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {advantages.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="group relative bg-forge-dark border border-forge-light/20 p-8 rounded-sm transition-all duration-500 hover:border-forge-orange/30">
                {/* Heat line on top edge */}
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-forge-orange/0 to-transparent group-hover:via-forge-orange/60 transition-all duration-500" />

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-forge-mid rounded-sm flex items-center justify-center group-hover:bg-forge-orange/20 transition-colors">
                    <item.icon
                      size={22}
                      className="text-forge-gray group-hover:text-forge-orange transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-forge-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-forge-gray text-sm leading-relaxed font-body">
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
