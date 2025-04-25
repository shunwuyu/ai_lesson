# suspense 

- 解决异步加载组件或数据时的“加载状态管理问题”而提出的解决方案。
- 原理 组件 throw 一个 Promise，React 捕获它并触发 fallback
- 提升用户体验（异步加载时）
    Suspense 的本质是在等待某个组件“就绪”之前，先显示一个 fallback UI（比如加载动画），等到资源加载完毕再显示真实组件。
    懒加载组件（React.lazy  demo1
    结合数据请求的 Suspense
    demo2
- 代码分割
    npm run build
- 数据预加载