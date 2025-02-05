https://juejin.cn/book/7294082310658326565/section/7314317070047395891

- Suspense 组件是和 React.lazy 结合用，用来加载一些异步组件。
  Aaa.tsx + App.tsx
  network 切换到3G 会看到 Aaa 组件加载

  import 是 webpack 提供的用来异步加载模块的 api
  不可能一下子把所有路由的组件都下载下来，所以会用 lazy + Suspense 的方式异步加载暂时用不到的路由对应的组件。

- React 的 ErrorBoundary 是一种特殊的组件，用于捕获并优雅地处理其子组件树中的错误，防止整个应用崩溃，并提供备用UI或错误信息。
  App4.tsx
    
- npm i react-error-boundary

- 抛出错误