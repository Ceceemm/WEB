import type { ReactNode } from 'react';
import { ArrowRight, Factory, Phone } from 'lucide-react';

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-forge-warm-text pb-12 pt-24 text-forge-paper md:pb-24 md:pt-36"
    >
      <div className="absolute inset-0 opacity-[0.08] factory-grid" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-10">
        <p className="text-sm font-semibold text-forge-orange">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-3xl font-black leading-tight md:mt-5 md:text-7xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-forge-cream/78 md:mt-6 md:text-lg md:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}

export function TextBand({ children }: { children: ReactNode }) {
  return (
    <section data-nav-theme="light" className="bg-forge-paper py-12 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">{children}</div>
    </section>
  );
}

export function LinkCard({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="group block border border-forge-warm-border bg-forge-surface p-6 transition-colors hover:border-forge-orange hover:bg-forge-paper"
    >
      <div className="flex items-start justify-between gap-5">
        <h2 className="font-display text-2xl font-black text-forge-warm-text group-hover:text-forge-orange">
          {title}
        </h2>
        <ArrowRight className="mt-1 shrink-0 text-forge-orange" size={20} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-7 text-forge-warm-muted">{text}</p>
    </a>
  );
}

export function InfoTile({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Factory;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-forge-warm-border bg-forge-surface p-5 md:p-6">
      <Icon size={24} className="text-forge-orange" aria-hidden="true" />
      <h2 className="mt-5 font-display text-2xl font-black text-forge-warm-text">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-forge-warm-muted">{text}</p>
    </div>
  );
}

export function ContactTile({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="bg-forge-surface p-5 md:p-6">
      <Icon size={24} className="text-forge-orange" aria-hidden="true" />
      <h2 className="mt-4 text-sm text-forge-warm-muted md:mt-5">{title}</h2>
      <p className="mt-2 break-all font-mono text-xl font-bold text-forge-warm-text">{value}</p>
    </div>
  );

  return href ? <a href={href}>{body}</a> : body;
}
