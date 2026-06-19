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
- `app/src/App.tsx`：页面总装，根据当前路径渲染首页或静态多页，并统一挂载 Navbar、Footer。
- `app/src/main.tsx`：React 入口，已检查 `#root` 是否存在。
- `app/src/entry-server.tsx`：React 服务端预渲染入口，用于构建多页静态 HTML。
- `app/src/index.css`：全局样式、CSS 变量、锻造风格基础样式。
- `app/tailwind.config.js`：Tailwind 主题扩展、forge 色板、字体、动画。
- `app/vite.config.ts`：Vite、Vitest、gzip 压缩、构建分包和资源输出规则。
- `app/src/data/products.ts`：产品分类和产品列表数据。
- `app/src/data/site.ts`：公司名、电话、微信、地址、服务地区、FAQ 等站点统一信息。
- `app/src/data/pages.ts`：静态页面路由、metadata、产品分类详情文案。
- `app/src/data/structured-data.ts`：WebSite、LocalBusiness、BreadcrumbList、Product、FAQPage 等 JSON-LD 和 sitemap 生成逻辑。
- `app/src/pages/`：首页和新增静态多页内容。
- `app/scripts/prerender.mjs`：生产构建后生成 `dist/**/index.html`。
- `app/scripts/deploy-oss.mjs`：读取本机 `.ossutilconfig` 并上传 `app/dist` 到阿里云 OSS，不执行删除。
- `app/scripts/submit-indexnow.mjs`：读取 `dist/sitemap.xml` 并向 Bing IndexNow 提交正式 URL。
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
npm run preview:static -- 5175
```

说明：

- `npm run dev` 启动 Vite 开发服务。
- `npm run build` 先执行 TypeScript 构建检查，再执行 Vite 客户端构建、SSR 入口构建和静态多页预渲染。
- `npm run check` 依次执行 lint、测试、构建，适合作为最终验证。
- `npm run preview:static -- 端口号` 使用 `app/dist` 启动轻量静态预览，适合 Codex 内置浏览器打不开 Vite 后台服务时使用。
- `D:\soft\node.exe scripts\deploy-oss.mjs` 上传 `app/dist` 到阿里云 OSS；该脚本只执行 PutObject 覆盖/新增，不删除 OSS 对象。
- `npm run submit:indexnow:dry` 预览将提交给 Bing IndexNow 的 URL；`npm run submit:indexnow` 正式提交。
- 本机 PowerShell 中不要直接依赖 `npm`，优先显式调用 `D:\soft\npm.cmd`，避免命中 `npm.ps1` 执行策略限制。
- 如果 Codex 内置浏览器提示 `127.0.0.1` 拒绝连接，先用 `Invoke-WebRequest http://127.0.0.1:<端口>/` 验证端口是否真返回 `200`；若 Vite 或 `npm` 后台服务假活或退出，先执行 `D:\soft\npm.cmd run build`，再用 `D:\soft\node.exe scripts/static-preview.mjs <当前浏览器端口>` 直接接管该端口。通过 Codex 启动长期预览服务时，需要批准沙箱外 `Start-Process`，普通沙箱子进程可能在命令结束后被回收。

## Git 工作流

- 每次开始新的项目代码、配置、文档或资源改动时，优先从当前稳定分支新建独立分支，例如 `codex/<task-name>`，便于按任务回滚和管理。
- 每次完成任何项目代码、配置、文档或资源改动后，必须执行 `git status` 核对变更，并创建语义清晰的 `git commit`。
- 提交后应在网络和凭据允许时执行 `git push` 到对应远端分支；若验证、提交或推送失败，必须在回复中说明本地状态、失败原因和下一步处理方式。
- 不要把项目改动长期留在未提交状态；提交信息要清楚说明本次修改内容，便于在 VSCode 和 GitHub 中查看每次代码修改细节和回滚。
- 回滚优先使用 `git revert <commit>` 生成可追踪的反向提交，避免改写公开历史。

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

当前站点为静态多页官网，首页保留落地页体验，并新增独立抓取页面：

- `/`：首页。
- `/gongsi/index.html`：公司介绍。
- `/chanpin/index.html`：产品分类。
- `/chanpin/zhayou-shebei/index.html`：榨油设备详情。
- `/chanpin/chuli-shebei/index.html`：处理设备详情。
- `/chanpin/zhuangdai-shebei/index.html`：装袋设备详情。
- `/lianxi/index.html`：联系方式。
- `/wenti/index.html`：常见问题。

当前 OSS 静态网站规则会把 `/wenti/`、`/chanpin/` 这类目录 URL 回落到首页，因此正式 canonical、站内链接和 sitemap 使用 `.../index.html` 形式，保证搜索引擎和 AI 抓取时拿到独立页面正文。

首页锚点区块包括：

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

SEO 信息由 `app/src/data/pages.ts`、`app/src/data/site.ts`、`app/src/data/structured-data.ts` 和预渲染构建统一生成。

全站结构化数据包含：

- 基础 `WebSite`、`LocalBusiness`。
- 各页 `BreadcrumbList`。
- 产品页 `CollectionPage`、`ItemList`、对应分类 `Product`。
- 联系页 `ContactPage`。
- FAQ 页 `FAQPage`，只使用页面真实展示的问答。

`app/index.html` 保留基础模板信息：

- `lang="zh-CN"`。
- title、description、keywords。
- Open Graph 基础标签。
- 中文字体镜像预连接和字体样式表。
- Organization 结构化数据。

修改公司名称、电话、地址、业务范围时，要同步检查页面文案、`site.ts`、`pages.ts`、结构化数据、页脚、`README.md` 和本文件。

百度搜索资源平台当前状态：

- 2026-06-18 已完成 `aqztjx.top` 站点验证，验证文件为 `app/public/baidu_verify_codeva-hNgqSnR0KO.html`，线上访问地址为 `http://aqztjx.top/baidu_verify_codeva-hNgqSnR0KO.html`。
- 2026-06-18 已新增并上线 `app/public/sitemap.xml` 与 `app/public/robots.txt`，线上地址分别为 `http://aqztjx.top/sitemap.xml` 和 `http://aqztjx.top/robots.txt`。
- 百度普通收录已通过 API 成功提交 `http://aqztjx.top/`；`http://www.aqztjx.top/` 因未作为同一站点验证，百度返回 `not_same_site`，如需推送 `www` 需在百度搜索资源平台单独添加并验证 `www.aqztjx.top`。
- 百度普通收录已通过 API 成功提交 `http://aqztjx.top/sitemap.xml`；后台 sitemap 表单中可填写同一地址。
- 2026-06-18 已通过百度普通收录 API 成功提交 8 条正式多页 URL：首页、公司介绍、产品分类、三类设备详情、联系方式、常见问题。
- 百度推送接口 token、后台账号、短信验证码等信息不得写入前端代码、文档、测试、提交信息或公开仓库。

Bing / IndexNow 协作状态：

- DeepSeek 只用于生成公司、产品、FAQ 和外部平台简介等内容草稿；确认后的内容再写入项目。
- Codex 负责站点代码、结构化数据、sitemap、IndexNow 脚本和本地验证。
- 操作者负责登录 Bing Webmaster Tools、验证站点和查看后台数据。
- IndexNow 公开验证文件为 `app/public/b00aa3db8702439f8eab75fdb067f3c4.txt`；这是公开站点验证 key，不是账号凭据。
- 每次正式构建并发布后，可在 `app/` 目录运行 `D:\soft\npm.cmd run submit:indexnow:dry` 核对提交列表，再运行 `D:\soft\npm.cmd run submit:indexnow` 通知 Bing。
- Bing 后台账号、验证码、站长工具敏感截图、临时 token 不得写入前端代码、文档、测试、提交信息或公开仓库。

## 备案与上线维护

- ICP 备案号当前为 `鲁ICP备2026031639号`，展示位置在 `app/src/components/layout/Footer.tsx`，链接应指向 `https://beian.miit.gov.cn/#/Integrated/index`。
- 官网域名当前为 `aqztjx.top`，正式访问方式为阿里云 OSS 直连：`http://aqztjx.top/` 和 `http://www.aqztjx.top/`。
- 阿里云 OSS Bucket 为 `aqztjx-site`，区域为华北2（北京）`oss-cn-beijing`；静态网站托管默认首页和默认 404 页均为 `index.html`，错误文档响应码为 `200`。
- 当前正式多页 URL 使用 `.../index.html` 形式；不要把 canonical、sitemap 或站内导航改回目录斜杠形式，除非 OSS 静态网站规则已确认能让目录 URL 返回对应子页。
- 本机 OSS 发布凭据备忘：2026-06-18 已在 RAM 创建程序用户 `aqztjx-site-deploy`，自定义策略 `tpl-aqztjx-site-put-object`，资源范围 `acs:oss:*:*:aqztjx-site/*`，权限仅含 `oss:GetObject` 和 `oss:PutObject`，不含删除权限；当前 Windows 用户环境变量和 `C:\Users\TomatoLaser\.ossutilconfig` 已写入对应凭据，但仓库内不得记录 AccessKey ID、AccessKey Secret 或凭据文件内容。
- 当前 PATH 未检测到 `ossutil` 或 `ossutil64`；安装 ossutil 后，新开 PowerShell 并用 `ossutil ls oss://aqztjx-site` 验证凭据。
- 当前暂不开通 CDN，HTTPS 也暂未配置；不要把 `app/index.html` 的 canonical、Open Graph URL 和结构化数据 URL 改成 `https://`，除非 HTTPS 已在阿里云侧验证可用。
- 当前项目是纯静态官网，日常运行不需要 ECS、数据库或后端服务器。
- ICP 备案申请期间曾从阿里云租用一年期轻量应用服务器以满足备案需境内服务器的要求，备案通过后站点切回 OSS 静态托管；该轻量服务器仍在租期内但不再承载网站流量。
- 修改 ICP 备案号、公安备案号、域名、公司名称、电话、地址时，要同步检查页脚、`app/index.html`、`README.md` 和本文件。
- 公安联网备案已通过，当前公网安备号为 `鲁公网安备37078402000544号`，展示位置在 `app/src/components/layout/Footer.tsx`，链接应指向 `https://beian.mps.gov.cn/#/query/webSearch?code=37078402000544`。
- 公安备案页脚格式应保持备案图标在前、备案编号在右；备案图标资源位于 `app/public/images/beian-icon.png`。
- 公安备案数据码、短信验证码、后台登录凭据等临时操作信息不得写入前端代码、文档、测试、提交信息或公开仓库。
- 中国内地上线前后要确认域名已解析到阿里云中国内地服务器或静态托管资源，并人工检查备案链接可点击访问。
- 后续如访问量明显增长、需要 HTTPS、加速或防刷，再评估开通 CDN；开通前先确认计费方式，并配置费用/流量告警。

## 已知注意点

- `app/docs/code-review-report.md` 是历史报告，其中部分“待修复”内容在当前源码里已经处理，例如滚动锁、错误边界、测试、SEO、页脚年份等。不要直接照报告结论改代码，先读当前文件。
- `components/ui/` 下有大量 shadcn/ui 文件，删除前必须确认引用关系；同时受最高优先级删除规则限制，不能批量删除。
- `package.json` 中可能存在暂未使用的依赖或 UI 组件，做瘦身前需要逐项验证。
- `vite.config.ts` 设置了 `base: "/"`，嵌套静态页依赖根路径加载 CSS、JS 和图片；改动前要确认 OSS 发布方式。
- 构建输出 `dist` 和测试覆盖率 `coverage` 已在 ESLint 全局忽略中。
