import { ScrollReveal } from '@/components/common/ScrollReveal';
import { CheckCircle2, ClipboardCheck, Hammer, Truck } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: '确认工况',
    text: '根据原料、产量、场地、电力条件和出料方式，先把现场需求说清楚。',
  },
  {
    icon: Hammer,
    title: '生产装配',
    text: '核心结构按设备用途加工装配，重点检查压力、输送、传动与安全部位。',
  },
  {
    icon: CheckCircle2,
    title: '出厂调试',
    text: '设备发出前完成基础调试，降低到场后的安装和试机沟通成本。',
  },
  {
    icon: Truck,
    title: '交付支持',
    text: '围绕安装、使用、维护和后续配件问题，提供持续沟通支持。',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-forge-warm-text py-24 text-forge-paper md:py-32">
      <div className="absolute inset-0 opacity-[0.08] factory-grid" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <ScrollReveal direction="right">
            <div>
              <p className="text-sm font-semibold text-forge-orange">制造流程</p>
              <h2 className="mt-4 space-y-[2mm] font-display text-4xl md:text-6xl font-black leading-none">
                <span className="block">从需求到出厂</span>
                <span className="block">一步一步落地</span>
              </h2>
              <p className="mt-6 max-w-[30rem] text-forge-cream/75 leading-8">
                企业官网不只展示产品，也要让采购者知道如何开始沟通。这里把咨询路径前置，减少无效往返。
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-forge-cream/18 border border-forge-cream/18 sm:grid-cols-2">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 80}>
                <div className="min-h-[250px] bg-forge-warm-text p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <step.icon size={28} className="text-forge-orange" aria-hidden="true" />
                    <span className="font-mono text-sm text-forge-cream/45">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-black">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-forge-cream/72">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
