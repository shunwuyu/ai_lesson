[source](https://juejin.cn/post/6844903890278694919)

- 传统多页面
  ![](https://raw.githubusercontent.com/chenqf/frontEndBlog/master/images/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1/1.png)

  单独页面 会重刷， 页面白一下

- SPA demo
  - 热更新一部分
  只有一个 HTML 页面，且与用户交互时不刷新和跳转页面的同时，为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和SEO时均通过这个特殊的 url 来实现。
  - a -> link
  改变 url 且不让浏览器像服务器发送请求。
  - 可以监听到 url 的变化
  改变url 后， 去取数据
  
- hash
  - 基本的例子 3.html 
  - hash.html 手写
  

