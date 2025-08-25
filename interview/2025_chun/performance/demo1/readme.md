# 渲染方面有没有考虑性能？

## 重绘重排

- 重绘
    当元素样式改变但不影响布局时，浏览器重新绘制元素的过程，如改变颜色、背景等属性。
- 重排
    DOM元素的尺寸、位置发生变化时，浏览器需要重新计算布局，影响其他元素位置的过程。

重排必定触发重绘， 重绘不一定重排, 重排的性能消耗比重绘大得多

- 批量修改DOM
```js
// 不好的做法
const el = document.getElementById('myEl');
el.style.width = '100px';
el.style.height = '100px';
el.style.margin = '10px';

// 好的做法
const el = document.getElementById('myEl');
el.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
// 或者使用 class
el.className = 'my-class';
```
- 使用文档片段
```
const fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    fragment.appendChild(el);
}
document.body.appendChild(fragment);
```
- 脱离文档流进行操作
```js
const el = document.getElementById('myEl');
// 1. 使用absolute
el.style.position = 'absolute';
// 2. 或者临时隐藏
el.style.display = 'none';

// 进行大量DOM操作

// 恢复
el.style.display = 'block';
```
- 缓存布局信息
```js
// 在循环的每次迭代中都访问 el.offsetTop。
// offsetTop 是一个访问器属性 (getter)
// 触发重排 (Reflow)：浏览器需要计算元素在页面上的精确位置
// 。这可能涉及到重新计算整个文档或部分文档的布局（包括该元素
// 及其祖先元素的尺寸、位置、CSS 样式等）。
// 不好的做法
// 重排是同步且耗时的：这个计算过程是同步阻塞的，会暂停 
// JavaScript 的执行，直到布局计算完成。
for (let i = 0; i < 100; i++) {
    el.style.top = el.offsetTop + 1 + 'px';
}

// 好的做法
// 只在循环外读取一次 el.offsetTop（可能触发 1 次重排）。
// 循环内部的所有计算 (top++) 都在 JavaScript 的内存变量 top 中进行，
// 不访问 DOM 的布局信息。
// 只有 el.style.top = ... 会修改 DOM 样式。
// ：浏览器可以将循环内 100 次的样式修改合并，可能只在循环
// 结束后进行一次重排（或更少），性能大幅提升。
let top = el.offsetTop;
for (let i = 0; i < 100; i++) {
    top++;
    el.style.top = top + 'px';
}
```
- 使用 transform 代替位置调整
```
// 触发重排
el.style.left = '100px';

// 只触发重绘，性能更好
el.style.transform = 'translateX(100px)';
```

## 资源加载优化
- 资源加载优化
    - 图片懒加载
    - 路由懒加载（代码分割）
    - 资源预加载（preload/prefetch）
    <link rel="dns-prefetch" href="//g.alicdn.com"/>  天猫
    该标签预解析DNS，提前解析指定域名，减少资源加载延迟，提高页面加载速度。
    ```js
    <head>
        <!-- preload：当前页面肯定会用到的资源，高优先级加载 -->
        <link rel="preload" href="/fonts/awesome.woff2" as="font" crossorigin>
        <link rel="preload" href="/critical.js" as="script">

        <!-- prefetch：未来可能会用到的资源，低优先级加载 -->
        <link rel="prefetch" href="/next-page.js">
        <link rel="prefetch" href="/non-critical-images/pic.jpg">
    </head>
    preload：当前页面必需资源，立即加载 字体文件、首屏CSS/JS、关键图片
    prefetch：未来可能用到的资源，空闲时加载 下一页资源、非首屏资源
    ```
    - 图片优化（webp格式、合适尺寸）
        36kr
    - 图标字体库

- JS执行优化
    - 防抖节流
    - Web Workers处理复杂计算
    - requestAnimationFrame优化动画
    - 虚拟列表处理大数据渲染
    - 避免长任务阻塞主线程 requestIdleCallback

- 框架层面优化
    - Vue：keep-alive缓存组件
    - React：memo/useMemo/useCallback避免不必要渲染
    - 合理使用key优化列表渲染
    - 按需加载组件和库 
        shadcn

- 缓存策略
    - 浏览器缓存
        强缓存和协商缓存
    - localStorage/sessionStorage合理使用

- 网络优化
    - CDN加速
    - Gzip压缩
    - HTTP/2多路复用 分片
    - DNS预解析

- 首屏优化
    - SSR/SSG
    - 关键CSS内联
    - 骨架屏
    - 首屏数据预取

- 监控和分析
    - Performance API监控性能指标
    ![](https://i-blog.csdnimg.cn/blog_migrate/89f58ddec5a910348a7992200a99b4d9.png)
    性能， 刷新， 性能分析
    这张图是使用 Chrome DevTools 的 Performance 面板生成的性能分析报告，用于评估网页加载和运行时的性能表现。它详细记录了页面在指定时间范围内的各种活动，包括 CPU 使用情况、网络请求、渲染过程等。
    优化建议：
    - 减少脚本执行时间：
    脚本执行（Scripting）占用了 796.2ms，这是主要的性能瓶颈之一。
    - 减少不必要的 JavaScript 代码，特别是那些在关键路径上的代码。
    - 将一些耗时的操作移到 Web Worker 中进行异步处理。
    - 使用懒加载技术，只在需要时加载和执行特定的脚本

    - 优化渲染和绘制过程：
        - 渲染（Rendering）和绘制（Painting）虽然占用的时间相对较少，但仍然有优化空间：
        - 减少 DOM 操作，避免频繁触发样式重算和布局重排。
        - 使用 CSS 动画代替 JavaScript 动画，利用 GPU 加速。
        - 对于复杂的界面元素，可以考虑使用 will-change 属性提前通知浏览器进行优化。
    - 提高资源加载效率：
        虽然图中没有直接展示网络请求的情况，但资源加载也是影响性能的重要因素：
        - 使用 HTTP/2 或 HTTP/3 协议，减少连接建立的时间开销。
        - 合理设置缓存策略，减少重复请求。
        - 对静态资源进行压缩和合并，减少传输的数据量。
    - 充分利用空闲时间：
        - 空闲时间（Idle）占用了 2203.3ms，可以考虑在这段时间内进行一些预加载或后台任务
        - 预加载用户可能需要的资源，如图片、字体等。
        - 在后台进行一些不紧急的计算任务，如数据分析、日志记录等。

    减少首屏JS/CSS体积，使用骨架屏优化FCP，避免大型DOM操作优化，使用transform代替位置调整，预加载关键资源
    - Lighthouse分析优化建议
    Lighthouse是Google开发的网站性能评估工具，可分析页面性能、可访问性、SEO等方面，并给出优化建议和具体分数。
    装插件， 给报告

