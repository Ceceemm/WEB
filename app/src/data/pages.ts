import { productCategories, products, type ProductCategory } from './products';
import { siteInfo } from './site';

export type PageKind = 'home' | 'about' | 'products' | 'category' | 'contact' | 'faq';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  kind: PageKind;
  categoryKey?: ProductCategory['key'];
  navLabel?: string;
  priority: string;
  changefreq: string;
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

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  const cleanPath = pathname.split(/[?#]/)[0] ?? '/';
  if (cleanPath.endsWith('/index.html')) return cleanPath;
  if (cleanPath.endsWith('/')) return `${cleanPath}index.html`;
  return `${cleanPath}/index.html`;
}

export function getPageByPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return pageRoutes.find((page) => page.path === normalized) ?? pageRoutes[0];
}

export function getCategoryProducts(categoryKey: ProductCategory['key']) {
  const productIds = new Set(categoryDetails[categoryKey].productIds);

  return products.filter((product) => productIds.has(product.id));
}
