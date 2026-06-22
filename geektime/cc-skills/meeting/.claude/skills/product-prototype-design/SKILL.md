---
name: product-prototype-design
description: "快速生成高保真的产品交互原型（单个独立 HTML 文件），适用于产品经理、创业者、设计师快速验证想法。当用户提到原型设计、产品原型、交互原型、demo 制作、产品 Mock、界面原型、H5 原型、产品页面设计、MVP 原型、 Landing Page、产品概念验证，或需要快速将产品想法可视化为可交互页面时，请使用此 skill。即使未明确提及'原型'，只要用户想快速做一个产品页面/界面/Demo，也应触发此 skill。"
---

# Product Prototype Design Skill

快速生成高保真的产品交互原型，通过 Mock 数据模拟真实业务流，验证 UI 布局与用户体验。交付物为单个独立 `.html` 文件，可直接在浏览器中打开交互。

## Core Philosophy

1. **Industry-Driven Design** — 每个行业有独特的视觉基因，严格遵循行业设计规范而非套用通用模板。
2. **High Fidelity** — 不是线框图，而是接近真实产品的交互原型，包含动效、状态切换、Mock 数据。
3. **Single File Delivery** — 所有样式、逻辑、数据内联于一个 HTML 文件，零依赖、零构建，直接浏览器打开。
4. **Show, Don't Tell** — 通过可交互的原型让用户直观感受产品，而非文字描述。

---

## Phase 1: Detect Mode

首先判断用户的输入情况：

**Mode A: 有明确行业信息**
- 用户描述了产品背景（如"外卖 App""银行理财页面""在线教育平台"）
- 直接推断行业，进入 Phase 2

**Mode B: 有产品描述但行业不明显**
- 用户描述了功能需求但无法确定行业
- 通过 AskUserQuestion 询问行业/应用场景

**Mode C: 仅有模糊想法**
- 用户只说了"帮我做个原型"之类的话
- 通过 AskUserQuestion 收集关键信息（行业、产品类型、核心功能、目标用户）

---

## Phase 2: Infer Industry

根据用户提供的背景信息，推断所处行业。当无法推断时，主动向用户询问。

常见行业关键词映射：
- 科技/互联网 → SaaS、工具类、平台、API、开发者、云计算
- 金融/银行 → 银行、理财、贷款、保险、支付、股票
- 电商/零售 → 商城、购物、商品、订单、促销、零售
- 餐饮/美食 → 外卖、餐厅、美食、菜单、点餐
- 医疗/健康 → 医院、诊所、健康、问诊、药品
- 教育/培训 → 课程、培训、学习、题库、考试
- 美妆/时尚 → 护肤、化妆品、穿搭、潮流
- 房地产/家居 → 楼盘、装修、家具、物业
- 游戏/娱乐 → 游戏、直播、短视频、音乐
- 汽车/工业 → 汽车、制造、工厂、设备
- 法律/咨询 → 律所、咨询、会计、审计
- 旅游/出行 → 酒店、机票、景区、出行、打车
- 公益/环保 → 环保、公益、慈善、碳中和
- 企业官网 → 公司官网、品牌展示、企业门户

---

## Phase 3: Select Visual Design

推断行业后，从 `references/industry-design-specs.md` 加载该行业的完整视觉规范。规范包含：

- **配色方案** — 主色调、辅助色、中性色
- **视觉风格** — 字体排版、容器与边角、交互动效、布局与空间

### Critical Design Constraints

这些约束适用于所有行业，不可违反：

1. **No Blue-Purple Gradients** — 严禁使用任何形式的蓝色到紫色渐变（如 `from-blue-500 to-purple-500`）
2. **No Default Tailwind Blue** — 避免直接使用 `blue-500` 作为主色，根据行业规范选择合适的色调
3. **No Generic AI Aesthetics** — 拒绝千篇一律的渐变背景 + 居中标题 + 三列卡片的 AI 风格布局
4. **Industry Consistency** — 每个设计决策都应能追溯到行业规范，而非随意选择

---

## Phase 4: Create Prototype

### 技术栈

- **HTML5** — 语义化标签
- **TailwindCSS** — 通过 CDN 引入，Utility-First
- **Vanilla JavaScript (ES6+)** — 交互逻辑
- **Lucide Icons** — 通过 CDN 引入图标库
- **Mock Data** — 内联 JavaScript 数组/对象，模拟真实业务数据

### CDN Dependencies

在 HTML `<head>` 中引入：

```html
<!-- TailwindCSS -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<!-- Google Fonts (按行业需求选择) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Prototype Structure

原型 HTML 文件应包含以下标准结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[产品名称] - 原型</title>
    <!-- CDN Dependencies -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: { /* 行业主色调 */ },
                        secondary: { /* 行业辅助色 */ },
                    },
                    fontFamily: {
                        sans: ['Noto Sans SC', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        /* 自定义动画、滚动条、行业特殊样式 */
    </style>
</head>
<body>
    <!-- 页面内容 -->
    <script>
        // Mock 数据
        // 交互逻辑
        // Lucide Icons 初始化: lucide.createIcons()
    </script>
</body>
</html>
```

### Design Quality Checklist

每个原型交付前，检查以下要素：

- [ ] **行业一致性** — 配色、字体、圆角、阴影均符合行业规范
- [ ] **交互完整性** — 关键路径（核心业务流）可完整走通
- [ ] **Mock 数据真实感** — 数据内容贴合行业场景，非 Lorem Ipsum
- [ ] **状态覆盖** — 包含空状态、加载状态、成功/失败反馈
- [ ] **响应式** — 至少在移动端和桌面端可用
- [ ] **微交互** — 按钮悬停、页面切换、列表加载等有适当的动效反馈
- [ ] **视觉层次** — 信息层级清晰，用户能快速理解页面结构
- [ ] **无蓝紫渐变** — 检查确认无 `from-blue-* to-purple-*` 类

---

## Phase 5: Output & Iterate

1. 将生成的 `.html` 文件保存到用户指定目录（默认为项目根目录）
2. 使用 pinme-deploy skill 部署生成的`.html` 文件
3. 告知部署后的网址，可直接在浏览器中打开
4. 询问用户是否需要调整：
   - 整体风格方向
   - 具体页面的布局
   - 交互细节
   - 新增页面或功能模块
