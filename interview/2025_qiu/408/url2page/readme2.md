# 丛输入URL开始建立前端知识体系
[source](https://juejin.cn/post/6935232082482298911?searchId=20250820112146C80DD3D445A5085BA5BE)

- 浏览器主进程：只有一个，主要控制页面的创建、销毁、网络资源管理、下载等。
    整个浏览器的“总指挥”，它负责管理和协调其他所有进程。
- 第三方插件进程 Flash 不怎么用了， 不安全 性能
- GPU进程：最多一个，用于3D绘制等。
    GPU 进程是全局唯一的（最多一个），因为它负责与操作系统的 GPU 驱动和硬件直接交互。
    - 3D 图形渲染（如 WebGL）
    - 硬件加速的 2D 绘制（如 CSS 动画、Canvas）
    - 视频解码（部分情况下）
    - 页面合成（Compositing）以提升渲染性能
    - 渲染进程如何使用 GPU？
        - 每个渲染进程在需要 GPU 能力时（比如绘制一个 WebGL 画面），不会直接操作 GPU。
        - 而是通过IPC（进程间通信） 向 GPU 进程发送指令（如“画一个三角形”）。
        - GPU 进程接收命令，调用真正的 GPU 驱动执行，完成后返回结果。
    - 浏览器渲染进程(浏览器内核)：每个Tab页对应一个进程，互不影响。

- Renderer 进程生成 Bitmap，Browser 进程接收并最终将 Bitmap 绘制到用户界面上，整个过程通过共享内存和进程间通信机制实现高效的数据传输和显示。

- JS引擎线程和GUI 渲染线程 互斥的原因是什么？ 
    JS引擎线程和GUI渲染线程互斥，是因为JavaScript是单线程执行的，为避免操作DOM时发生冲突，确保数据一致性与渲染稳定性。

- xhr 和 fetch 请求是微任务还是宏任务
XMLHttpRequest（XHR）和 fetch 发起的网络请求本身是宏任务（macrotask），但它们的回调或响应处理在事件循环中的归类略有不同：

    XMLHttpRequest（XHR）
请求发送：宏任务（网络 I/O）
回调（如 onload、onreadystatechange）：
被当作宏任务，在网络响应完成后，被推入宏任务队列
📌 所以 XHR 的整个流程属于宏任务

    fetch
fetch 是基于 Promise 的 API
请求发送：宏任务（网络 I/O）
响应处理（.then、.catch）：
.then 回调是 Promise 的一部分，属于微任务（microtask）

## 输入网址并解析

### 输入网址并解析
我们只考虑输入的是一个URL 结构字符串，如果是非 URL 结构的字符串，则会用浏览器默认的搜索引擎搜索该字符串。

### URL的组成
URL 主要由 协议、主机、端口、路径、查询参数、锚点6部分组成！

### 解析URL
输入URL后，浏览器会解析出协议、主机、端口、路径等信息，并构造一个HTTP请求。

https://www.example.com:443/api/users?id=123

协议：https（默认使用 443 端口）
主机：www.example.com
端口：443
路径：/api/users?id=123
构造的 HTTP 请求行 为：
GET /api/users?id=123 HTTP/1.1

### 缓存
- 浏览器发送请求前，根据请求头的expires和cache-control判断是否命中（包括是否过期）强缓存策略，如果命中，直接从缓存获取资源，并不会发送请求。如果没有命中，则进入下一步。
    Cache-Control: max-age=3600
    Expires: Wed, 21 Aug 2025 09:30:00 GMT HTTP 1.0  存在于服务端返回的响应头中 缺点：服务器的时间和浏览器的时间可能并不一致导致失效
    1.png
    HTTP/1.1 Cache-Control:max-age=3600 响应头和请求头 时间最终还是会失效
    max-age=3153600 表示资源在缓存中有效 3,153,600 秒（即 365 天），浏览器在此期间内直接使用缓存，不向服务器发送请求。
    一年都不改？ 
    https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/cdn-retry/bundle-dcf007.js
    直接换文件名

    demo1

#### 强缓存

强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。强缓存又分为两种Expires和Cache-Control
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f5e26bfdb749e6a9e339dfac224fe1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

第一张：强缓存（Strong Cache）

流程说明：

用户请求资源。

判断本地是否存在缓存：

如果没有，直接向服务器请求，返回资源并存入缓存。

如果有缓存，继续判断缓存是否过期（通过 Expires 或 Cache-Control）：

未过期：直接从本地缓存读取，不发请求。

已过期：携带缓存标识（If-Modified-Since / If-None-Match）请求服务器。

服务器判断资源是否更新：

如果更新：返回最新资源（状态码 200），并更新缓存。

如果未更新：返回 304，继续使用本地缓存。

👉 特点：在缓存有效期内，浏览器不会与服务器通信，性能最好。


- 没有命中强缓存规则，浏览器会发送请求，根据请求头的If-Modified-Since和If-None-Match判断是否命中协商缓存，如果命中，直接从缓存获取资源。如果没有命中，则进入下一步。
    If-Modified-Since 服务器通过此头验证资源是否自该时间后被修改。
    If-Modified-Since: Wed, 21 Aug 2024 09:30:00 GMT 服务器修改也有时间戳

    If-None-Match  ETag 标识 304 hash值
    If-None-Match: "abc123xyz" 

- 如果前两步都没有命中，则直接从服务端获取资源。

## 协商缓存
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/
3ba010a1229f477b93e3432e5e8be509~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

流程说明：

用户请求资源。

判断本地是否存在缓存：

没有缓存：直接向服务器请求并缓存。

有缓存：继续判断是否过期。

如果缓存已过期，进入协商阶段：

判断是否有 Last-Modified：有则发送 If-Modified-Since 请求。

判断是否有 ETag：有则发送 If-None-Match 请求。

服务器校验资源是否更新：

未更新：返回 304，浏览器继续使用本地缓存。

已更新：返回 200 和新资源，并更新本地缓存。

👉 特点：协商缓存总是需要与服务器交互，由服务器决定是否使用缓存。


强缓存 vs 协商缓存的差异
对比项	强缓存	协商缓存
是否发请求	不发请求（缓存未过期时）	一定会发请求到服务器
判断依据	Expires、Cache-Control	Last-Modified、ETag
响应状态码	直接使用本地缓存，无状态码	200（更新资源）或 304（未更新）
性能	更快，节省请求开销	相对较慢，但能保证资源最新
适用场景	静态资源，变化少（如图片、字体）	更新频繁的资源（如接口数据）


第一组（基于时间验证）：

响应头：Last-Modified: Wed, 21 Aug 2024 09:30:00 GMT

请求头：If-Modified-Since: Wed, 21 Aug 2024 09:30:00 GMT

第二组（基于内容标识）：

响应头：ETag: "abc123"

请求头：If-None-Match: "abc123"

但是如果在本地打开缓存文件，就会造成 Last-Modified 被修改，所以在 HTTP / 1.1 出现了 ETag。

如果两种方式都支持的话，服务器会优先考虑ETag


## HTTPS
由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面。
当你的网站均采用 HTTPS，并符合它的安全规范，就可以申请加入 HSTS 列表，之后用户不加 HTTPS 协议再去访问你的网站，浏览器都会定向到 HTTPS。无论匹配到没有，都要开始 DNS 查询工作了。
HSTS 列表是浏览器预载的网站域名列表


## 存储位置
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e8553f944da4a4ea95333192a62f149~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- Memory Cache

内存中的缓存 主要包含的是当前中页面中已经抓取到的资源。
读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭Tab页面，内存中的缓存也就被释放了。

- Disk Cache
Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。

- Push Cache

你只要了一份“牛肉面”，但餐厅很聪明，提前把“筷子”和“餐巾纸”也一起打包送过来了，因为你每次吃面都肯定要用到它们。

这个“提前发过来”的机制，就是 HTTP/2 Server Push。

而浏览器收到这些提前推送的资源后，会放在一个特殊的缓存里，叫做 Push Cache（推送缓存）。
