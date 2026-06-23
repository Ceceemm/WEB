import { Factory, MapPin, Phone } from 'lucide-react';
import { siteInfo } from '@/data/site';
import { InfoTile, PageHero, TextBand } from '@/pages/shared';

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="公司介绍"
        title="安丘市增涛机械有限公司"
        description={`${siteInfo.name}成立于${siteInfo.foundingYear}年，坐落于${siteInfo.address.text}，是一家集研发、生产、销售于一体的机械设备制造商。`}
      />
      <TextBand>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-forge-orange">制造属性</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-forge-warm-text md:text-4xl">
              做能进现场的机器
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-forge-warm-muted md:space-y-6 md:text-lg">
            <p>
              公司主营油脂加工机械、饲料生产专用设备、农田平地机械及农田挖掘机械，
              产品涵盖螺旋榨油机、液压榨油机、煤炭装袋机等多个系列。
            </p>
            <p>
              生产制造基地位于山东省潍坊市安丘市，便于周边客户实地看机、沟通配置，
              并围绕原料、产量、场地、电力条件和出料方式确认设备方案。
            </p>
            <p>
              设备发货前会围绕压力、输送、传动、安全部位和基础运行状态进行调试检查，
              减少到场后的安装和试机沟通成本。
            </p>
            <p>
              统一社会信用代码：
              <span className="font-mono font-semibold text-forge-warm-text">
                {siteInfo.registrationNumber}
              </span>
              。
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3">
          <InfoTile icon={Factory} title="主营业务" text="油脂加工机械、处理设备、装袋设备" />
          <InfoTile icon={MapPin} title="制造基地" text={siteInfo.address.text} />
          <InfoTile icon={Phone} title="咨询热线" text={siteInfo.phone} />
        </div>
      </TextBand>
    </>
  );
}
