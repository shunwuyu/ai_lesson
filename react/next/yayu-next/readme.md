# Next.js

Next 是 React 全栈框架, Nuxt 是 Vue 全栈框架，Nest 是后端框架。
Next.js 适合用来做全栈项目，在 Next.js 中既可以写页面，又可以写接口，一个项目全部搞定。

而且 Next.js 内置了各种方便开发的 API 和工具，所以要快速创建一个性能还不错的全栈项目，那就用 Next.js。

Nuxt.js 对标 Next.js，可以放在一起讲，但其实也没有什么放在一起讲的必要，这更多是技术选型问题，会 React 用 Next.js ，会 Vue 用 Nuxt.js。而 Nest.js 是纯后端框架，也就是用来纯写后端服务。简单来说，写全栈项目用 Next 和 Nuxt，纯写后端服务，用 Nest。三者解决的是不同的场景问题，根据自己的需要选择即可。

## 学习 Next.js 有前途吗？

A：目前 Next.js Npm 周均下载量 634W 左右，是国外主流的技术选型。React 首推的生产框架也是 Next.js。

而且 Next.js 背靠 Vercel, SEO 非常好， 很多AI产品都用Next.js 做官网。

## 创建项目

npx create-next-app@latest

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2fc0641cf1438cafdf1197b2f58771~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1098&h=320&s=611781&e=png&b=03090e)

## 运行项目

```
 "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
```
脚本命令有 dev、build、start、lint，分别对应开发、构建、运行、代码检查。

开发的时候使用 npm run dev。部署的时候先使用 npm run build 构建生产代码，再执行 npm run start 运行生产项目。运行 npm run lint 则会执行 ESLint 语法检查。

npm run dev


## App Router

路由（Router）是 Next.js 应用的重要组成部分。在 Next.js 中，路由决定了一个页面如何渲染或者一个请求该如何返回。

App Router 是默认的路由方案，一起来看看定义方式和常见的文件约定。

```
src/
└── app
    ├── page.js 
    ├── layout.js
    ├── template.js
    ├── loading.js
    ├── error.js
    └── not-found.js
    ├── about
    │   └── page.js
    └── more
        └── page.js
```

page.js 路由页面；layout.js 共享布局；template.js 每次挂载重渲染；loading 加载页；error 错误捕获；not‑found404；文件夹对应子路由。

举个例子，page.js 首页

```
// page.js
import React from 'react'
export default () => <h1>Hello world</h1>
```

about/page.js
```
// pages/about.js
import React from 'react'
export default () => <h1>About us</h1>
```

## 定义路由
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c35a76b0027c4e9fb5bc0d5807f479f4~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1600&h=594&s=339521&e=png&b=141414)

首先是定义路由，文件夹被用来定义路由。每个文件夹都代表一个对应到 URL 片段的路由片段。创建嵌套的路由，只需要创建嵌套的文件夹。举个例子，下图的 app/dashboard/settings目录对应的路由地址就是 /dashboard/settings：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40820ff4957244899288d7534bd4c525~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1600&h=687&s=314397&e=png&b=171717)

app/page.js 对应路由 /
app/dashboard/page.js 对应路由 /dashboard
app/dashboard/settings/page.js 对应路由/dashboard/settings
analytics 目录下因为没有 page.js 文件，所以没有对应的路由。这个文件可以被用于存放组件、样式表、图片或者其他文件。

app/page.js
```
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

## 定义布局（Layouts）

布局是指多个页面共享的 UI。在导航的时候，布局会保留状态、保持可交互性并且不会重新渲染，比如用来实现后台管理系统的侧边导航栏。

定义一个布局，你需要新建一个名为 layout.js的文件，该文件默认导出一个 React 组件，该组件应接收一个 children prop，chidren 表示子布局（如果有的话）或者子页面。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a7872449f6e4c6fb1808f518db7783f~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1600&h=606&s=295670&e=png&b=151515)

```
// app/dashboard/layout.js
export default function DashboardLayout({
  children,
}) {
  return (
    <section>
      <nav>nav</nav>
      {children}
    </section>
  )
}

```
```
// app/dashboard/page.js
export default function Page() {
  return <h1>Hello, Dashboard!</h1>
}

```
nav 来自于 app/dashboard/layout.js，Hello, Dashboard! 来自于 app/dashboard/page.js
你可以发现：同一文件夹下如果有 layout.js 和 page.js，page 会作为 children 参数传入 layout。换句话说，layout 会包裹同层级的 page。

app/dashboard/settings/page.js

```
// app/dashboard/settings/page.js
export default function Page() {
  return <h1>Hello, Settings!</h1>
}

```

其中，nav 来自于 app/dashboard/layout.js，Hello, Settings! 来自于 app/dashboard/settings/page.js

你可以发现：布局是支持嵌套的，app/dashboard/settings/page.js 会使用 app/layout.js 和 app/dashboard/layout.js 两个布局中的内容，不过因为我们没有在 app/layout.js 写入可以展示的内容，所以图中没有体现出来。

## 根布局（Root Layout）

app 目录必须包含根布局，也就是 app/layout.js 这个文件是必需的。
根布局必须包含 html 和 body标签，其他布局不能包含这些标签。如果你要更改这些标签，不推荐直接修改，参考《Metadata 篇》。
你可以使用路由组创建多个根布局。
默认根布局是服务端组件，且不能设置为客户端组件。

## 4.4. 定义模板（Templates）
它们在 App Router 里看起来很像，都是包裹子页面的，但关键区别在状态保持上。  
layout 切换子路由时组件实例不会销毁重建
template 像每次新建的壳， 每次路由切换都重新执行副作用

在 app目录下新建一个 template.js文件：
```
// app/template.js
export default function Template({ children }) {
  return <div>{children}</div>
}
```
你会发现，这用法跟布局一模一样。它们最大的区别就是状态的保持。如果同一目录下既有 template.js 也有 layout.js，最后的输出效果如下：
<Layout>
  {/* 模板需要给一个唯一的 key */}
  <Template key={routeParam}>{children}</Template>
</Layout>
也就是说 layout 会包裹 template，template 又会包裹 page。

某些情况下，模板会比布局更适合：
- 依赖于 useEffect 和 useState 的功能，比如记录页面访问数（维持状态就不会在路由切换时记录访问数了）、用户反馈表单（每次重新填写）等
- 转场动画

## dashboard/layout.js

```
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Layout({ children }) {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <Link href="/dashboard/about">About</Link>
        <br/>
        <Link href="/dashboard/settings">Settings</Link>
      </div>
      <h1>Layout {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      {children}
    </>
  )
}

```