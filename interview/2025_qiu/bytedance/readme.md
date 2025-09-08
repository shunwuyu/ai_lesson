## mcp

- context7
  Context7提供最新库的文档和代码片段，便于AI理解，提升在Cursor等编辑器中生成准确、现代化代码的效率，减少错误（老版本，废弃的API）。
  - cline 
    搜索context7
  - use context7  react useActionState的用途是什么？
  - demo
    创建一个next.js 项目
    给我一条mysql中创建post的sql , 不需要userId 字段， 使用 context7

- Firecrawl
    @firecrawl scrape https://www.cnblogs.com/ selector=#post_list article
    fields=title:.post-item-title a, summary:.post-item-summary, user:.post-item-author a, link:.post-item-title a[href]
    format=json
  

- finetune  demo3


## react 19 新特性

React 19 在 2024 年底发布，更新点挺多。最大的亮点是 Actions，配合 useActionState、useOptimistic 这几个新 hook，可以大大简化异步请求和表单提交的状态管理，比如 loading、错误处理、乐观更新都能自动搞定。然后是 use API，可以直接在组件里读取 Promise，结合 Suspense 写异步逻辑更自然。Ref 也有优化，现在不需要 forwardRef 就能作为普通 prop 传下去。除此之外，React 19 内置支持声明 <title>、<meta>、样式表、脚本这些资源，直接在组件里写就能被收集和优化，性能和 SEO 都更好。还改进了错误报告，支持 Web Components，并且有新的 React Compiler 自动优化渲染，减少对 useMemo、useCallback 的依赖。整体来说，React 19 更加现代化，开发体验也更顺滑。

- useActionState demo1
