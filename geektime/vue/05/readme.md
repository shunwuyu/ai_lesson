https://time.geekbang.org/column/article/431359

- npm init vite
Vite 是一个由 Vue 作者尤雨溪开发的现代化前端构建工具，它利用浏览器原生 ES 模块（ESM）实现极速的冷启动和热更新，大幅提升开发体验。

快速创建 Vite 项目脚手架的命令, 选择框架（如 Vue、React）和变体（如 TypeScript），就能得到一个基本的项目骨架。

geek-admin

- 目录的意义

```
.
├── README.md
├── index.html           入口文件
├── package.json
├── public               资源文件
│   └── favicon.ico
├── src                  源码
│   ├── App.vue          单文件组件
│   ├── assets
│   │   └── logo.png
│   ├── components   
│   │   └── HelloWorld.vue
│   └── main.js          入口
└── vite.config.js vite工程化配置文件
```

目录中的 index.html 是项目的入口；package.json 是管理项目依赖和配置的文件；public 目录放置静态资源，比如 logo 等图片；vite.config.js 就是和 Vite 相关所有工程化的配置；src 就是工作的重点，我们大部分的代码都会在 src 目录下管理和书写

- npm i ?
  pnpm i 

- npm run dev
  启动项目

- 热更新（HMR）
  HelloWorld -》 你好，极客时间
  浏览器不需要我们去刷新，首页大标题就自动更新了，这种热更新的开发体验会伴随我们整个项目开发，极大提高我们的开发效率。

  - 和响应式的区别
  响应式：作用：当组件中的数据（如变量、状态）发生变化时，依赖该数据的 DOM 会自动重新渲染。
        目的：让 UI 与数据保持同步，构建动态交互界面。
        发生时机：在开发和生产环境都有效。

  热更新（HMR）——开发阶段的工具能力
    发生时机：只在开发环境中生效。
    作用：当你修改了代码（比如改了一个组件的标题），Vite 会自动把变更的部分推送到浏览器，页面局部更新，不用手动刷新整个页面。
    目的：提升开发效率，保留当前应用状态。

## Vue 3 工程化体系的必备工具。
![](https://static001.geekbang.org/resource/image/97/eb/973ea8e35c177d252e4180c5bbfcc6eb.jpg?wh=1418x819)

- 工程化体系都是基于 Node.js 生态
  命令行运行 npm run dev  vite 
  打开浏览器 http://localhost:3000
  监听文件变化， hmr等
- 使用 VS Code+Volar 编辑器（插件， 强大的语法支持、智能提示、类型检查和代码导航） + 语法提示工具作为上层开发工具
- 使用 Vite 作为工程化工具
- 使用 Chrome 进行调试
  vue-devtool 插件

- vue-router 负责管理路由
  pnpm install vue-router@next 

- 开始
  - router 文件夹中，新建 index.js
  - createRouter 用来新建路由实例，createWebHashHistory 用来配置我们内部使用 hash 模式的路由，也就是 url 上会通过 # 来区分。
  - main.js 中，加载 router 的配置
  - router-link 和 router-view 就是由 vue-router 注册的全局组件
  - 组件的层级关系

- 一个多页面的 Vue 开发项目雏形就完成了，现在的页面架构变成了下面图示的这样：
  ![](https://static001.geekbang.org/resource/image/46/0a/465ae36094c1549b5804621f33cd370a.jpg?wh=1160x674)

  - style