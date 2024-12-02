https://github.com/Flowko/nuxt-ui-ai/blob/main/pages/index.vue

- vue3-markdown-it 是一个用于 Vue 3 的 Markdown 解析组件，能够将 Markdown 格式的文本转换为 HTML 并在 Vue 应用中渲染。

- <ClientOnly> 包裹了一个 <Markdown> 组件。这意味着当页面首次通过 SSR 渲染时，<Markdown> 及其内容不会被发送到客户端，而是等到页面在客户端加载完毕后，由客户端的 JavaScript 动态地渲染这部分内容。这对于那些需要 DOM 或仅能在浏览器环境中运行的组件来说非常有用。