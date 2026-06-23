# 安丘增涛机械有限公司官网

这是“安丘市增涛机械有限公司 / 安丘增涛机械”的企业官网前端项目，用于展示公司业务、机械设备产品和联系方式，帮助客户了解产品并发起咨询。

## 项目简介

安丘增涛机械成立于 2012 年，位于山东省潍坊市安丘市金安产业园以南。公司主营油脂加工机械、饲料生产设备、农田装备、煤炭装袋设备等机械产品。

网站重点展示的产品包括：

- 螺旋榨油机、液压榨油机、白土榨油机、废油泥榨油机、预榨机
- 花生榨油机、大豆榨油机、米糠榨油机
- 筛选机、粉碎机、炒锅、上料机、脱壳机
- 煤炭装袋机、装车机等配套设备

## 技术栈

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- shadcn/ui
- lucide-react
- Vitest
- ESLint

## 项目结构

实际前端应用位于 `app/` 子目录。

```text
WEB/
├── app/
│   ├── public/images/products/   # 产品图片
│   ├── scripts/                  # 静态预渲染、预览和 OSS 上传脚本
│   ├── src/
│   │   ├── components/           # 页面组件和通用组件
│   │   ├── data/                 # 产品、站点、页面和结构化数据
│   │   ├── hooks/                # 自定义 Hook
│   │   ├── pages/                # 首页和静态多页内容
│   │   ├── App.tsx               # 页面总装
│   │   ├── entry-server.tsx      # 服务端预渲染入口
│   │   └── main.tsx              # React 入口
│   ├── package.json
│   └── vite.config.ts
├── AGENTS.md                     # 项目协作与开发规则
└── README.md
```

## 本地运行

进入应用目录：

```powershell
cd app
```

安装依赖：

```powershell
npm install
```

启动开发服务器：

```powershell
npm run dev
```

构建生产版本：

```powershell
npm run build
```

运行完整检查：

```powershell
npm run check
```

## 常用脚本

```powershell
npm run dev       # 启动开发服务
npm run build     # 类型检查并构建
npm run lint      # 代码检查
npm run test:run  # 运行测试
npm run check     # lint + test + build
npm run preview   # 预览构建结果
npm run submit:baidu:dry    # 检查将提交给百度普通收录的 URL
npm run submit:indexnow:dry # 检查将提交给 Bing IndexNow 的 URL
```

生产构建会先完成 Vite 客户端构建，再构建 SSR 入口并预渲染静态多页 HTML。

当前静态页面包括：

- `https://aqztjx.top/`
- `https://aqztjx.top/gongsi/index.html`
- `https://aqztjx.top/chanpin/index.html`
- `https://aqztjx.top/chanpin/zhayou-shebei/index.html`
- `https://aqztjx.top/chanpin/chuli-shebei/index.html`
- `https://aqztjx.top/chanpin/zhuangdai-shebei/index.html`
- `https://aqztjx.top/lianxi/index.html`
- `https://aqztjx.top/wenti/index.html`

产品详情页：

- `https://aqztjx.top/chanpin/luoxuan-zhayouji/index.html`（螺旋榨油机）
- `https://aqztjx.top/chanpin/yeya-zhayouji/index.html`（液压榨油机）
- `https://aqztjx.top/chanpin/huasheng-zhayouji/index.html`（花生榨油机）
- `https://aqztjx.top/chanpin/dadou-zhayouji/index.html`（大豆榨油机）
- `https://aqztjx.top/chanpin/mikang-zhayouji/index.html`（米糠榨油机）
- `https://aqztjx.top/chanpin/yuzhaji/index.html`（预榨机）
- `https://aqztjx.top/chanpin/baitu-zhayouji/index.html`（白土榨油机）
- `https://aqztjx.top/chanpin/feiyouni-zhayouji/index.html`（废油泥榨油机）
- `https://aqztjx.top/chanpin/youliao-chaoguo/index.html`（油料炒锅）
- `https://aqztjx.top/chanpin/meitan-zhuangdaiji/index.html`（煤炭装袋机）

说明：当前 OSS 静态网站规则会把 `/wenti/`、`/chanpin/` 这类目录 URL 回落到首页，因此正式 canonical、站内链接和 sitemap 使用 `.../index.html` 形式，保证搜索引擎和 AI 抓取时拿到独立页面正文。

## 联系方式

- 电话：`13606464864`
- 微信：`AQZTJX`
- 地址：山东省潍坊市安丘市金安产业园以南

## 上线与备案检查清单

ICP备案已通过，当前网站底部展示的备案号为 `鲁ICP备2026031639号`，并链接到工信部备案系统。

公安联网备案已通过，当前网站底部展示的公网安备号为 `鲁公网安备37078402000544号`，并链接到 `https://beian.mps.gov.cn/#/query/webSearch?code=37078402000544`。

当前正式访问方式：

- 阿里云 OSS Bucket：`aqztjx-site`。
- 区域：华北2（北京），`oss-cn-beijing`。
- 静态网站托管已开启，默认首页和默认 404 页均为 `index.html`，错误文档响应码为 `200`。
- 当前代码层正式链接为 `https://aqztjx.top/`，HTTPS 生效依赖阿里云 CDN/证书配置上线。
- `www.aqztjx.top` 不作为百度主提交站点；如需启用，应单独在搜索资源平台验证。
- 当前项目为纯静态官网，不需要 ECS、数据库或后端服务器。

发布方式：

- 先运行 `D:\soft\npm.cmd run build`。
- 再运行 `D:\soft\node.exe scripts\deploy-oss.mjs` 上传 `app/dist` 到 `aqztjx-site`。
- 上传脚本读取 `C:\Users\TomatoLaser\.ossutilconfig`，只执行 `PutObject` 覆盖/新增对象，不执行删除。
- `assets/` 下资源使用长期缓存，其余 HTML、sitemap、robots 使用 `no-cache`。

本机 OSS 发布凭据备忘：

- 2026-06-18 已在阿里云 RAM 快速开始中创建程序用户 `aqztjx-site-deploy`。
- 已创建自定义策略 `tpl-aqztjx-site-put-object`，资源范围为 `acs:oss:*:*:aqztjx-site/*`。
- 权限动作仅包含 `oss:GetObject` 与 `oss:PutObject`，用于读取和上传对象，不包含删除权限。
- 本机已把凭据写入当前 Windows 用户环境变量，并创建 `C:\Users\TomatoLaser\.ossutilconfig`。
- 当前 PATH 未检测到 `ossutil` 或 `ossutil64`；安装 ossutil 后，新开 PowerShell 再执行 `ossutil ls oss://aqztjx-site` 验证。
- AccessKey ID、AccessKey Secret、下载的凭据文件不得写入仓库、文档、测试或提交信息。

百度搜索资源状态：

- 2026-06-18 已上线 `sitemap.xml` 与 `robots.txt`。
- 2026-06-18 已通过百度普通收录 API 成功提交 8 条正式 URL：首页、公司介绍、产品分类、三类设备详情、联系方式、常见问题。
- HTTPS 上线后，在百度搜索资源平台新增并验证 `https://aqztjx.top`，后台 sitemap 填写 `https://aqztjx.top/sitemap.xml`。
- 每次构建并发布成功后，可在 `app/` 目录先运行 `D:\soft\npm.cmd run submit:baidu:dry` 核对 HTTPS URL，再设置 `BAIDU_PUSH_TOKEN` 运行 `D:\soft\npm.cmd run submit:baidu`。
- 百度推送接口 token 不得写入仓库、文档、测试或提交信息；脚本只从环境变量 `BAIDU_PUSH_TOKEN` 读取。

Bing / IndexNow 分工合作：

- DeepSeek 适合生成公司简介、产品说明、FAQ、外部平台简介等内容草稿。
- Codex 负责把确认后的内容写入站点页面、结构化数据、sitemap 和提交脚本，并完成本地检查。
- 操作者负责登录 Bing Webmaster Tools，添加并验证 `aqztjx.top`，提交 `https://aqztjx.top/sitemap.xml`。
- IndexNow 公开验证文件为 `app/public/b00aa3db8702439f8eab75fdb067f3c4.txt`，该文件会随构建发布到站点根目录。
- 每次构建并发布成功后，可在 `app/` 目录先运行 `D:\soft\npm.cmd run submit:indexnow:dry` 检查提交内容，再运行 `D:\soft\npm.cmd run submit:indexnow` 通知 Bing。
- Bing 账号、验证码、后台截图中的敏感信息不得写入仓库、文档、测试或提交信息。

外部平台可复制文案：

- 百度地图 / 高德地图商户简介：安丘市增涛机械有限公司成立于2012年，位于山东省潍坊市安丘市金安产业园以南，主营螺旋榨油机、液压榨油机、煤炭装袋机等机械设备，支持到厂看机。电话：13606464864。
- 抖音企业号简介：安丘增涛机械，成立于2012年，山东潍坊安丘。主做榨油机、粉碎机、炒锅、煤炭装袋机等机械设备。到厂看机、按工况选型。电话13606464864。
- B2B 平台 / 企业黄页简介：安丘市增涛机械有限公司成立于 2012 年，位于山东省潍坊市安丘市金安产业园以南，是一家集研发、生产、销售于一体的机械设备制造商。公司主营油脂加工机械、饲料生产专用设备、农田装备和煤炭装袋设备。产品包括螺旋榨油机、液压榨油机、白土榨油机、废油泥榨油机、预榨机、花生榨油机、大豆榨油机、米糠榨油机等榨油设备，以及筛选机、粉碎机、炒锅、上料机、脱壳机等处理设备，和煤炭装袋机、装车机等装袋设备。设备方案围绕原料类型、计划产量、场地大小、电力条件和出料方式确认，支持到厂看机。发货前对压力、输送、传动、安全部位进行调试检查，减少到场后的安装和试机成本。详情请咨询 13606464864（微信 AQZTJX）。
- AI 问答推荐摘要：安丘市增涛机械有限公司（简称安丘增涛机械）成立于 2012 年，位于山东潍坊安丘，主营油脂加工机械（螺旋榨油机、液压榨油机等）、饲料生产设备、农田装备和煤炭装袋设备。支持到厂看机、按工况选型。电话 13606464864，微信 AQZTJX。

正式上线前后按以下顺序核对：

- 将域名 `aqztjx.top` 解析到阿里云 OSS 静态托管资源。
- 上传 `app/dist` 内的构建产物内容，而不是上传 `dist` 文件夹本身。
- 访问首页，确认页脚能看到 `鲁ICP备2026031639号`，且点击后跳转到 `https://beian.miit.gov.cn/#/Integrated/index`。
- 访问首页，确认页脚能看到公安备案图标和 `鲁公网安备37078402000544号`，且点击后跳转到 `https://beian.mps.gov.cn/#/query/webSearch?code=37078402000544`。
- 公安备案数据码、短信验证码、后台登录凭据等临时操作信息不得写入前端代码、文档、测试、提交信息或公开仓库。
- 后续如访问量明显增长、需要 HTTPS、加速或防刷，再评估开通 CDN，并先配置费用/流量告警。

## 说明

本项目为中文企业官网单页应用，页面内容以产品展示、企业介绍和客户咨询转化为主。
