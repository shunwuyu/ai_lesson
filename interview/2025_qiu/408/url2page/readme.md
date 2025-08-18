# 从输入 URL 到页面渲染

- 总览
    用户在地址栏输入 URL 回车后：浏览器进程发起导航 → 解析 DNS（ip地址） → 建立连接（TCP 三次握手、TLS 1RTT/0RTT）→ 发送 HTTP（S 浏览器发送加密的 HTTP 请求） 请求（可能命中缓存/CDN）→ 渲染进程接收 HTML 流并边下边解析，构建 DOM 与 CSSOM → 合成 Render Tree → 布局（reflow） → 绘制（repaint） → 合成（composite） → 首次内容绘制（FCP）/最大内容绘制（LCP）。期间脚本的加载与执行会阻塞解析或布局，样式计算与 JS 改动可能触发重排/重绘(JS 放到底部)。最终 GPU 进程合成帧并呈现。优化点贯穿：DNS/连接预热、缓存、资源优先级、关键渲染路径、避免主线程阻塞等。

-  浏览器多进程/多线程模型
    浏览器进程：调度 导航 UI
    网络进程：DNS、连接、缓存、HTTP/2/3 多路复用、证书校验（https）。
    GPU 进程：合成、栅格化。
    渲染进程（每站点实例 Site Isolation）

        主线程：HTML 解析、样式计算、布局、JS 执行、事件分发。

        合成线程（Compositor）：图层合成、滚动。

        栅格线程：把图层位图化。

        Web Worker/Worklet：后台计算/音频/布局/动画等。 
- 网络阶段：从 URL 到字节
    DNS 解析（可能被缓存跳过）
    顺序：浏览器缓存 → OS 缓存/hosts → 递归解析器→ 根/TLD/权威。

    （www 是主机名，baidu 是二级域，.com 是顶级域）
    根服务器（Root Server）—— 相当于“全球国家分拣中心”
     TLD 服务器（顶级域服务器）—— 相当于“中国省市区分拣中心”
     权威 DNS 服务器（Authoritative Server）
     最终答案的提供者，记录了域名和 IP 的真实映射。
    优化：<link rel="dns-prefetch" href="//cdn.example.com">

    - 建连（TCP 三次握手 & TLS）
    TCP 三次握手
    HTTP/2 多路复用同一连接
    优化：<link rel="preconnect" href="https://cdn.example.com" crossorigin>

    - HTTP 请求与缓存
    强缓存：Cache-Control: max-age, immutable；协商缓存：ETag/If-None-Match。


- HTML/CSS/JS：从字节到像素

    - HTML 解析（流式）
    解析器自顶向下构建 DOM；外链 <script>（无 defer/async）会阻塞解析。

    预加载扫描器会并行发现 <img> <link> <script> 等资源。
    - CSS 解析 → CSSOM
    CSS 下载与解析不会阻塞 HTML 解析，但会阻塞渲染（需要样式参与布局）。
    避免在首屏引入大量阻塞性 CSS。
    - 渲染树 / 布局 / 绘制 / 合成
    Style：把 CSS 应用于 DOM，计算出样式。
    Layout（重排）：计算几何（盒模型尺寸/位置）。
    Paint（重绘）：把边框、文字、背景绘制到图层。
    Compositing：合成线程把多个图层合成最终帧（GPU）。
        只改 transform/opacity 一般只触发合成，不走布局/重绘。
    
    盒模型 + BFC 理解 页面布局

- Script 加载与执行（阻塞与顺序

    加载策略
    defer：并行下载，HTML 解析完后按顺序执行（不阻塞解析，常用）。
    async：并行下载，下载完成立刻执行，可能打乱顺序。
    type="module"：默认 defer 语义 + ES Module 依赖解析；支持 preload 预热依赖。
    <script defer src="/app.js"></script>
    <!-- 第三方不依赖顺序 -->
    <script async src="https://www.googletagmanager.com/gtm.js"></script>

- 图片懒加载
    图片懒加载在页面渲染时延迟加载可视区外的图片，待滚动时再请求，节省带宽，提升首屏速度。
    只加载占位图

- EventLoop调度网络请求回调与定时器任务，按队列顺序执行，确保异步操作在主线程有序处理，不影响页面渲染流畅性。

- 页面加载后，WebWorker在后台线程运行耗时任务，不阻塞主线程，通过postMessage与主线程通信，确保页面渲染和交互流畅。

- 连接关闭
    


## 性能优化清单

- 连接层：preconnect/dns-prefetch；
- 关键渲染路径：内联首屏关键 CSS、defer 脚本、上移 CSS 下沉 JS、preload LCP 资源。
     LCP 是用户体验的核心指标。优化它能让用户更快看到主要内容，感觉页面“秒开”。
- 主线程：切片长任务（requestIdleCallback/scheduler.postTask）、Worker 计算。
- 渲染层：transform/opacity 动画 虚拟列表
- 资源：按需加载（动态 import）、代码分割、Tree Shaking、压缩（Terser/CSSTools）、图片自适应。
- 性能监控