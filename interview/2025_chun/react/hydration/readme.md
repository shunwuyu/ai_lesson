# 水合Hydration  使其活化 

哪吒之魔童降世之吐泡泡的水怪

水合（Hydration）是将服务端渲染（SSR）生成的 HTML 与客户端 React 代码绑定，使页面具备交互能力的过程。

- 作用
    - 保留 SSR 的首屏加载快、SEO 友好；
    - 客户端接管静态 HTML，注入事件监听、状态、生命周期。
- 过程简述：
    - SSR 返回完整 HTML；
    - 客户端 React 使用 hydrateRoot 挂载到已有 DOM 上；
    - 对比结构，跳过 DOM 重建，仅补充事件绑定等逻辑。
- 与普通渲染区别：
    - hydrate 不会重新创建 DOM，而是复用 SSR 的结果；
    - 初始 render 会清空旧内容重新渲染。