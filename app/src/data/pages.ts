import { productCategories, products, type ProductCategory } from './products';
import { siteInfo } from './site';

export type PageKind = 'home' | 'about' | 'products' | 'category' | 'contact' | 'faq' | 'product' | 'not-found';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  kind: PageKind;
  categoryKey?: ProductCategory['key'];
  productId?: string;
  navLabel?: string;
  priority: string;
  changefreq: string;
  indexable?: boolean;
}

export interface ProductPageDetail {
  path: string;
  productId: string;
  categoryKey: ProductCategory['key'];
  title: string;
  description: string;
  h1: string;
  intro: string;
  scenarios: string[];
  selectionPoints: string[];
  faqItems: { question: string; answer: string }[];
}

export const categoryDetails: Record<
  ProductCategory['key'],
  {
    path: string;
    title: string;
    h1: string;
    description: string;
    intro: string;
    applications: string[];
    productIds: string[];
  }
> = {
  'oil-press': {
    path: '/chanpin/zhayou-shebei/index.html',
    title: '榨油设备详情 — 螺旋榨油机、液压榨油机、预榨机',
    h1: '榨油设备详情',
    description:
      '安丘增涛机械榨油设备覆盖螺旋榨油机、液压榨油机、白土榨油机、废油泥榨油机、预榨机、花生榨油机、大豆榨油机和米糠榨油机。',
    intro:
      '榨油设备面向花生、大豆、菜籽、米糠等油料压榨，也覆盖白土过滤、废油泥回收再利用和预处理压榨等工况。选型需结合原料、产量和连续生产需求判断。',
    applications: ['花生、大豆、菜籽等油料作物压榨', '白土过滤和废油泥回收处理', '预处理压榨和连续生产配套'],
    productIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
  },
  processing: {
    path: '/chanpin/chuli-shebei/index.html',
    title: '处理设备详情 — 筛选机、粉碎机、炒锅、上料机、脱壳机',
    h1: '处理设备详情',
    description:
      '安丘增涛机械处理设备覆盖筛选机、粉碎机、炒锅、上料机、脱壳机，服务原料筛选、粉碎、蒸炒、输送和脱壳工序。',
    intro:
      '处理设备服务榨油和物料加工前后工序，帮助完成筛选分级、粉碎蒸炒、自动上料输送和脱壳处理。设备配置根据原料状态、场地和工序衔接确认。',
    applications: ['原料筛选分级', '油料粉碎和蒸炒处理', '上料输送与花生、葵花籽等脱壳'],
    productIds: ['p9', 'p10', 'p11', 'p12', 'p13'],
  },
  bagging: {
    path: '/chanpin/zhuangdai-shebei/index.html',
    title: '装袋设备详情 — 煤炭装袋机、装车机',
    h1: '装袋设备详情',
    description:
      '安丘增涛机械装袋设备覆盖煤炭装袋机和装车机，用于煤炭等散装物料的定量装袋和输送装车场景。',
    intro:
      '装袋设备面向煤炭等散装物料的装袋和装车场景，具体配置需结合物料状态、袋型、产量和现场输送条件确认，重点围绕定量精度、占地空间和发货节奏做方案。',
    applications: ['煤炭定量装袋', '散装物料输送装车', '场地内装袋和发货衔接'],
    productIds: ['p14', 'p15'],
  },
};

export const productPageDetails: Record<string, ProductPageDetail> = {
  'luoxuan-zhayouji': {
    path: '/chanpin/luoxuan-zhayouji/index.html',
    productId: 'p1',
    categoryKey: 'oil-press',
    title: '螺旋榨油机 — 花生大豆菜籽连续压榨设备 | 安丘增涛机械',
    h1: '螺旋榨油机',
    description:
      '安丘增涛机械螺旋榨油机适用于花生、大豆、菜籽等油料连续压榨，选型需确认原料种类、计划产量和电力条件。电话13606464864。',
    intro:
      '螺旋榨油机采用螺旋推进压榨结构，适用于花生、大豆、菜籽、棉籽等多种常见油料作物的连续压榨加工。设备通过螺旋轴在榨膛内旋转推进物料，在压力作用下将油脂挤出，适合需要连续生产和稳定出油的中小规模油坊和加工车间。',
    scenarios: [
      '花生、大豆、菜籽等油料作物的连续压榨加工',
      '中小规模油坊和乡镇榨油加工点',
      '需要与炒锅、上料机等前后工序设备配套的连续生产线',
    ],
    selectionPoints: [
      '确认原料种类和含油特性，不同油料对榨螺结构和转速有不同要求',
      '明确计划日处理量和连续运行时长，据此匹配设备规格',
      '确认场地供电条件和出料方式，便于安排进料和饼粕输送',
    ],
    faqItems: [
      {
        question: '螺旋榨油机适合哪些原料？',
        answer: '螺旋榨油机适用于花生、大豆、菜籽、棉籽、葵花籽等多种常见油料作物，具体需根据原料含油率和硬度确认榨螺配置。',
      },
      {
        question: '连续生产需要注意哪些配套设备？',
        answer: '连续生产一般建议配置油料炒锅进行压榨前蒸炒处理，同时搭配上料机和饼粕输送装置，减少人工介入，提高效率。',
      },
    ],
  },
  'yeya-zhayouji': {
    path: '/chanpin/yeya-zhayouji/index.html',
    productId: 'p2',
    categoryKey: 'oil-press',
    title: '液压榨油机 — 压力稳定小批量压榨设备 | 安丘增涛机械',
    h1: '液压榨油机',
    description:
      '安丘增涛机械液压榨油机采用液压驱动，压力稳定可控，适合小批量油料压榨或对压力稳定性有要求的加工场景。电话13606464864。',
    intro:
      '液压榨油机通过液压系统提供稳定可控的压榨压力，适合小批量、多品种油料的压榨加工场景。相比螺旋榨油机，液压方式在压榨过程中温度控制更平缓，对芝麻、核桃等需要低温慢压的油料更为适用，也可用于实验室或小规模定制加工。',
    scenarios: [
      '小批量、多品种油料的压榨加工',
      '芝麻、核桃、油茶籽等适合低温慢压的油料',
      '实验室或小型定制化榨油场景',
    ],
    selectionPoints: [
      '根据单次压榨量和日处理批次确认设备规格',
      '确认液压系统压力和饼形尺寸是否匹配原料特性',
      '了解场地空间和液压站摆放位置，确保操作和维护通道',
    ],
    faqItems: [
      {
        question: '液压榨油机和螺旋榨油机主要区别是什么？',
        answer: '液压榨油机通过液压缸提供压力，压榨过程温度较低、压力均匀，适合小批量和低温慢压场景；螺旋榨油机通过螺旋推进连续压榨，更适合大批量连续生产。',
      },
      {
        question: '液压榨油机适合连续生产吗？',
        answer: '液压榨油机一般为批次式工作，单批压榨后需卸料装料，更适合小批量加工；如需连续大批量生产，可考虑螺旋榨油机方案。',
      },
    ],
  },
  'huasheng-zhayouji': {
    path: '/chanpin/huasheng-zhayouji/index.html',
    productId: 'p6',
    categoryKey: 'oil-press',
    title: '花生榨油机 — 花生专用压榨设备 | 安丘增涛机械',
    h1: '花生榨油机',
    description:
      '安丘增涛机械花生榨油机针对花生原料特性设计，可配套炒制、脱壳、上料等前后工序。电话13606464864，微信AQZTJX。',
    intro:
      '花生榨油机针对花生原料的含油特性和颗粒状态进行设计，通常配合炒锅进行压榨前蒸炒处理，提升出油率和油品风味。花生压榨前需经过脱壳、破碎、蒸炒等工序，设备选型时建议将前后配套一并纳入方案。',
    scenarios: [
      '花生仁压榨加工，适合乡镇榨油坊和花生主产区',
      '与花生脱壳机、炒锅、上料机组成花生榨油生产线',
      '浓香花生油的小规模或中等规模加工',
    ],
    selectionPoints: [
      '确认花生原料是带壳还是花生仁，据此决定是否需要脱壳配套',
      '明确压榨前是否进行炒制，炒制温度和时长对花生油风味影响显著',
      '根据日处理花生量选择单机规格或连续生产线配置',
    ],
    faqItems: [
      {
        question: '花生榨油机和普通螺旋榨油机能通用吗？',
        answer: '普通螺旋榨油机可以压榨花生，但花生榨油机在榨螺结构和参数上针对花生做了优化，出油率和油品更有保障。如需兼顾多种原料可选通用机型。',
      },
      {
        question: '花生压榨前需要做哪些预处理？',
        answer: '一般需要脱壳、破碎、蒸炒等工序。脱壳后花生仁经适当破碎和蒸炒再进入榨油机，可提高出油率和油品质量。',
      },
    ],
  },
  'dadou-zhayouji': {
    path: '/chanpin/dadou-zhayouji/index.html',
    productId: 'p7',
    categoryKey: 'oil-press',
    title: '大豆榨油机 — 大豆专用压榨设备 | 安丘增涛机械',
    h1: '大豆榨油机',
    description:
      '安丘增涛机械大豆榨油机针对大豆原料设计，配合粉碎、蒸炒、压榨工序衔接，适合大豆压榨加工。电话13606464864。',
    intro:
      '大豆榨油机针对大豆原料的硬度和含油特性进行适配，一般需要配合粉碎机和炒锅完成压榨前处理。大豆含油率相对较低，压榨工艺需兼顾出油效率和饼粕利用价值。',
    scenarios: [
      '大豆压榨取油加工',
      '大豆产区榨油坊和中小型油脂加工点',
      '与粉碎机、炒锅、上料机衔接的大豆压榨生产线',
    ],
    selectionPoints: [
      '确认大豆原料水分和含油情况，含水率偏高时需调整预处理流程',
      '明确是否需要粉碎和蒸炒前处理，以及蒸炒温度和时长控制',
      '根据日处理大豆量和连续运行需求匹配设备规格',
    ],
    faqItems: [
      {
        question: '大豆榨油机压榨前需要粉碎吗？',
        answer: '一般建议先粉碎再蒸炒，粉碎后的大豆更利于均匀受热和压榨出油。具体粉碎细度需根据设备参数和工艺要求确认。',
      },
      {
        question: '大豆压榨后的饼粕有什么用途？',
        answer: '大豆饼粕蛋白质含量较高，可用于饲料原料。具体利用方式建议根据当地养殖需求和饲料加工渠道判断。',
      },
    ],
  },
  'mikang-zhayouji': {
    path: '/chanpin/mikang-zhayouji/index.html',
    productId: 'p8',
    categoryKey: 'oil-press',
    title: '米糠榨油机 — 米糠专用连续压榨设备 | 安丘增涛机械',
    h1: '米糠榨油机',
    description:
      '安丘增涛机械米糠榨油机针对米糠原料特性设计，配合预处理和连续生产配套，适合米糠榨油加工。电话13606464864。',
    intro:
      '米糠榨油机针对米糠原料含油率中等、流动性差、易酸败等特点进行设计。米糠在压榨前通常需要经过膨化或蒸炒等稳定化处理，以钝化脂肪酶活性、改善压榨性能，设备选型需将预处理和连续生产配套一并考虑。',
    scenarios: [
      '稻米加工副产物米糠的榨油利用',
      '碾米厂配套米糠榨油生产线',
      '需要连续生产的米糠油加工场景',
    ],
    selectionPoints: [
      '确认米糠来源和新鲜度，新鲜米糠需尽快处理以避免酸败',
      '明确是否需要膨化或蒸炒前处理，稳定化处理直接影响出油率和油品',
      '根据日处理米糠量和连续运行需求确认设备配套方案',
    ],
    faqItems: [
      {
        question: '米糠榨油为什么要做稳定化处理？',
        answer: '米糠中含有活性脂肪酶，碾米后若不及时处理，脂肪酶会快速分解油脂导致酸败。通过膨化或蒸炒稳定化处理可钝化酶活性，保障出油率和油品质量。',
      },
      {
        question: '米糠榨油机能处理其他油料吗？',
        answer: '米糠榨油机主要针对米糠特性设计，也可处理其他类似特性的油料，但建议先沟通原料情况和工艺要求再确认是否适用。',
      },
    ],
  },
  'yuzhaji': {
    path: '/chanpin/yuzhaji/index.html',
    productId: 'p5',
    categoryKey: 'oil-press',
    title: '预榨机 — 油料预处理压榨设备 | 安丘增涛机械',
    h1: '预榨机',
    description:
      '安丘增涛机械预榨机用于油料预处理压榨，与后续浸出或二次压榨工序衔接，提高连续加工效率。电话13606464864。',
    intro:
      '预榨机用于油料进入浸出或二次压榨之前的预处理压榨环节，先将高含油油料中的部分油脂预榨取出，降低饼粕残油，为后续浸出或深度压榨创造更好的工艺条件。预榨机通常用于规模化油脂加工线中的前段工序。',
    scenarios: [
      '高含油油料的预榨处理，如花生、菜籽、葵花籽等',
      '规模化油脂加工线中与浸出车间衔接',
      '需要降低后续压榨或浸出负荷的预处理场景',
    ],
    selectionPoints: [
      '确认进入预榨机的原料含油率和预处理状态',
      '明确预榨后的饼粕去向，是直接出售还是进入浸出/二次压榨',
      '根据整线处理能力和前后工序产能匹配设备规格',
    ],
    faqItems: [
      {
        question: '预榨机和普通榨油机有什么区别？',
        answer: '预榨机主要完成油料的初步压榨，将部分油脂取出，饼粕再进入浸出或二次压榨；普通榨油机一般力求一次压榨达到较高出油率。预榨机通常用于规模化的连续加工线。',
      },
      {
        question: '什么情况下需要配置预榨机？',
        answer: '当原料含油率较高、且后续有浸出或二次压榨工序时，预榨机可以先提取一部分油脂，降低后续工序负荷，提高整体加工效率和出油率。',
      },
    ],
  },
  'baitu-zhayouji': {
    path: '/chanpin/baitu-zhayouji/index.html',
    productId: 'p3',
    categoryKey: 'oil-press',
    title: '白土榨油机 — 白土过滤油脂处理设备 | 安丘增涛机械',
    h1: '白土榨油机',
    description:
      '安丘增涛机械白土榨油机用于白土过滤和油脂处理环节，适用于油脂加工中的白土回收再利用场景。电话13606464864。',
    intro:
      '白土榨油机用于油脂加工过程中白土过滤环节的处理，将吸附油脂后的废白土进行压榨，回收其中的油脂。设备适用于油脂精炼车间中白土脱色工序的后续处理，帮助减少油脂损耗。',
    scenarios: [
      '油脂精炼车间白土脱色后的废白土处理',
      '白土中残留油脂的压榨回收',
      '油脂加工企业减少白土环节油脂损耗的配套设备',
    ],
    selectionPoints: [
      '确认每日废白土产生量和含油率，据此匹配设备处理能力',
      '了解白土来源和油脂种类，不同类型油脂对压榨参数有不同要求',
      '确认回收油脂的后续用途和场地空间条件',
    ],
    faqItems: [
      {
        question: '白土榨油机能处理哪些类型的白土？',
        answer: '主要用于油脂精炼中活性白土脱色工序产生的废白土，适用于大豆油、花生油、菜籽油等多种油脂加工场景。具体适用性建议沟通原料和工艺后确认。',
      },
      {
        question: '白土压榨回收的油脂可以直接使用吗？',
        answer: '回收的油脂一般需经过后续处理再决定用途。具体处理流程和用途建议根据油脂品质和企业工艺要求判断。',
      },
    ],
  },
  'feiyouni-zhayouji': {
    path: '/chanpin/feiyouni-zhayouji/index.html',
    productId: 'p4',
    categoryKey: 'oil-press',
    title: '废油泥榨油机 — 废油泥回收处理设备 | 安丘增涛机械',
    h1: '废油泥榨油机',
    description:
      '安丘增涛机械废油泥榨油机用于废油泥的压榨回收处理，适用于油脂加工中油泥回收再利用场景。电话13606464864。',
    intro:
      '废油泥榨油机用于油脂加工过程中产生的油泥、油渣等物料的压榨处理，通过机械压榨方式将其中残留油脂分离出来。设备适用于油脂加工企业在生产过程中对油泥进行减量化和资源化处理的需求。',
    scenarios: [
      '油脂加工过程中产生的油泥、油渣压榨处理',
      '油脂车间油泥减量化和油脂回收',
      '需要减少油泥排放、提高油脂利用率的加工场景',
    ],
    selectionPoints: [
      '确认油泥来源、含油率和含水率，不同来源油泥的压榨特性差异较大',
      '明确每日油泥产生量和处理频次，匹配设备规格',
      '了解场地排水和物料输送条件，便于规划进料和出料方式',
    ],
    faqItems: [
      {
        question: '废油泥榨油机能处理哪些类型的油泥？',
        answer: '可处理油脂加工中沉淀、离心等环节产生的油泥和油渣。不同类型油泥的含油率和含水率不同，处理效果会有差异，建议沟通具体原料情况后判断适用性。',
      },
      {
        question: '油泥压榨处理后油脂和残渣怎么利用？',
        answer: '压榨分离出的油脂可根据品质决定后续用途，残渣需按当地环保要求妥善处置。具体利用和处置方式建议咨询当地相关部门。',
      },
    ],
  },
  'youliao-chaoguo': {
    path: '/chanpin/youliao-chaoguo/index.html',
    productId: 'p11',
    categoryKey: 'processing',
    title: '油料炒锅 — 蒸炒处理提升压榨稳定性 | 安丘增涛机械',
    h1: '油料炒锅',
    description:
      '安丘增涛机械油料炒锅用于花生、大豆、菜籽等油料的压榨前蒸炒处理，提升出油率和压榨稳定性。电话13606464864。',
    intro:
      '油料炒锅用于榨油前对油料进行蒸炒处理，通过加热和翻炒使油料达到合适的入榨温度和水分，有助于提升出油率、改善油品风味，并降低榨油机磨损。炒锅通常与螺旋榨油机、上料机等组成连续生产线。',
    scenarios: [
      '花生、大豆、菜籽、棉籽等油料的压榨前蒸炒',
      '与螺旋榨油机、上料机配套的连续榨油生产线',
      '浓香型油脂加工中需要控制炒制温度和时间的热处理环节',
    ],
    selectionPoints: [
      '根据配套榨油机的处理量确认炒锅规格和批次处理能力',
      '确认加热方式（电加热或燃煤/燃气等）和场地条件',
      '了解油料种类和入榨温度要求，不同油料对炒制参数有不同需求',
    ],
    faqItems: [
      {
        question: '油料炒锅和普通炒锅有什么区别？',
        answer: '油料炒锅针对榨油工艺设计，需要精确控制加热温度和翻炒均匀度，确保油料达到适合压榨的状态，与普通烹饪炒锅在结构和用途上完全不同。',
      },
      {
        question: '炒锅可以和哪些榨油机配套？',
        answer: '油料炒锅主要与螺旋榨油机配套使用，也可配合液压榨油机的预处理环节。具体配套方案需根据榨油机型号和处理量确认。',
      },
    ],
  },
  'meitan-zhuangdaiji': {
    path: '/chanpin/meitan-zhuangdaiji/index.html',
    productId: 'p14',
    categoryKey: 'bagging',
    title: '煤炭装袋机 — 煤炭定量装袋设备 | 安丘增涛机械',
    h1: '煤炭装袋机',
    description:
      '安丘增涛机械煤炭装袋机用于煤炭等散装物料的定量装袋，选型需确认物料状态、袋型、产量和现场输送条件。电话13606464864。',
    intro:
      '煤炭装袋机用于煤炭等散装物料的定量称重和装袋作业，适用于煤矿、洗煤厂、煤场、型煤加工点等场景。设备通过称量机构控制单袋重量，配合夹袋和输送装置完成装袋封口流程，可根据物料粒度、湿度、袋型和产量要求做配置调整。',
    scenarios: [
      '煤矿、洗煤厂和煤场的煤炭定量装袋',
      '型煤、煤粉等不同粒度煤炭产品的包装',
      '需要与输送皮带、封口机等衔接的装袋流水线',
    ],
    selectionPoints: [
      '确认煤炭粒度、湿度等物料状态，不同状态对给料和称量方式有不同要求',
      '明确袋型和单袋重量规格，据此配置称量范围和夹袋机构',
      '评估产量需求和现场输送条件，确认设备产能和上下游衔接方式',
    ],
    faqItems: [
      {
        question: '煤炭装袋机能处理湿煤吗？',
        answer: '煤炭湿度对给料流畅性和称量精度有影响，湿煤容易粘连，需要在给料机构和料仓设计上做针对性处理。建议沟通实际煤炭状态后确认方案。',
      },
      {
        question: '煤炭装袋机可以用于其他物料吗？',
        answer: '煤炭装袋机的给料和称量机构主要针对煤炭特性设计，如需要用于其他散装物料，建议先沟通物料特性，判断是否在现有设备范围内做调整。',
      },
    ],
  },
  'shuanxuan-ji': {
    path: '/chanpin/shuanxuan-ji/index.html',
    productId: 'p9',
    categoryKey: 'processing',
    title: '筛选机 — 油料原料筛选分级设备 | 安丘增涛机械',
    h1: '筛选机',
    description:
      '安丘增涛机械筛选机用于油料和物料原料的筛选分级，去除杂质、分离不合格颗粒，为后续工序提供合格原料。电话13606464864。',
    intro:
      '筛选机用于油料作物和散装物料的筛选分级作业，通过振动筛网或旋转筛筒将原料按粒径分级，同时去除石块、茎秆、碎屑等杂质。设备是榨油生产线和物料加工前道工序的重要配套，帮助保障后续压榨、粉碎等工序的原料品质和设备安全。',
    scenarios: [
      '花生、大豆、菜籽等油料作物的筛选除杂',
      '榨油生产线前道原料预处理，保障入榨原料品质',
      '散装物料按粒径分级，分离不合格颗粒',
    ],
    selectionPoints: [
      '确认原料种类、粒径分布和含杂率，据此选择筛网规格和层数',
      '明确日处理量和筛选精度要求，匹配设备规格和振动参数',
      '了解场地空间和上下游衔接，便于规划进料和出料方式',
    ],
    faqItems: [
      {
        question: '筛选机在榨油生产线中起什么作用？',
        answer: '筛选机位于榨油前道工序，负责去除油料中的石块、茎秆、金属等杂质，防止杂质损坏榨油机和影响油品质量，是保障连续生产稳定性的重要配套。',
      },
      {
        question: '筛选机可以处理多种油料吗？',
        answer: '筛选机可通过更换筛网规格适配不同粒径的油料，如花生、大豆、菜籽等。建议沟通实际原料种类和筛选要求后确认筛网配置。',
      },
    ],
  },
  'fensui-ji': {
    path: '/chanpin/fensui-ji/index.html',
    productId: 'p10',
    categoryKey: 'processing',
    title: '粉碎机 — 油料原料粉碎加工设备 | 安丘增涛机械',
    h1: '粉碎机',
    description:
      '安丘增涛机械粉碎机用于油料和物料原料的粉碎加工，为压榨、蒸炒等后续工序提供合适粒度的原料。电话13606464864。',
    intro:
      '粉碎机用于油料作物和散装物料的粉碎加工，通过锤片、齿板或刀片等粉碎部件将原料破碎至合适粒度。粉碎后的油料表面积增大，有利于后续蒸炒受热均匀和压榨出油，是榨油生产线中重要的前道处理设备。',
    scenarios: [
      '大豆、花生饼等油料的压榨前粉碎处理',
      '配合炒锅、榨油机组成连续榨油生产线',
      '饲料原料和散装物料的粉碎加工',
    ],
    selectionPoints: [
      '确认原料种类、硬度和含水率，不同原料对粉碎部件和转速有不同要求',
      '明确粉碎细度和日处理量，据此匹配设备规格和筛网孔径',
      '了解场地供电条件和除尘需求，便于规划配套设备',
    ],
    faqItems: [
      {
        question: '粉碎细度可以调节吗？',
        answer: '粉碎细度主要通过更换筛网孔径调节，孔径越小粉碎越细但产量降低。建议根据后续工序要求（如蒸炒、压榨）确认合适的粉碎细度。',
      },
      {
        question: '粉碎机能处理哪些原料？',
        answer: '可粉碎大豆、花生饼、菜籽饼等多种油料及饲料原料。不同硬度原料需匹配不同粉碎部件，建议沟通实际原料情况后确认适用性。',
      },
    ],
  },
  'shangliao-ji': {
    path: '/chanpin/shangliao-ji/index.html',
    productId: 'p12',
    categoryKey: 'processing',
    title: '上料机 — 自动化上料输送设备 | 安丘增涛机械',
    h1: '上料机',
    description:
      '安丘增涛机械上料机用于榨油生产线和物料加工中的自动化上料输送，减少人工介入，提高连续生产效率。电话13606464864。',
    intro:
      '上料机用于榨油生产线和物料加工过程中的自动上料和输送作业，通过斗式提升、螺旋输送或皮带输送等方式将原料从料仓或地面输送到炒锅、榨油机等加工设备。设备可减少人工投料劳动强度，保障连续生产的供料稳定性。',
    scenarios: [
      '榨油生产线中从料仓到炒锅、榨油机的自动上料',
      '配合筛选机、粉碎机等前道设备的物料输送',
      '需要减少人工投料、提高连续生产效率的加工场景',
    ],
    selectionPoints: [
      '确认原料种类、堆积密度和流动性，据此选择输送方式和提升高度',
      '明确日处理量和上料频次，匹配设备规格和输送速度',
      '了解场地空间布局和上下游设备高度差，便于规划输送路径',
    ],
    faqItems: [
      {
        question: '上料机有哪些输送方式？',
        answer: '常见的有斗式提升、螺旋输送和皮带输送等方式。斗式提升适合垂直提升，螺旋输送适合短距离水平输送，皮带输送适合较长距离输送。具体选择需结合物料特性和场地布局。',
      },
      {
        question: '上料机能和哪些设备配套？',
        answer: '上料机主要与炒锅、榨油机、粉碎机、筛选机等配套使用，组成连续生产线。配套方案需根据整线工艺流程和各设备产能匹配确认。',
      },
    ],
  },
  'tuoke-ji': {
    path: '/chanpin/tuoke-ji/index.html',
    productId: 'p13',
    categoryKey: 'processing',
    title: '脱壳机 — 花生葵花籽脱壳处理设备 | 安丘增涛机械',
    h1: '脱壳机',
    description:
      '安丘增涛机械脱壳机用于花生、葵花籽等油料的脱壳处理，分离壳仁，为后续压榨提供干净原料。电话13606464864。',
    intro:
      '脱壳机用于花生、葵花籽等带壳油料的脱壳处理，通过揉搓、打击或挤压等方式将外壳与果仁分离，再经风选或筛分实现壳仁分离。脱壳后的果仁进入榨油机压榨，可提高出油率、降低饼粕残油，同时避免外壳磨损榨油机部件。',
    scenarios: [
      '花生、葵花籽等带壳油料的压榨前脱壳处理',
      '配合筛选机、榨油机组成花生或葵花籽榨油生产线',
      '需要分离壳仁、提高压榨效率的油料加工场景',
    ],
    selectionPoints: [
      '确认原料种类和外壳特性，不同油料对脱壳部件和参数有不同要求',
      '明确脱壳率和仁中含壳率指标，据此匹配设备规格和风选配置',
      '了解日处理量和场地空间，便于规划壳仁分离和物料输送',
    ],
    faqItems: [
      {
        question: '脱壳机的脱壳率能达到多少？',
        answer: '脱壳率受原料品种、含水率和设备参数影响，一般情况下花生脱壳率可达较高水平。具体指标建议沟通原料情况后确认，并通过调整参数优化。',
      },
      {
        question: '脱壳后的壳和仁怎么分离？',
        answer: '脱壳后通常通过风选或比重筛分将壳和仁分离，较轻的壳被气流带走，较重的仁留下。分离效果与风选参数和原料状态有关，建议根据实际原料调整。',
      },
    ],
  },
  'zhuangche-ji': {
    path: '/chanpin/zhuangche-ji/index.html',
    productId: 'p15',
    categoryKey: 'bagging',
    title: '装车机 — 散装物料输送装车设备 | 安丘增涛机械',
    h1: '装车机',
    description:
      '安丘增涛机械装车机用于煤炭等散装物料的输送装车，选型需确认物料类型、装车高度和产量需求。电话13606464864。',
    intro:
      '装车机用于煤炭等散装物料的输送装车作业，通过皮带输送或溜槽等方式将物料从料堆或装袋机出料口输送到运输车厢。设备适用于煤场、型煤加工点、散装物料周转场等场景，可配合装袋机组成装袋装车流水线，也可单独用于散装装车。',
    scenarios: [
      '煤场、型煤加工点的散装煤炭装车',
      '与煤炭装袋机配套的装袋装车流水线',
      '散装物料的场地内输送和装车作业',
    ],
    selectionPoints: [
      '确认物料类型、粒度和含水率，不同物料对输送方式和溜槽角度有不同要求',
      '明确装车高度和车厢尺寸，据此配置输送长度和提升角度',
      '评估产量需求和装车频次，匹配设备规格和输送速度',
    ],
    faqItems: [
      {
        question: '装车机可以和煤炭装袋机配套吗？',
        answer: '可以。装车机可与煤炭装袋机配套组成装袋装车流水线，装袋后的煤炭经装车机输送装车，减少人工搬运。配套方案需根据产量和场地布局确认。',
      },
      {
        question: '装车机能处理哪些物料？',
        answer: '装车机主要针对煤炭等散装物料设计，也可用于粒度相近的其他散装物料。如需处理特殊物料，建议先沟通物料特性后判断适用性。',
      },
    ],
  },
};

export const pageRoutes: PageMeta[] = [
  {
    path: '/',
    title: '安丘市增涛机械有限公司 — 油脂加工 · 饲料生产 · 农田装备',
    description:
      '安丘市增涛机械有限公司成立于2012年，位于山东潍坊安丘，主营螺旋榨油机、液压榨油机、饲料机械、煤炭装袋机等设备。电话13606464864。',
    h1: siteInfo.name,
    kind: 'home',
    navLabel: '首页',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/gongsi/index.html',
    title: '公司介绍 — 安丘市增涛机械有限公司',
    description:
      '了解安丘市增涛机械有限公司的成立时间、制造属性、主营油脂加工机械与处理设备、山东潍坊安丘生产地址和联系方式。',
    h1: '公司介绍',
    kind: 'about',
    navLabel: '公司介绍',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/chanpin/index.html',
    title: '产品分类 — 榨油设备、处理设备、装袋设备',
    description:
      '安丘增涛机械产品分类包括榨油设备、处理设备和装袋设备，覆盖压榨、筛选、粉碎、炒制、上料、脱壳和煤炭装袋全流程。',
    h1: '产品分类',
    kind: 'products',
    navLabel: '产品分类',
    priority: '0.9',
    changefreq: 'weekly',
  },
  ...productCategories.map<PageMeta>((category) => ({
    path: categoryDetails[category.key].path,
    title: categoryDetails[category.key].title,
    description: categoryDetails[category.key].description,
    h1: categoryDetails[category.key].h1,
    kind: 'category',
    categoryKey: category.key,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  // 产品详情页
  ...Object.values(productPageDetails).map<PageMeta>((detail) => ({
    path: detail.path,
    title: detail.title,
    description: detail.description,
    h1: detail.h1,
    kind: 'product' as const,
    categoryKey: detail.categoryKey,
    productId: detail.productId,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  {
    path: '/lianxi/index.html',
    title: '联系方式 — 电话、微信、地址',
    description:
      '安丘市增涛机械有限公司联系方式：咨询热线13606464864，官方微信AQZTJX，地址山东省潍坊市安丘市金安产业园以南。',
    h1: '联系方式',
    kind: 'contact',
    navLabel: '联系方式',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/wenti/index.html',
    title: '常见问题 — 设备选型、看机、发货、售后',
    description:
      '安丘增涛机械常见问题，说明榨油设备选型、到厂看机、设备发货调试、煤炭装袋场景、售后配件和适用原料。',
    h1: '常见问题',
    kind: 'faq',
    navLabel: '常见问题',
    priority: '0.7',
    changefreq: 'monthly',
  },
];

export const navPages = pageRoutes.filter((page) => page.navLabel);

export const notFoundPage: PageMeta = {
  path: '/404.html',
  title: '页面未找到 — 安丘增涛机械',
  description: '您访问的页面不存在或已变更，请返回首页或查看产品分类。',
  h1: '页面未找到',
  kind: 'not-found',
  priority: '0',
  changefreq: 'never',
  indexable: false,
};

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  const cleanPath = pathname.split(/[?#]/)[0] ?? '/';
  if (cleanPath === '/404.html') return cleanPath;
  if (cleanPath.endsWith('/index.html')) return cleanPath;
  if (cleanPath.endsWith('/')) return `${cleanPath}index.html`;
  return `${cleanPath}/index.html`;
}

export function getPageByPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return pageRoutes.find((page) => page.path === normalized) ?? notFoundPage;
}

export function getCategoryProducts(categoryKey: ProductCategory['key']) {
  const productIds = new Set(categoryDetails[categoryKey].productIds);

  return products.filter((product) => productIds.has(product.id));
}

export function getProductPageDetail(productId: string): ProductPageDetail | undefined {
  return Object.values(productPageDetails).find((detail) => detail.productId === productId);
}

export function getProductPageDetailByPath(path: string): ProductPageDetail | undefined {
  const normalized = normalizePath(path);
  return Object.values(productPageDetails).find((detail) => detail.path === normalized);
}
