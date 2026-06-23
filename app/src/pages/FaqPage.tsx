import { faqItems } from '@/data/site';
import { PageHero, TextBand } from '@/pages/shared';

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="常见问题"
        title="设备选型前先把问题说清楚"
        description="围绕选型、看机、发货、安装、售后和适用原料，把采购者最常问的问题拆成可直接摘取的问答。"
      />
      <TextBand>
        <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border">
          {faqItems.map((item) => (
            <article key={item.question} className="bg-forge-surface p-5 md:p-8">
              <h2 className="font-display text-xl font-black text-forge-warm-text md:text-2xl">
                {item.question}
              </h2>
              <p className="mt-4 text-base leading-8 text-forge-warm-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </TextBand>
    </>
  );
}
