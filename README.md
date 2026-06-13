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
│   ├── src/
│   │   ├── components/           # 页面组件和通用组件
│   │   ├── data/                 # 产品数据
│   │   ├── hooks/                # 自定义 Hook
│   │   ├── App.tsx               # 页面总装
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
```

## 联系方式

- 电话：`13606464864`
- 微信：`AQZTJX`
- 地址：山东省潍坊市安丘市金安产业园以南

## 上线与备案检查清单

ICP备案已通过，当前网站底部展示的备案号为 `鲁ICP备2026031639号`，并链接到工信部备案系统。

当前正式访问方式：

- 阿里云 OSS Bucket：`aqztjx-site`。
- 区域：华北2（北京），`oss-cn-beijing`。
- 静态网站托管已开启，默认首页和默认 404 页均为 `index.html`，错误文档响应码为 `200`。
- 当前正式链接为 `http://aqztjx.top/` 和 `http://www.aqztjx.top/`。
- 当前暂不开通 CDN，HTTPS 也暂未配置；对外不要使用 `https://` 链接。
- 当前项目为纯静态官网，不需要 ECS、数据库或后端服务器。

正式上线前后按以下顺序核对：

- 将域名 `aqztjx.top` 解析到阿里云 OSS 静态托管资源。
- 上传 `app/dist` 内的构建产物内容，而不是上传 `dist` 文件夹本身。
- 访问首页，确认页脚能看到 `鲁ICP备2026031639号`，且点击后跳转到 `https://beian.miit.gov.cn/#/Integrated/index`。
- 公安联网备案已提交，等待企业所在地网安部门审核；公安备案数据码属于临时操作凭据，不写入仓库文件。
- 公安备案通过并取得最终公网安备号后，再更新页脚展示公网安备号和对应链接。
- 后续如访问量明显增长、需要 HTTPS、加速或防刷，再评估开通 CDN，并先配置费用/流量告警。

## 说明

本项目为中文企业官网单页应用，页面内容以产品展示、企业介绍和客户咨询转化为主。
