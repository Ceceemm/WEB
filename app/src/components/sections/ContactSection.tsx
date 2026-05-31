import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative pt-6 md:pt-8 pb-32 md:pb-48 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(30 5% 24%) 0%, hsl(30 6% 12%) 70%)',
      }}
    >
      {/* Abstract gear/ conveyor line decoration */}
      <svg
        className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-[0.04]"
        width="100%"
        height="200"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="60" width="400" height="2" rx="1" fill="currentColor" className="text-forge-cream" />
        <circle cx="420" cy="61" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-forge-cream" />
        <rect x="440" y="60" width="400" height="2" rx="1" fill="currentColor" className="text-forge-cream" />
        <circle cx="860" cy="61" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-forge-cream" />
        <rect x="890" y="60" width="400" height="2" rx="1" fill="currentColor" className="text-forge-cream" />
        <circle cx="1310" cy="61" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-forge-cream" />

        <circle cx="200" cy="160" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forge-cream" />
        <circle cx="500" cy="170" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forge-cream" />
        <circle cx="850" cy="160" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forge-cream" />
        <circle cx="1150" cy="175" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forge-cream" />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forge-cream mb-16">
            联系我们
          </h2>
        </ScrollReveal>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ScrollReveal direction="right" delay={100}>
            <div className="flex flex-col items-center h-full bg-forge-dark border border-forge-light/20 p-8 rounded-sm hover:border-forge-orange/40 transition-all duration-500">
              <Phone size={28} className="text-forge-orange mb-4" />
              <p className="text-forge-gray font-mono text-xs tracking-[0.2em] uppercase mb-3">
                咨询热线
              </p>
              <p className="font-mono font-bold text-2xl md:text-3xl text-forge-cream tracking-wide">
                13606464864
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-col items-center h-full bg-forge-dark border border-forge-light/20 p-8 rounded-sm hover:border-forge-orange/40 transition-all duration-500">
              {/* WeChat icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-forge-orange mb-4" aria-hidden="true">
                <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="currentColor"/>
                <path d="M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z" fill="currentColor"/>
                <path d="M21 13.5C21 17.5 17.5 21 12 21C10.9 21 9.8 20.8 8.8 20.4L5 21L5.5 17.5C4.5 16.3 4 14.9 4 13.5C4 9.5 7.5 6 12 6C16.5 6 21 9.5 21 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M17 16.5L19 17L18.7 14.8C19.2 14.1 19.5 13.3 19.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              </svg>
              <p className="text-forge-gray font-mono text-xs tracking-[0.2em] uppercase mb-3">
                官方微信
              </p>
              <p className="font-mono font-bold text-2xl md:text-3xl text-forge-cream tracking-wide">
                {`AQZTJX`}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={300}>
            <div className="flex flex-col items-center h-full bg-forge-dark border border-forge-light/20 p-8 rounded-sm hover:border-forge-orange/40 transition-all duration-500">
              <MapPin size={28} className="text-forge-orange mb-4" />
              <p className="text-forge-gray font-mono text-xs tracking-[0.2em] uppercase mb-3">
                公司地址
              </p>
              <p className="font-body text-lg text-forge-cream leading-relaxed">
                山东省潍坊市安丘市
                <br />
                金安产业园以南
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA Button */}
        <ScrollReveal delay={400}>
          <a
            href="tel:13606464864"
            className="inline-flex items-center gap-3 px-10 py-4 bg-forge-orange text-forge-white font-body font-semibold text-lg rounded-sm hover:bg-forge-orange-glow hover:shadow-forge-lg transition-all duration-300 animate-heat-pulse"
          >
            <Phone size={20} />
            致电咨询
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
