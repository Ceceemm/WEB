# AGENTS.md instructions for C:\Users\TomatoLaser\Desktop\WEB

## 最高优先级安全规则

禁止批量删除文件或目录，禁止使用 `del /s`、`rd /s`、`rmdir /s`、`Remove-Item -Recurse`、`rm -rf` 等递归删除命令。

如需删除文件，只能一次删除一个明确路径的单个文件，例如：

```powershell
Remove-Item "C:\path\to\file.txt"
```

若任务涉及批量删除，必须停止操作并请求用户手动执行。

## 项目定位

这是一个中文企业官网前端项目，品牌为“安丘市增涛机械有限公司 / 安丘增涛机械”。

页面主要服务于机械设备展示和咨询转化，核心业务信息包括：

- 公司成立于 2012 年，位于山东省潍坊市安丘市金安产业园以南。
- 主营油脂加工机械、饲料生产设备、农田装备、煤炭装袋设备等。
- 页面重点展示螺旋榨油机、液压榨油机、白土榨油机、废油泥榨油机、预榨机、花生榨油机、大豆榨油机、米糠榨油机、筛选机、粉碎机、炒锅、上料机、脱壳机、煤炭装袋机、装车机等产品。
- 联系电话为 `13606464864`，微信号为 `AQZTJX`。

## 项目结构

实际应用位于 `app/` 子目录，不是仓库根目录。

关键路径：

- `app/package.json`：脚本、依赖、项目命令。
- `app/src/App.tsx`：页面总装，按顺序渲染 Navbar、Hero、About、Products、Gallery、Advantages、Contact、Footer。
- `app/src/main.tsx`：React 入口，已检查 `#root` 是否存在。
- `app/src/index.css`：全局样式、CSS 变量、锻造风格基础样式。
- `app/tailwind.config.js`：Tailwind 主题扩展、forge 色板、字体、动画。
- `app/vite.config.ts`：Vite、Vitest、gzip 压缩、构建分包和资源输出规则。
- `app/src/data/products.ts`：产品分类和产品列表数据。
- `app/public/images/products/`：产品图片，基本同时提供 `.jpg` 与 `.webp`。
- `app/src/components/sections/`：页面各业务区块。
- `app/src/components/common/`：通用组件，如滚动出现、WebP 图片、灯箱、错误边界。
- `app/src/components/layout/`：导航栏和页脚。
- `app/src/components/ui/`：shadcn/ui 组件库文件，多数可能暂未被业务页直接使用。
- `app/docs/code-review-report.md`：历史代码审查报告，部分问题已修复，阅读时要以当前源码为准。

## 技术栈

- React 19 + TypeScript。
- Vite 7，项目 `type` 为 `module`。
- Tailwind CSS 3，设计 token 主要使用 CSS 变量和 `forge-*` 命名。
- shadcn/ui 配置存在，图标库使用 `lucide-react`。
- Vitest + React Testing Library + jsdom。
- ESLint 9 + TypeScript ESLint + React Hooks + React Refresh。
- 构建使用 `vite-plugin-compression` 生成 gzip 资源。

## 常用命令

在 `C:\Users\TomatoLaser\Desktop\WEB\app` 目录运行：

```powershell
npm run dev
npm run build
npm run lint
npm run test:run
npm run check
npm run preview
```

说明：

- `npm run dev` 启动 Vite 开发服务。
- `npm run build` 先执行 TypeScript 构建检查，再执行 Vite 构建。
- `npm run check` 依次执行 lint、测试、构建，适合作为最终验证。

## 代码与架构约定

- 使用 `@/*` 路径别名指向 `app/src/*`。
- 业务区块组件放在 `src/components/sections/`。
- 通用交互组件放在 `src/components/common/`。
- 页面数据目前硬编码在 `src/data/products.ts`，修改产品名称、描述、分类、图片路径时优先改这里。
- 产品图片路径使用 `/images/products/...jpg`，`WebpImage` 会自动尝试同名 `.webp`。
- 新增产品图片时，尽量同时提供 `.jpg` 和 `.webp`，并放在 `app/public/images/products/`。
- 保持 React 声明式写法，不要用 DOM 直接创建或插入元素。
- 涉及弹窗、移动菜单等禁止滚动场景时，复用 `src/hooks/use-scroll-lock.ts`，不要直接写 `document.body.style.overflow = ...`。
- 各页面 section 已由 `SectionErrorBoundary` 包裹，新增 section 时也应考虑错误边界。

## 页面和内容结构

当前首页为单页落地页，锚点导航包括：

- `#hero`：首屏，突出“安丘增涛机械”。
- `#about`：公司介绍、注册资本、成立年限。
- `#products`：产品系列，按“榨油设备 / 处理设备 / 装袋设备”切换。
- `#gallery`：设备实拍，点击图片打开灯箱。
- `#contact`：电话、微信、地址、致电按钮。

导航文字和页面文案均为中文。除非用户要求，不要改成英文。

## 视觉设计约定

整体是“暖锻造 / 工业机械”风格：

- 主色为深色工业底色、暖橙色高亮、米白文字。
- Tailwind 颜色集中在 `forge` 色板：`forge-black`、`forge-dark`、`forge-orange`、`forge-gold`、`forge-paper`、`forge-warm-text` 等。
- 字体配置偏中文品牌展示：标题用 `font-display`，正文用 `font-body`，技术/数据文字用 `font-mono`。
- 圆角通常较小，保持机械、硬朗、克制的视觉语言。
- 避免无关的大面积渐变装饰、营销空话、英文堆砌。
- 新增按钮或图标优先使用 `lucide-react`。

## 测试现状

已有测试文件：

- `app/src/components/sections/ProductsSection.test.tsx`
- `app/src/components/common/ImageLightbox.test.tsx`
- `app/src/data/products.test.ts`

测试环境配置：

- `app/vite.config.ts` 中配置了 Vitest `jsdom` 环境和 `src/test-setup.ts`。
- `src/test-setup.ts` mock 了 `IntersectionObserver` 和 `matchMedia`，并在每个测试后清理 body 滚动样式。

改动产品分类、灯箱、滚动展示、移动菜单、图片加载逻辑时，应优先补充或更新测试。

## SEO 与静态信息

`app/index.html` 已包含：

- `lang="zh-CN"`。
- title、description、keywords。
- Open Graph 基础标签。
- 中文字体镜像预连接和字体样式表。
- Organization 结构化数据。

修改公司名称、电话、地址、业务范围时，要同步检查页面文案、`index.html` 的 meta 信息和结构化数据。

## 已知注意点

- `app/docs/code-review-report.md` 是历史报告，其中部分“待修复”内容在当前源码里已经处理，例如滚动锁、错误边界、测试、SEO、页脚年份等。不要直接照报告结论改代码，先读当前文件。
- `components/ui/` 下有大量 shadcn/ui 文件，删除前必须确认引用关系；同时受最高优先级删除规则限制，不能批量删除。
- `package.json` 中可能存在暂未使用的依赖或 UI 组件，做瘦身前需要逐项验证。
- `vite.config.ts` 设置了 `base: "./"`，这对静态部署路径有影响，改动前要确认部署方式。
- 构建输出 `dist` 和测试覆盖率 `coverage` 已在 ESLint 全局忽略中。
