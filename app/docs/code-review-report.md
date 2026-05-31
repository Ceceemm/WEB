# 增涛机械官网 — 代码审查报告与修改方案

> **审查日期**：2026-05-28
> **审查范围**：`app/src/` 全部源码（19 个组件 + 配置文件）
> **审查人**：高级开发工程师
> **优先级定义**：🔴 P0 必修 | 🟡 P1 应修 | 🟢 P2 改进

---

## 目录

- [一、项目现状总览](#一项目现状总览)
- [二、问题总表](#二问题总表)
- [三、P0 必修问题（7 个）](#三p0-必修问题7-个)
- [四、P1 应修问题（10 个）](#四p1-应修问题10-个)
- [五、P2 改进问题（5 个）](#五p2-改进问题5-个)
- [六、建议修复顺序](#六建议修复顺序)
- [七、团队提升路线图](#七团队提升路线图)
- [八、推荐学习路径](#八推荐学习路径)

---

## 一、项目现状总览

| 维度 | 现状 | 评分 |
|------|------|------|
| 技术栈 | React 19 + TypeScript + Vite 7 + Tailwind CSS 3 + shadcn/ui | ⭐⭐⭐⭐ |
| 类型安全 | TypeScript 严格模式已开启，`tsc --noEmit` 零错误 | ⭐⭐⭐⭐⭐ |
| 代码规范 | ESLint 配置基础，8 个 lint 问题待修 | ⭐⭐⭐ |
| 测试覆盖 | **零测试**，无任何测试文件 | ⭐ |
| 组件架构 | 职责分层合理（layout / sections / common / data） | ⭐⭐⭐⭐ |
| 性能优化 | Gzip 压缩、手动分包、图片懒加载、IntersectionObserver | ⭐⭐⭐⭐ |
| 设计系统 | "锻造美学" token 体系完善，动画体系完整 | ⭐⭐⭐⭐⭐ |
| 可访问性 | 部分覆盖，有改进空间 | ⭐⭐⭐ |

**总评**：项目骨架扎实，设计感强，但存在多个"工程化缺口"需要补齐。

---

## 二、问题总表

| # | 优先级 | 问题 | 文件 | 行号 |
|---|--------|------|------|------|
| P0-01 | 🔴 | DOM 直接操作（图片错误处理） | ProductsSection.tsx | 74-85 |
| P0-02 | 🔴 | body.overflow 竞态（Navbar） | Navbar.tsx | 22-25 |
| P0-03 | 🔴 | body.overflow 竞态（Lightbox） | ImageLightbox.tsx | 22 |
| P0-04 | 🔴 | Math.random() 纯函数违反 | sidebar.tsx | 611 |
| P0-05 | 🔴 | 7 个 react-refresh ESLint 错误 | 7 个 ui 组件 | 各处 |
| P0-06 | 🔴 | 零测试覆盖 | 全项目 | — |
| P0-07 | 🔴 | 缺少 Error Boundary | App.tsx | — |
| P1-01 | 🟡 | 动画 keyframes 重复定义 | index.css + tailwind.config.js | 88-175 |
| P1-02 | 🟡 | 产品数据硬编码 | products.ts | 全文件 |
| P1-03 | 🟡 | 缺少 SEO head 管理 | index.html / App.tsx | — |
| P1-04 | 🟡 | framer-motion 冗余（30KB） | package.json | 45 |
| P1-05 | 🟡 | 51 个未使用的 shadcn/ui 组件 | components/ui/ | — |
| P1-06 | 🟡 | Navbar 滚动监听无节流 | Navbar.tsx | 16-20 |
| P1-07 | 🟡 | ScrollReveal 依赖数组不稳定 | ScrollReveal.tsx | 37 |
| P1-08 | 🟡 | GallerySection 无效 Tailwind class | GallerySection.tsx | 32-37 |
| P1-09 | 🟡 | AboutSection 每次渲染创建 Date | AboutSection.tsx | 62 |
| P1-10 | 🟡 | DiagonalLine color 参数歧义 | DiagonalLine.tsx | 36 |
| P2-01 | 🟢 | 无主题切换 | index.css / package.json | — |
| P2-02 | 🟢 | 无 PWA 基础 | vite.config.ts | — |
| P2-03 | 🟢 | 可访问性改进 | 多处 | — |
| P2-04 | 🟢 | main.tsx 非空断言 | main.tsx | 6 |
| P2-05 | 🟢 | Footer 年份硬编码 | Footer.tsx | 6 |

---

## 三、P0 必修问题（7 个）

### P0-01：ProductsSection 图片加载失败处理使用 DOM 直接操作

**文件**：`src/components/sections/ProductsSection.tsx` 第 74-85 行

**问题**：`onError` 回调中直接操作 `target.style.display`、`parent.classList.add()`、`document.createElement()`、`parent.appendChild()`。这是 React 反模式——绕过虚拟 DOM 直接修改真实 DOM，会导致：

- React 状态与真实 DOM 不一致
- 重复触发 onError 时可能重复 appendChild
- React 重新渲染时不会恢复 img 元素

**当前代码**：

```tsx
// 第 74-85 行
onError={(e) => {
  const target = e.currentTarget;
  target.style.display = 'none';
  const parent = target.parentElement;
  if (parent) {
    parent.classList.add('flex', 'items-center', 'justify-center');
    const fallback = document.createElement('p');
    fallback.className = 'text-forge-gray/30 font-display text-sm';
    fallback.textContent = product.name;
    parent.appendChild(fallback);
  }
}}
```

**修改方案**：用 React 状态驱动替代 DOM 操作

```tsx
function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);  // 新增

  return (
    <div className="group relative bg-forge-dark border border-forge-light/30 rounded-sm overflow-hidden transition-all duration-500 hover:border-forge-orange/60 hover:shadow-forge">
      {/* Image container */}
      <div className={`aspect-[4/3] bg-forge-mid overflow-hidden ${
        imgError ? 'flex items-center justify-center' : ''  // 状态驱动
      }`}>
        {imgError ? (                                     // 条件渲染
          <p className="text-forge-gray/30 font-display text-sm">{product.name}</p>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ willChange: 'transform' }}
            onError={() => setImgError(true)}             // 仅 setState
          />
        )}
      </div>

      {/* Info - 不变 */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-forge-cream group-hover:text-forge-orange transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-forge-gray text-sm font-body leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Heat line on hover - 不变 */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forge-orange/0 to-transparent group-hover:via-forge-orange/70 transition-all duration-500" />
    </div>
  );
}
```

**影响范围**：`ProductCard` 组件（同文件第 62 行），`useState` 已在文件顶部 import。

---

### P0-02：Navbar 直接操作 body.style.overflow

**文件**：`src/components/layout/Navbar.tsx` 第 22-25 行

**问题**：`document.body.style.overflow = 'hidden'` 直接操作 body，多个组件同时操作时会产生竞态：

- 如果 Navbar 设置 `hidden`，然后 ImageLightbox 也设置 `hidden`
- ImageLightbox 关闭时恢复为 `''`，但 Navbar 还开着 → 页面意外可滚动

**当前代码**：

```tsx
// 第 22-25 行
useEffect(() => {
  document.body.style.overflow = mobileOpen ? 'hidden' : '';
  return () => { document.body.style.overflow = ''; };
}, [mobileOpen]);
```

**修改方案**：与 P0-03 共用 `scroll-lock.ts` 模块，见 P0-03。

---

### P0-03：ImageLightbox 直接操作 body.style.overflow

**文件**：`src/components/common/ImageLightbox.tsx` 第 22 行

**问题**：与 P0-02 相同的竞态问题。

**当前代码**：

```tsx
// 第 19-28 行
useEffect(() => {
  if (open) {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
  }
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
  };
}, [open, handleKeyDown]);
```

**修改方案**：抽取到 `src/lib/scroll-lock.ts`，引用计数管理

```ts
// src/lib/scroll-lock.ts
let lockCount = 0;

export function lockBodyScroll() {
  if (lockCount === 0) {
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
  }
}
```

Navbar 引用：

```tsx
// Navbar.tsx
import { lockBodyScroll, unlockBodyScroll } from '@/lib/scroll-lock';

useEffect(() => {
  if (mobileOpen) lockBodyScroll();
  return () => unlockBodyScroll();
}, [mobileOpen]);
```

ImageLightbox 引用：

```tsx
// ImageLightbox.tsx
import { lockBodyScroll, unlockBodyScroll } from '@/lib/scroll-lock';

useEffect(() => {
  if (open) {
    document.addEventListener('keydown', handleKeyDown);
    lockBodyScroll();
  }
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    unlockBodyScroll();
  };
}, [open, handleKeyDown]);
```

---

### P0-04：sidebar.tsx 中 Math.random() 违反 React 纯函数规则

**文件**：`src/components/ui/sidebar.tsx` 第 611 行

**问题**：ESLint 报错 `react-hooks/purity` — `Math.random()` 在渲染期间调用，违反 React 组件必须幂等的原则。重新渲染时可能产生不一致的宽度值。

**当前代码**：

```tsx
// 第 609-612 行
// Random width between 50 to 90%.
const width = React.useMemo(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
}, [])
```

**修改方案**：接受外部传入的 width prop，默认使用确定值

```tsx
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  width = '70%',          // 确定性默认值
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
  width?: string          // 新增 prop
}) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        style={{ width }}     // 使用 prop
        className="h-4 flex-1"
        data-sidebar="menu-skeleton-text"
      />
    </div>
  )
}
```

> 注意：这是 shadcn/ui 生成的组件。如果修改后 `npx shadcn@latest add sidebar` 会覆盖，建议在组件顶部加注释标记。

---

### P0-05：7 个 react-refresh/only-export-components ESLint 错误

**文件**：7 个 shadcn/ui 组件文件

| 文件 | 行号 |
|------|------|
| `components/ui/badge.tsx` | 46:17 |
| `components/ui/button-group.tsx` | 82:3 |
| `components/ui/button.tsx` | 62:18 |
| `components/ui/form.tsx` | 159:3 |
| `components/ui/navigation-menu.tsx` | 167:3 |
| `components/ui/sidebar.tsx` | 725:3 |
| `components/ui/toggle.tsx` | 45:18 |

**问题**：这些文件同时导出了 React 组件和非常量（如 `buttonVariants`、`badgeVariants` 等变体定义），导致 Fast Refresh 失效。

**修改方案**：在 `eslint.config.js` 中对这些 shadcn/ui 生成文件关闭此规则

```js
// eslint.config.js — 在原有配置中添加 overrides
{
  files: ['src/components/ui/**/*.{ts,tsx}'],
  rules: {
    'react-refresh/only-export-components': 'off'
  }
}
```

这比修改每个 shadcn/ui 文件更合理，因为 `npx shadcn@latest add` 会覆盖修改。

---

### P0-06：零测试覆盖

**问题**：项目中没有任何测试文件。32 个产品、图片灯箱、分类切换、滚动动画、移动端菜单——全靠手动验证。

**修改方案**：搭建 Vitest + React Testing Library 测试体系

**Step 1**：安装依赖

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Step 2**：配置 `vite.config.ts`

```ts
// 在 defineConfig 内添加 test 配置
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test-setup.ts',
  css: true,
},
```

**Step 3**：创建 `src/test-setup.ts`

```ts
import '@testing-library/jest-dom';
```

**Step 4**：在 `package.json` scripts 中添加

```json
"test": "vitest",
"test:run": "vitest run"
```

**Step 5**：优先编写的测试用例

```tsx
// src/components/sections/__tests__/ProductsSection.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsSection } from '../ProductsSection';

describe('ProductsSection', () => {
  it('renders category tabs', () => {
    render(<ProductsSection />);
    expect(screen.getByText('榨油设备')).toBeInTheDocument();
    expect(screen.getByText('处理设备')).toBeInTheDocument();
    expect(screen.getByText('装袋设备')).toBeInTheDocument();
  });

  it('switches category on tab click', async () => {
    const user = userEvent.setup();
    render(<ProductsSection />);
    await user.click(screen.getByText('处理设备'));
    expect(screen.getByText('筛选机')).toBeInTheDocument();
    expect(screen.queryByText('螺旋榨油机')).not.toBeInTheDocument();
  });

  it('shows fallback text when image fails to load', () => {
    render(<ProductsSection />);
    const img = screen.getByAltText('螺旋榨油机');
    img.dispatchEvent(new Event('error'));
    expect(screen.getByText('螺旋榨油机')).toBeInTheDocument();
  });
});
```

```tsx
// src/components/common/__tests__/ImageLightbox.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageLightbox } from '../ImageLightbox';

describe('ImageLightbox', () => {
  it('renders when open', () => {
    render(<ImageLightbox src="/test.jpg" alt="测试图" open onClose={vi.fn()} />);
    expect(screen.getByAltText('测试图')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ImageLightbox src="/test.jpg" alt="测试图" open={false} onClose={vi.fn()} />);
    expect(screen.queryByAltText('测试图')).not.toBeInTheDocument();
  });

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    render(<ImageLightbox src="/test.jpg" alt="测试图" open onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
```

```tsx
// src/data/__tests__/products.test.ts
import { products, productCategories } from '../products';

describe('products data', () => {
  it('has 32 products', () => {
    expect(products).toHaveLength(32);
  });

  it('every product has valid category', () => {
    const validKeys = productCategories.map(c => c.key);
    products.forEach(p => {
      expect(validKeys).toContain(p.category);
    });
  });

  it('every product has required fields', () => {
    products.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('category');
      expect(p).toHaveProperty('description');
      expect(p).toHaveProperty('image');
      expect(p.image).toMatch(/^\/images\/products\//);
    });
  });
});
```

---

### P0-07：缺少 Error Boundary

**文件**：`src/App.tsx`

**问题**：任何组件渲染错误都会导致整个页面白屏，没有任何错误提示。

**修改方案**：创建 Error Boundary 组件并包裹整个应用

```tsx
// src/components/common/ErrorBoundary.tsx
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-screen bg-forge-black flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="font-display text-2xl text-forge-cream mb-4">页面加载出错</h2>
            <p className="text-forge-gray font-body mb-6">
              {this.state.error?.message ?? '未知错误'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-forge-orange text-forge-white rounded-sm hover:bg-forge-orange-glow transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

在 `App.tsx` 中使用：

```tsx
// src/App.tsx 修改
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-forge-black text-forge-cream font-body">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <GallerySection />
          <AdvantagesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
```

---

## 四、P1 应修问题（10 个）

### P1-01：动画 keyframes 在 CSS 和 Tailwind 配置中重复定义

**文件**：`src/index.css` 第 88-175 行 与 `tailwind.config.js` 第 88-144 行

**问题**：以下动画在两个地方各定义了一次：

| 动画名 | CSS 行号 | Tailwind 行号 |
|--------|---------|--------------|
| `forge-glow` | 130-137 | 101-108 |
| `slide-up` | 139-148 | 109-112 |
| `slide-right` | 150-159 | 113-116 |
| `slide-left` | 161-170 | 117-120 |
| `fade-in` | 172-175 | 121-124 |

修改一边忘记另一边，会产生不一致。

**修改方案**：

1. 从 `index.css` 删除第 130-175 行（5 个 `@keyframes` 块）
2. 从 `index.css` 删除第 88-106 行（`.animate-forge-glow` 到 `.animate-fade-in`，已被 Tailwind 覆盖）
3. **保留** `index.css` 中 `.animate-heat-border`、`.stagger-*`、`.text-glow-forge`（这些不在 Tailwind 配置中）
4. 在 `tailwind.config.js` 的 `keyframes` 中确认 `heat-pulse` 已配置

---

### P1-02：产品数据硬编码在 TypeScript 中

**文件**：`src/data/products.ts`

**问题**：32 个产品、3 个分类全部硬编码在 TypeScript 文件中。更新任何产品信息（名称、图片路径、描述）都需要修改源码 → 重新构建 → 重新部署。

**修改方案**：将数据抽取为静态 JSON，通过 import 引入

**Step 1**：创建 `public/data/products.json`

```json
{
  "categories": [
    { "id": "oil-press", "label": "榨油设备", "key": "oil-press", "description": "螺旋榨油机 · 液压榨油机 · 白土榨油机 · 废油泥榨油机 · 预榨机" },
    { "id": "processing", "label": "处理设备", "key": "processing", "description": "筛选机 · 粉碎机 · 炒锅 · 上料机 · 脱壳机" },
    { "id": "bagging", "label": "装袋设备", "key": "bagging", "description": "煤炭装袋机 · 装车机" }
  ],
  "products": [
    { "id": "p1", "name": "螺旋榨油机", "category": "oil-press", "..." : "..." }
  ]
}
```

**Step 2**：修改 `src/data/products.ts`

```ts
import type { Product, ProductCategory } from '@/types/product';

// 编译时静态导入（Vite 会把 JSON 当模块处理）
import data from '/public/data/products.json';

export type { Product, ProductCategory };
export const productCategories: ProductCategory[] = data.categories;
export const products: Product[] = data.products;
```

**好处**：

- 更新产品不需要改 TypeScript 源码
- JSON 可由非技术人员编辑
- 未来可轻松切换为 fetch API 调用

---

### P1-03：缺少 SEO head 管理

**文件**：`index.html`（当前只有硬编码 title）

**问题**：没有动态 title、meta description、OG 标签管理。搜索引擎抓取时只看到静态的 `<title>`。

**修改方案**：使用 `@unhead/react` 管理 head

```bash
npm install @unhead/react
```

```tsx
// src/main.tsx
import { createHead } from '@unhead/react/client';
import { HeadProvider } from '@unhead/react';

const head = createHead();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeadProvider head={head}>
      <App />
    </HeadProvider>
  </StrictMode>,
);
```

```tsx
// src/App.tsx 顶部添加
import { Head } from '@unhead/react';

function App() {
  return (
    <ErrorBoundary>
      <Head>
        <title>增涛机械 — 油脂加工设备 | 饲料生产设备 | 煤炭装袋设备</title>
        <meta name="description" content="安丘市增涛机械有限公司，专业制造螺旋榨油机、液压榨油机、煤炭装袋机等机械设备，十余年行业经验，品质可靠。" />
        <meta property="og:title" content="增涛机械 — 专业机械设备制造商" />
        <meta property="og:description" content="油脂加工 · 饲料生产 · 农田装备" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="zh_CN" />
        <link rel="canonical" href="https://www.zengtaojixie.com/" />
      </Head>
      {/* ... 其余不变 */}
    </ErrorBoundary>
  );
}
```

---

### P1-04：framer-motion 已安装但未使用（约 30KB 冗余）

**文件**：`package.json` 第 45 行

**问题**：`"framer-motion": "^12.40.0"` 已安装，但全项目没有任何文件 import 它。Gzip 后约 30KB 无用代码被打包。

**修改方案 A（推荐）**：删除依赖

```bash
npm uninstall framer-motion
```

**修改方案 B**：如果未来计划使用，现在保留但确保 tree-shaking 生效（Vite 默认支持）。

> 当前推荐方案 A，因为项目已通过纯 CSS 动画 + `ScrollReveal` 组件实现了所有动画效果，没有需要 framer-motion 的场景。

---

### P1-05：大量 shadcn/ui 组件已安装但未使用

**文件**：`package.json` 和 `src/components/ui/` 下 51 个组件

**问题**：安装了 51 个 shadcn/ui 组件（accordion, alert-dialog, avatar, calendar, chart, command, context-menu 等），但实际使用的可能为 0 个。这导致 `vendor-ui` chunk 包含了不必要的代码。

**修改方案**：

1. 逐个确认是否使用：`grep -r "from.*@/components/ui/" src/` 排除非 ui 组件的引用
2. 删除未使用的 ui 组件文件
3. 从 `package.json` 中删除对应的 radix-ui 依赖

> 不影响功能，但会显著减少 node_modules 体积和构建时间。

---

### P1-06：Navbar 滚动监听没有节流

**文件**：`src/components/layout/Navbar.tsx` 第 16-20 行

**问题**：`scroll` 事件每次像素移动都触发 `setState`，在快速滚动时可能造成性能问题。

**当前代码**：

```tsx
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**修改方案 A（推荐）**：阈值判断 + 无节流

因为 `setScrolled(window.scrollY > 60)` 本身是布尔值切换，React 在值不变时不会重新渲染，所以实际性能影响很小。当前实现已经足够，只需确认 `{ passive: true }` 已设置（✅ 已设置）。

**修改方案 B**：如果未来滚动逻辑变复杂，使用 rAF 节流

```tsx
useEffect(() => {
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

### P1-07：ScrollReveal 的 delay 参数在依赖数组中但不会变化

**文件**：`src/components/common/ScrollReveal.tsx` 第 21-37 行

**问题**：`delay` 和 `threshold` 是 `useEffect` 的依赖，但它们在组件生命周期内不会变化。每次因为其他原因重新渲染时，IntersectionObserver 会被不必要地重新创建。

**当前代码**：

```tsx
useEffect(() => {
  const node = ref.current;
  if (!node) return;
  const observer = new IntersectionObserver(/* ... */, { threshold });
  observer.observe(node);
  return () => observer.disconnect();
}, [delay, threshold]); // delay/threshold 在运行时不变化
```

**修改方案**：使用 `useRef` 稳定化

```tsx
const delayRef = useRef(delay);
const thresholdRef = useRef(threshold);

useEffect(() => {
  const node = ref.current;
  if (!node) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delayRef.current);
        observer.unobserve(node);
      }
    },
    { threshold: thresholdRef.current }
  );

  observer.observe(node);
  return () => observer.disconnect();
}, []); // 空依赖，Observer 只创建一次
```

---

### P1-08：GallerySection 无效 Tailwind class

**文件**：`src/components/sections/GallerySection.tsx` 第 32 行

**问题**：

```tsx
const isFeatured = product.featured && index === 0;
```

`sm:column-span-all` 在 CSS columns 布局中不是有效的 Tailwind 类，Tailwind 默认配置不包含此值。

**修改方案**：移除无效的 class，使用 `break-inside-avoid` + 更大的高度来视觉突出 featured 产品

```tsx
const isFeatured = product.featured && index === 0;

<div
  className={`break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-forge-warm-border/50 transition-all duration-500 hover:border-forge-orange/60 hover:shadow-md ${
    isFeatured ? 'aspect-[4/2]' : 'aspect-[4/3]'  // featured 更宽
  }`}
  onClick={() => setLightbox({ src: product.image, alt: product.name })}
>
```

---

### P1-09：AboutSection 每次渲染创建 Date 对象

**文件**：`src/components/sections/AboutSection.tsx` 第 62 行

**问题**：

```tsx
{new Date().getFullYear() - 2012}
```

每次组件重新渲染都会创建新的 Date 对象。虽然性能影响微乎其微，但不够优雅。

**修改方案**：提取为模块级常量

```tsx
// 在组件外部（模块级别）
const YEARS_SINCE_FOUNDING = new Date().getFullYear() - 2012;

export function AboutSection() {
  // ...
  <span className="font-mono font-bold text-5xl text-forge-cream">
    {YEARS_SINCE_FOUNDING}
  </span>
  // ...
}
```

---

### P1-10：DiagonalLine color 参数格式歧义

**文件**：`src/components/common/DiagonalLine.tsx` 第 36 行

**问题**：

```tsx
stroke={`hsl(${color})`}
```

`color` 的默认值是 `'var(--forge-orange)'`（CSS 变量），生成 `hsl(var(--forge-orange))` ✅。但如果未来有人传入 `hsl(30 6% 12%)`，会生成 `hsl(hsl(30 6% 12%))` ❌。

**修改方案**：添加 JSDoc 说明参数格式

```tsx
interface DiagonalLineProps {
  className?: string;
  from?: 'tl' | 'tr' | 'bl' | 'br';
  to?: 'tl' | 'tr' | 'bl' | 'br';
  /**
   * HSL 值，支持两种格式：
   * - CSS 变量引用: 'var(--forge-orange)' → 生成 hsl(var(--forge-orange))
   * - 空格分隔 HSL: '14 78% 54%' → 生成 hsl(14 78% 54%)
   *
   * 请勿传入已包含 hsl() 包裹的值
   */
  color?: string;
  opacity?: number;
}
```

---

## 五、P2 改进问题（5 个）

### P2-01：设计系统有完整的 light/dark token 但没有主题切换

**文件**：`index.css` — `:root` 定义了完整的 dark 调色板；`next-themes` 已安装但未使用

**问题**：`package.json` 安装了 `next-themes`，但项目中没有 ThemeProvider 或切换按钮。CSS 变量只有 `:root` 一套，没有 `.dark` 选择器。

**修改方案**（如果需要亮色主题）：

1. 在 `index.css` 添加 `.dark` / `.light` 选择器

```css
.dark {
  /* 当前的 :root 值 */
}
.light {
  --forge-black: 38 28% 94%;
  --cream: 30 6% 12%;
  /* 反转或调整颜色 */
}
```

2. 添加 ThemeProvider 到 App
3. 添加主题切换按钮到 Navbar

> 注意：当前"暖锻美学"设计以深色为核心，亮色主题可能需要完全不同的配色方案，而非简单的颜色反转。

---

### P2-02：无 PWA 基础（manifest / Service Worker）

**问题**：没有 `manifest.json`，没有 Service Worker，无法离线访问或添加到主屏幕。

**修改方案**：

```bash
npm install -D vite-plugin-pwa
```

```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '增涛机械',
        short_name: '增涛机械',
        description: '安丘市增涛机械有限公司 — 专业机械设备制造商',
        theme_color: '#e05a3d',
        background_color: '#1e1e1e',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  // ...
});
```

---

### P2-03：可访问性（Accessibility）改进

**多处问题**：

| 位置 | 问题 | 修改 |
|------|------|------|
| `ProductsSection.tsx:50` | 分类切换按钮缺少 `role="tablist"` / `role="tab"` | 添加 ARIA 角色和 `aria-selected` |
| `ProductsSection.tsx:50` | 产品网格缺少 `aria-label` | 添加 `aria-label="产品列表"` |
| `ImageLightbox.tsx:33` | 模态框缺少 `role="dialog"` 和焦点陷阱 | 添加 `role="dialog" aria-modal="true"` |
| `ImageLightbox.tsx:37` | 关闭按钮只有 `aria-label="关闭"` | 改为 `aria-label="关闭图片预览"` |
| `GallerySection.tsx:39` | 点击打开灯箱的 div 缺少键盘支持 | 添加 `tabIndex={0}` 和 `onKeyDown` |
| `HeroSection.tsx:67` | ↓ 箭头不是语义化的 | 添加 `aria-hidden="true"` |
| `ContactSection.tsx:92` | 电话链接只有视觉含义 | 已使用 `href="tel:..."` ✅ |

**示例修改** — ProductsSection 分类标签：

```tsx
<div className="flex gap-2 mb-16 border-b border-forge-light/20 overflow-x-auto pb-1"
  role="tablist" aria-label="产品分类">
  {productCategories.map((cat) => (
    <button
      key={cat.id}
      role="tab"
      aria-selected={activeCategory === cat.key}
      onClick={() => setActiveCategory(cat.key)}
      className={`...`}
    >
      {cat.label}
      {activeCategory === cat.key && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-forge-orange animate-forge-glow" />
      )}
    </button>
  ))}
</div>
```

---

### P2-04：main.tsx 使用非空断言

**文件**：`src/main.tsx` 第 6 行

**问题**：

```tsx
createRoot(document.getElementById('root')!).render(
```

如果 HTML 中没有 `#root` 元素，`getElementById` 返回 null，非空断言会导致运行时错误。

**修改方案**：

```tsx
const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

### P2-05：Footer 年份硬编码

**文件**：`src/components/layout/Footer.tsx` 第 6 行

**问题**：`2012-2026` 硬编码，到 2027 年就过期了。

**修改方案**：

```tsx
<p className="text-forge-gray text-sm font-mono">
  &copy; 2012-{new Date().getFullYear()} 安丘市增涛机械有限公司
</p>
```

---

## 六、建议修复顺序

```
P0-01 (DOM 反模式) ──→ P0-02/03 (overflow 竞态) ──→ P0-07 (Error Boundary)
                                                      │
                                                      ↓
                                              P0-06 (测试体系)
                                                      │
                                                      ↓
                                       P0-04/05 (Lint 清零)
                                                      │
                                                      ↓
                                    P1-01 ~ P1-10 (架构优化)
                                                      │
                                                      ↓
                                    P2-01 ~ P2-05 (质量精进)
```

**逻辑关系**：

1. **P0-01** 最先修 — DOM 直接操作是最严重的反模式，影响可预测性
2. **P0-02/03** 紧随其后 — 共用同一个 `scroll-lock.ts`，一起改效率最高
3. **P0-07** 在测试之前 — Error Boundary 是安全网，有了它再改其他代码更放心
4. **P0-06** 在 P0-07 之后 — 有了 Error Boundary + 声明式代码，测试更容易写
5. **P0-04/05** 最后修 P0 — lint 问题影响开发体验但不影响运行

---

## 七、团队提升路线图

### Phase 1：工程基础加固（1-2 周）

| 技能点 | 具体行动 | 预期收益 |
|--------|----------|----------|
| 测试体系搭建 | 引入 Vitest + React Testing Library | 任何改动有测试保障 |
| React 最佳实践 | 修复所有 DOM 直接操作，改为声明式 | 代码可预测、可调试 |
| ESLint 零容忍 | 修复全部 8 个 lint error，配置 pre-commit hook | 代码风格一致 |
| Error Boundary | 在 App 级别和各 Section 级别添加错误边界 | 页面不再白屏 |

### Phase 2：架构优化（2-3 周）

| 技能点 | 具体行动 | 预期收益 |
|--------|----------|----------|
| 状态管理规范化 | 抽取 `useScrollLock`、`useMediaQuery` 等 hooks | 逻辑复用、减少 bug |
| 数据层抽象 | 产品数据抽离为 JSON + loader 模式 | 内容更新无需重新构建 |
| SEO 体系 | 引入 `@unhead/react` 管理 head | 搜索引擎可索引 |
| 动画体系统一 | 合并 CSS/JS 动画定义，统一到 tailwind config | 维护成本降低 |

### Phase 3：质量与性能精进（持续）

| 技能点 | 具体行动 | 预期收益 |
|--------|----------|----------|
| 性能预算 | 配置 Lighthouse CI，设定 FCP < 1.5s 目标 | 性能可量化 |
| 可访问性审计 | axe-core 扫描 + WCAG 2.1 AA 合规 | 合规、用户覆盖面广 |
| 渐进增强 | 添加 PWA manifest + Service Worker | 离线可用、原生体验 |
| CI/CD 流水线 | GitHub Actions：lint → test → build → deploy | 人工失误归零 |

---

## 八、推荐学习路径

### 初级 → 中级

1. **React 官方文档**（新版）— 重点：渲染生命周期、Hooks 规则、Error Boundary
2. **TypeScript 入门到实战** — 重点：泛型、类型收窄、工具类型
3. **Testing Library 哲学** — "测试行为，而非实现细节"

### 中级 → 高级

1. **Web Performance 优化** — Core Web Vitals、Critical Rendering Path
2. **组件设计模式** — Compound Components、Render Props、状态提升
3. **构建工具深入** — Vite 插件开发、Rollup 分包策略、Tree Shaking 原理

### 推荐每周实践

- **Code Review 日**：每周五下午，团队交叉审查代码，按上述标准给出改进意见
- **Tech Talk**：每两周一人分享一个从项目中提炼的技术主题
- **重构 KATA**：从本文的"修改方案"中挑一个，在代码中实际落地

---

## 附录：项目优势清单

以下是项目做得好的地方，修复问题时注意保留：

- ✅ 设计 token 体系（CSS 变量 + Tailwind 扩展）非常专业
- ✅ 组件分层清晰（layout / sections / common / data）
- ✅ Vite 构建优化到位（gzip、分包、资源分类输出）
- ✅ TypeScript 零错误
- ✅ 图片懒加载（loading="lazy" + IntersectionObserver）
- ✅ 设计系统命名一致（forge-* 前缀统一）
- ✅ 响应式设计完备（移动端适配到位）
