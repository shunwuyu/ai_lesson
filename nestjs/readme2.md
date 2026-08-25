- npx create-next-app@latest
- ```帮我创建一个about页面, 将next.js ```
- 在app 下创建一个not-found.tsx
  ```
  帮我写一个404页面
  ```
  访问一个不存在的路由
- 创建一个blog
    page.tsx
  ```
  帮我创建一个blog 显示页面， 可以显示2篇blog的卡片。
  ```
  点击404， 没有子页面
  [slug]
    page.tsx
  ```
  #[slug]/page.tsx 完成点击进入2篇文章的页面， mock 数据渲染文章。
  ```
  `[id]`靠数字 / 唯一编号定位资源；`[slug]`靠可读英文别名定位资源，slug 是给人看的，id 是给程序用的。

```
 帮我把mock数据抽离到lib 目录下， 安装markdown 格式渲染插件， 支持markdown 渲染
```

-  ```
layout.tsx 在layout布局中添加首页、about和blog页面的导航， 并且移除 page.tsx 底部的所有导航。
```

- ```
请你将博客卡片封装成服务器组件，并且通过获取服务端mock 数据的方式获取博客列表。 组件放到/components 目录下。
```
- shadcn
把重复琐碎的界面工作封装，让开发者把精力放在业务，而不是反复写基础界面。 UI 组件的作用
shadcn/ui 并非 npm 包，通过 CLI 把组件源码拷入项目。开发者拥有完整源码可随意修改，摆脱第三方库版本束缚，大幅降低定制成本，是现代 React 项目构建设计系统的高效起点。
```
pnpm dlx shadcn@latest add button
```
```
#BlogCard.tsx 请使用shadcn的按钮组件去替换阅读更多, 按钮组件已经安装 #button.tsx, 无需重复安装。
```
#BlogCard.tsx 请你也是用shadcn 的card 组件，请你安装
- ```
帮我在 @lib/blog.ts  @app/blog/page.tsx         
  中文章卡片顶部添加一张图片,                     
  使用开源图片库的图片
```

- ```
帮我将 @app/blog/page.tsx                           
  里的两篇文章添加到10篇, @lib/blog.ts
```

Image是 Next 内置的图片优化组件，替代原生 `<img>`，解决图片性能问题。

- 默认懒加载
- ✅ 自动多分辨率 srcSet
- ✅ 自动图片格式转 webp/avif
- ✅ 防止布局偏移 CLS
  

## 后端能力

全栈开发的优势：
 
- 技术栈统一：前后端使用同一种语言，减少上下文切换成本
- 代码共享：类型定 验证逻辑等可以在前后端共享
- 开发效率提升：一个项目同时处理前端和后端，工作流更流畅
- 部署简化：单一应用包包含前端和后端，简化部署流程
- 性能优化：服务器组件和流式渲染提供更好的用户体验
- 更好的SEO：服务器渲染提供搜索引擎可读的完整HTML
 
Next.js打破了传统前后端分离的壁垒，让全栈开发变得更加直观和高效。

- 手写 api/hello/route.ts
```
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "hello, next.js" });
}
```
```
async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/hello`,
    {
      // 关闭缓存，每次访问页面，都重新发起网络请求拿最新数据
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center">
        <h1 className="text-4xl font-bold">{data.message}</h1>
      </main>
    </div>
  );
}
```
### 客户端组件获取
swr
SWR 是 Next 团队的 React 数据请求库，客户端组件用它做数据获取，自带缓存、重新验证、聚焦刷新、轮询，用来解决客户端接口状态、loading、更新的问题。

## 部署next.js 

6. 部署全栈项目
 
1. Vercel平台简介
 
Vercel是部署Next.js应用的最佳平台，由Next.js创建者开发，提供了一系列针对Next.js优化的功能：
 
- 零配置部署：自动识别Next.js项目并优化部署
- 全球CDN网络：提供快速的内容分发
- Serverless函数：自动处理API Routes
- 预览部署：每个PR自动创建预览环境
- GitHub集成：自动部署代码更新
- 免费额度：Hobby模式是免费的
 
作为全栈应用的部署平台，Vercel能够同时处理前端界面和后端API，无需额外配置服务器。
cdn 内容分发网络

你在 中国 打开部署在 Vercel 的网站 → 从 香港/新加坡 节点取文件
你在 美国 打开 → 从 纽约/圣何塞 节点取文件
体验上就是： 全世界任何地方打开都飞快 


- 登录vercel 
- github 远程仓库
  创建远程创库
  hellonextjs-tutorial

  源代码管理：
  feat: init project and deploy

  这是 Git 提交信息：新增功能：初始化项目并完成部署，搭建基础工程，完成环境配置，实现项目初步上线发布。

  git 图标， 输入上面的内容
  feat是feature 的意思

  复制粘帖

  引入就好