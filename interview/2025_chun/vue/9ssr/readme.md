[source](https://time.geekbang.org/column/article/476719)

SSR（Server Side Rendering），也就是服务端渲染。

- 解决啥问题
- CSR
  所有的路由和页面都是在客户端进行解析和渲染的，我们称之为 Client Side Rendering，简写为 CSR，也就是客户端渲染。
  SPA 交互体验确实提升了，但同时也带来了两个小问题。
  spa-demo
  1. 首屏加载时间长
  项目部署上线之后的入口文件，body 内部就是一个空的 div 标签，用户访问这个页面后，页面的首屏需要等待 JavaScript 加载和执行完毕才能看到，这样白屏时间肯定比 body 内部写页面标签的要长一些，尤其在客户端网络环境差的情况下，等待 JavaScript 下载和执行的白屏时间是很伤害用户体验的。
  2. SEO 不友好
  搜索引擎的爬虫抓取到你的页面数据后，发现 body 是空的，也会认为你这个页面是空的，这对于 SEO 是很不利的。

  我们就需要在用户访问页面的时候，能够把首屏渲染的 HTML 内容写入到 body 内部，也就是说我们需要在服务器端实现组件的渲染，

- vue-ssr

  @vue/server-renderer把Vue组件转成HTML，@vue/compiler-ssr在服务器上编译Vue组件，两者一起让网页更快显示内容。

