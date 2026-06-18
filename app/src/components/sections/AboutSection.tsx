import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Factory, MapPinned, ShieldCheck } from 'lucide-react';

const FOUNDING_YEAR = 2012;
const yearsSinceFounding = new Date().getFullYear() - FOUNDING_YEAR;

export function AboutSection() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="relative overflow-hidden bg-forge-surface py-24 md:py-32"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <ScrollReveal direction="right">
            <div className="sticky top-28">
              <p className="text-sm font-semibold text-forge-orange">公司概况</p>
              <h2 className="mt-5 max-w-[10ch] font-display text-4xl md:text-6xl font-black leading-tight text-forge-warm-text">
                做能进现场的机器
              </h2>
              <div className="spec-rule mt-8 w-full max-w-sm" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="max-w-3xl space-y-6 text-forge-warm-muted leading-9 text-base md:text-lg">
              <p>
                安丘市增涛机械有限公司成立于
                <span className="text-forge-orange font-mono font-bold"> 2012 </span>
                年，坐落于
                <span className="text-forge-warm-text font-semibold"> 山东省潍坊市安丘市金安产业园以南</span>，
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

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <Fact icon={Factory} label="制造属性" value="研发 / 生产 / 销售" />
              <Fact icon={ShieldCheck} label="注册资本" value="200万元" />
              <Fact icon={MapPinned} label="成立至今" value={`${yearsSinceFounding}年`} />
            </div>

            <div className="mt-8 border border-forge-warm-border bg-forge-paper p-5 text-sm text-forge-warm-muted">
              注册号：<span className="font-mono text-forge-warm-text">91370784MA3C52AM0W</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Factory;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-forge-warm-border bg-forge-surface p-5">
      <Icon size={22} className="text-forge-orange" aria-hidden="true" />
      <p className="mt-5 text-xs text-forge-warm-muted">{label}</p>
      <p className="mt-2 font-semibold text-forge-warm-text">{value}</p>
    </div>
  );
}
