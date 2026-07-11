---
name: 安丘增涛机械官网
description: 以真实设备与工况说明推动机械设备选型咨询的中文企业官网
colors:
  forge-black: "#171510"
  forge-dark: "#2e2a25"
  forge-orange: "#a5431d"
  forge-paper: "#efece6"
  forge-surface: "#faf7f2"
  forge-text: "#211d18"
  forge-muted: "#68605a"
typography:
  display:
    fontFamily: "Noto Serif SC, Source Han Serif SC, SimSun, Georgia, serif"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  standard: "6px"
spacing:
  compact: "16px"
  standard: "24px"
  section: "clamp(64px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.forge-orange}"
    textColor: "{colors.forge-paper}"
    rounded: "{rounded.standard}"
    height: "48px"
---

# Design System: 安丘增涛机械官网

## Overview

**Creative North Star: "工厂现场的设备目录"**

页面以暖锻造色、真实设备实拍和硬朗的留白组织信息。它必须像采购者在现场翻阅的设备资料，而不是模板化营销页。信息先说明工况，再给产品，再给咨询入口。

**Key Characteristics:**

- 真实产品图优先于装饰图形。
- 深暖文字与米白纸面建立目录感，深橙只用于可读的强调与行动。
- 动画克制，静态内容在无 JavaScript 时也完整可读。

## Colors

深橙是可读、可操作的强调色，不能同时承担浅底正文和高亮背景上的正文。

### Primary

- **炉火深橙**：用于 CTA、焦点和浅底强调文字。

### Neutral

- **锻炉黑、暖纸、浅表面、深暖文字**：用于页面层次、正文和机械感边界。

**The Contrast Rule.** 普通文字必须达到 WCAG AA，对比不足的橙色只能用于图标、线条或大字号展示。

## Typography

**Display Font:** Noto Serif SC
**Body Font:** Noto Sans SC
**Label/Mono Font:** JetBrains Mono，仅用于电话号码、编号和设备参数。

标题承担机械目录的重量感，正文保持 65 到 75ch 的可读行长。中文正文不使用全大写或无意义英文标签。

## Elevation

默认使用边框、底色和明确的层级，而非玻璃卡片。阴影只用于 Hero 设备图或有明确空间关系的浮层。

## Components

### Buttons

- **Shape:** 小圆角（6px），最小高度 48px。
- **Primary:** 深橙背景、暖纸文字，必须保持可读对比度。
- **Focus:** 使用清晰的 2px 焦点环，不依赖 hover。

### Cards / Containers

- **Corner Style:** 小圆角或直角，保持设备目录的硬朗感。
- **Background:** 暖纸和浅表面交替，不连续堆叠同构图标卡片。

### Navigation

- 固定导航必须保留清晰背景和可见焦点；移动菜单是模态交互，需管理焦点和 Escape。

## Do's and Don'ts

### Do:

- **Do** 用真实设备实拍、工况和选型要点支撑页面。
- **Do** 让每个产品详情与电话咨询路径明确可达。
- **Do** 为动画提供减少动态偏好和静态回退。

### Don't:

- **Don't** 使用英雄指标模板、渐变文字、玻璃拟态或大面积无意义英文。
- **Don't** 用未经核验的性能、认证或绝对化宣传换取转化。
- **Don't** 使用对比不足的橙色小字号文字。
