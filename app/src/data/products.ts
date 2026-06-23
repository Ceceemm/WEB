export interface Product {
  id: string;
  name: string;
  category: 'oil-press' | 'processing' | 'bagging';
  description: string;
  image: string;
  hasWebp?: boolean;
  featured?: boolean;
}

export interface ProductCategory {
  id: string;
  label: string;
  key: 'oil-press' | 'processing' | 'bagging';
  description: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 'oil-press',
    label: '榨油设备',
    key: 'oil-press',
    description: '螺旋榨油机 · 液压榨油机 · 白土榨油机 · 废油泥榨油机 · 预榨机',
  },
  {
    id: 'processing',
    label: '处理设备',
    key: 'processing',
    description: '筛选机 · 粉碎机 · 炒锅 · 上料机 · 脱壳机',
  },
  {
    id: 'bagging',
    label: '装袋设备',
    key: 'bagging',
    description: '煤炭装袋机 · 装车机',
  },
];

export const products: Product[] = [
  // 榨油设备系列
  { id: 'p1', name: '螺旋榨油机', category: 'oil-press', description: '适用于花生、大豆、菜籽等多种油料作物的压榨', image: '/images/products/product-01.jpg', featured: true },
  { id: 'p2', name: '液压榨油机', category: 'oil-press', description: '液压驱动，压力稳定，出油率高', image: '/images/products/hydraulic-press-1.jpg' },
  { id: 'p3', name: '白土榨油机', category: 'oil-press', description: '白土过滤专用榨油设备', image: '/images/products/clay-press.jpg' },
  { id: 'p4', name: '废油泥榨油机', category: 'oil-press', description: '废油泥回收再利用专用设备', image: '/images/products/waste-sludge-press.jpg' },
  { id: 'p5', name: '预榨机', category: 'oil-press', description: '预处理压榨，提高后续出油效率', image: '/images/products/pre-press.jpg' },
  { id: 'p6', name: '花生榨油机', category: 'oil-press', description: '花生专用榨油设备', image: '/images/products/peanut-press.jpg', featured: true },
  { id: 'p7', name: '大豆榨油机', category: 'oil-press', description: '大豆专用榨油设备', image: '/images/products/soybean-press.jpg' },
  { id: 'p8', name: '米糠榨油机', category: 'oil-press', description: '米糠专用榨油设备', image: '/images/products/ricebran-press.jpg' },

  // 处理设备系列
  { id: 'p9', name: '筛选机', category: 'processing', description: '原料筛选分级设备', image: '/images/products/product-09.jpg', featured: true },
  { id: 'p10', name: '粉碎机', category: 'processing', description: '原料粉碎加工设备', image: '/images/products/product-18.jpg' },
  { id: 'p11', name: '炒锅', category: 'processing', description: '油料蒸炒设备，提升出油率', image: '/images/products/product-11-cooker-new.jpg', hasWebp: false, featured: true },
  { id: 'p12', name: '上料机', category: 'processing', description: '自动化上料输送设备', image: '/images/products/product-23.jpg' },
  { id: 'p13', name: '脱壳机', category: 'processing', description: '花生、葵花籽等脱壳处理设备', image: '/images/products/product-13.jpg' },

  // 装袋设备系列
  { id: 'p14', name: '煤炭装袋机', category: 'bagging', description: '煤炭定量装袋设备', image: '/images/products/product-15.jpg', featured: true },
  { id: 'p15', name: '装车机', category: 'bagging', description: '物料装车输送设备', image: '/images/products/product-15.jpg', featured: true },

  // 额外产品图片
  { id: 'p16', name: '榨油机整机', category: 'oil-press', description: '成品榨油机整机展示', image: '/images/products/product-16-whole-press-new.jpg', hasWebp: false },
  { id: 'p18', name: '设备零部件', category: 'processing', description: '精密加工零部件', image: '/images/products/product-10.jpg' },
  { id: 'p19', name: '设备组装', category: 'oil-press', description: '生产车间设备组装场景', image: '/images/products/product-19.jpg' },
  { id: 'p20', name: '成品设备', category: 'oil-press', description: '待发货成品设备', image: '/images/products/product-20.jpg' },
  { id: 'p21', name: '生产车间', category: 'processing', description: '生产制造车间实景', image: '/images/products/product-21.jpg' },
  { id: 'p22', name: '榨油机细节', category: 'oil-press', description: '榨油机关键部位细节', image: '/images/products/product-22.jpg' },
  { id: 'p23', name: '设备调试', category: 'processing', description: '设备出厂前调试检测', image: '/images/products/product-23-debug-new.jpg', hasWebp: false },
  { id: 'p24', name: '装袋设备展示', category: 'bagging', description: '装袋设备全方位展示', image: '/images/products/product-24.jpg' },
  { id: 'p25', name: '榨油设备展示', category: 'oil-press', description: '榨油设备多角度展示', image: '/images/products/product-25-oil-display-upscaled.jpg', hasWebp: false },
  { id: 'p26', name: '机械产品展示', category: 'oil-press', description: '公司产品综合展示', image: '/images/products/product-26.jpg' },

  // 补充产品图片 (clipboard)
  { id: 'p27', name: '榨油设备展示02', category: 'oil-press', description: '榨油设备多种型号展示', image: '/images/products/product-27.jpg', featured: true },
  { id: 'p28', name: '煤炭装袋设备', category: 'bagging', description: '煤炭装袋设备工作场景', image: '/images/products/product-29.jpg' },
  { id: 'p29', name: '生产现场实拍', category: 'processing', description: '设备生产车间实拍', image: '/images/products/product-29-production-site-new.jpg', hasWebp: false },
  { id: 'p30', name: '设备出厂实拍', category: 'oil-press', description: '设备出厂前实拍展示', image: '/images/products/product-30.jpg' },
  { id: 'p31', name: '产品多角度展示', category: 'processing', description: '产品多角度细节展示', image: '/images/products/product-31.jpg' },
  { id: 'p32', name: '装袋设备细节', category: 'bagging', description: '装袋设备结构细节展示', image: '/images/products/product-32.jpg' },
];
