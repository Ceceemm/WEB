import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteInfo } from '@/data/site';
import { ContactTile, PageHero, TextBand } from '@/pages/shared';

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="联系方式"
        title="需要选型，先打电话"
        description="告诉我们原料、产量、场地和用途，先判断适合的设备系列，再继续确认型号与配置。"
      />
      <TextBand>
        <div className="grid gap-px border border-forge-warm-border bg-forge-warm-border lg:grid-cols-3">
          <ContactTile icon={Phone} title="咨询热线" value={siteInfo.phone} href={`tel:${siteInfo.phone}`} />
          <ContactTile icon={MessageCircle} title="官方微信" value={siteInfo.wechat} />
          <ContactTile icon={MapPin} title="公司地址" value={siteInfo.address.text} />
        </div>
        <div className="mt-10 grid overflow-hidden border border-forge-warm-border bg-forge-surface lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src="/images/company-map.png"
            alt="安丘市金安产业园以南公司地址地图"
            className="h-full min-h-[320px] w-full object-cover"
            loading="lazy"
          />
          <div className="p-7 md:p-10">
            <h2 className="font-display text-2xl font-black text-forge-warm-text md:text-3xl">
              服务地区
            </h2>
            <p className="mt-4 text-base leading-8 text-forge-warm-muted md:mt-5">
              当前重点服务地区包括{siteInfo.serviceAreas.join('、')}。外地客户也可以先通过电话或微信沟通原料、产量、场地和发货安排。
            </p>
            <a
              href={`https://map.baidu.com/search/${siteInfo.address.text}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 border border-forge-warm-text px-5 text-sm font-semibold text-forge-warm-text transition-colors hover:border-forge-orange hover:text-forge-orange"
            >
              <MapPin size={18} aria-hidden="true" />
              打开地图搜索
            </a>
          </div>
        </div>
      </TextBand>
    </>
  );
}
