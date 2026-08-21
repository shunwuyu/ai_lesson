# Next.js

强大的React 全栈开发框架。

## 什么是框架? Framework

想像成为一个建筑蓝图/工具箱， 不需要从0 开始盖房子。
而是提供了地基、墙壁和屋顶的一个基本架构。

你只需要关注组装和装修这个房子。

不使用框架： 散乱的积木和工具
- 图片放哪里？
- 页面文件放哪里？
- 组件放哪里？
- 第三方库怎么引入？

使用框架：预制的乐高积木
提供了一系列约束最佳实践。

开发效率大大提高，常见功能内置好了， 文件该放哪？请求方法放哪？
框架提供基础结构， 开发者专注于业务逻辑。

使用框架， 也是给AI 的一套约束，一套上下文。 AI能够更加高效的根据
框架给的约束去开发项目。

## 为什么选择Next.js?

Next.js 是Ai最友好， codex 支持效果最好的一套开发框架。

提供了AI 友好性， 优化开发体验、简化数据获取， API Routes, 开箱即用的功能，
前端、后端多种渲染方式。

Next.js 就是我们Web开发最应该学习的一门框架。

它的生态超级丰富。

- shadcn/ui 
https://ui.shadcn.com/
提供了一系列非常好看的一个UI组件。

- tailwindcss
https://tailwindcss.com/ 搜template
提供了很多模版， ai 中可以直接用
全都是基于react/nextjs 

- vercel 公司开发
提供了部署的最简单方法
https://vercel.com/
只需要上传代码， 什么都不用管， 就能部署，还有域名。也可以
绑定自己的域名

## Nextjs 和 React 关系

react 是前端库， 它的核心是组件系统以及状态管理。
next.js 是一个框架，基于React去封装，路由，渲染，API， 优化
React是引擎， Next.js 是完整的汽车。

## 创建项目

npx create-next-app@latest
my-app 
ts eslint no  tailwindcss 
npm run dev

- page.tsx
网站的首页， 
- layout.tsx
这是一个特殊的组件
定义了整个页面的一个应用的布局
放置一些全站共享的元素
导航栏头部 title meta
页脚
global.css 全局的样式文件

### 1. 文件系统的路由映射
```
帮我创建一个about 页面，讲next.js 
```
about/page.tsx

创建的方式

文件命名
  page.tsx 页面路由
  layout.tsx 定义共享的
  loading.tsx 加载UI
  error.tsx 错误UI
  not-found.tsx 404

- 新建一个not-found.tsx 
```
帮我写一个404页面
```
### 2. 目录映射 目录名直接映射到URL路径

/blog/page.tsx
```
给我创建一个blog 显示页面， 可以显示两篇blog的卡片
```
点击子页面 404
[slug]/page.tsx  短标识符
```
完成点击两篇文章的页面，用slug mock 数据渲染文章。
```
```
帮我在 layout.tsx 顶部导航栏加上 about 和 blog 的链接。
```
Link组件有什么好处?
- 它是客户端导航的， 无需刷新页面(前端路由)
还是要请求后端的，只是 不走整页刷新 。前端导航时 Next.js 会自动发一个叫 RSC payload（React Server Component 序列化数据）的请求给后端，拿到数据后在前端拼装渲染，浏览器不白屏刷新。所以数据还是从后端拿的，只是走的是 AJAX 式请求，不是浏览器传统的整页导航。
- 预加载可连接的页面， 提升速度
  <link rel="prefetch" href="/blog" />
  浏览器空闲时就会提前下载目标页的 JS/数据，等用户真正点击时直接用缓存，体验就是"秒开"。
  <link data-n-head="ssr" rel="dns-prefetch" href="//unpkg.byted-static.com">
  dns 
  DNS 是互联网的"电话簿"：你输入域名（如 google.com），它帮你翻译成服务器的 IP 地址，浏览器才能找到对应的服务器。

### public 静态资源
图片、字体、图标
直接访问 /   静态服务器
静态服务器就是个"文件投递员"：你请求什么路径，它就把对应的文件（HTML/CSS/JS/图片）原样发给你，不做任何动态处理。
images
fonts
nest/image 特殊组件
比img 优势， 自动优化图像大小， 给width 或 height 其中一个，它会自动按原图比例算出另一个，防止图片拉伸变形。
同时还会自动懒加载（进入视口才加载） 、  转 WebP 格式

https://36kr.com/ 
Agent

思考过程

DNS 是互联网的"电话簿"：你输入域名（如 google.com），它帮你翻译成服务器的 IP 地址，浏览器才能找到对应的服务器。

10:44
shunwuyu

帮我在 layout.tsx 顶部导航栏加上 about 和 blog 的链接。移除页脚导航。

Agent

思考过程

layout.tsx
next/hui/my-app/app/layout.tsx

+ 8 - 5

查看变更

Thought

已改好。页脚移除，顶部加了导航栏，包含首页、关于、博客三个链接。

10:58
shunwuyu

一句话解释静态服务器

Agent

思考过程

静态服务器就是个"文件投递员"：你请求什么路径，它就把对应的文件（HTML/CSS/JS/图片）原样发给你，不做任何动态处理。

11:00
shunwuyu

readme.md 125-126 是等比例的意思？

Agent

思考过程

对， next/image 有个重要特性：如果你只给 width 或 height 其中一个，它会自动按原图比例算出另一个，防止图片拉伸变形。同时还会自动懒加载、转 WebP 格式、防止布局抖动（CLS）。

11:03
shunwuyu

60字介绍webp 格式 及好处

Agent

思考过程

WebP 是 Google 推出的图片格式，同样画质下体积比 JPEG 小 25%-34%，支持透明和动画。网页加载更快、省流量，是现代 Web 图片首选。

### 组件 UI开发

ke可重复， 独立的代码片段， 用于构建用户的界面。
我们只需要封装， 拼接不同的一个组件， 就可以完成一个又一个的页面。

小红书案例

红线框起来的地方都是组件
logo 组件 
侧边栏 menu组件 和 4个 menuitem 组件
和消息提醒Badge组件

可以封装和嵌套的

搜索组件， 这是一个顶部导航栏的组件。
这是一个tab 组件， 子组件是一个个的按钮组件
小红书的卡片组件（图片， 标题， 作者，点赞数 props）
卡片循环就可以形成这个页面了。

点击进入一个卡片页面后，可以看到弹框是一个Modal组件
这里的各个评论是 评论组件

组件的复用。 评论中作者的头像和和卡片中的作者的头像和名字一样的。

封装成同一个组件， 在不同页面使用，

```
export default Button({text, onClick, color='blue'}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rouned text-white bg-${color}-500 hover:bg-${color}-600`}
    >
    {text}
    </button>
  )
}
```

组件的好处
- 可复用性
- 可维护性  修改组件会影响所有使用它的页面样式
- 关注点分离 每个组件专注于特定功能
- 团队协作 不同开发者可以处理不同组件
- 测试简化 可以单独测试每个组件

### 服务端组件和客户端组件
- 服务端组件
  - 在服务器上渲染， 将HTML发送给浏览器
  - 不包含任何JS 交互代码
  - 可以直接访问服务器资源
  - 不能使用浏览器API, 事件处理器或React Hooks

```
 请你把博客卡片封装成服务端组件，并且通过获取服务端mock数据的方式， 获取博客列表。组件放到src/components目录下。 

 components 目录结构
  基础UI组件
 ui/Button.jsx
  Input.jsx
  Card.jsx 
布局相关组件
layout/
  NavBar.jsx
  Footer.jsx
功能相关的组件
features/
  ProductList.jsx
  ConcatForm.jsx
如果是特殊页面下的组件
也可以放到 页面目录中
app/dashboard
  / page.tsx
  / components
    / DashboardStats.jsx
    / ActivityFeed.jsx

```

讲下组件和修改
- 客户端组件
'use client';
- 在浏览器端运行
- 可以使用状态、效果和浏览器API
- 支持交互性和事件处理
- 增加客户端JS包的大小

## 现代UI组件库
shadcn/ui
非常多好看组件， 直接可以使用


https://ui.shadcn.com/docs/installation/next
pnpm dlx shadcn@latest add card

```
请使用shadcn/ui的按钮组件去替换所有的按钮
请使用shadcn/ui的按钮组件在 #src/components/BlogCard.tsx中添加 阅读更多组件。
```

现在让我们更新BlogCard组件， 使用shadcn的Card组件， 首先需要安装Card组件。

请添加一个图片属性， 使用开源图片库的图片， 并在 组件最顶部显示。

