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
// 不好的做法
for (let i = 0; i < 100; i++) {
    el.style.top = el.offsetTop + 1 + 'px';
}

// 好的做法
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

- 缓存策略
    - 浏览器缓存
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
    优化建议：
    减少首屏JS/CSS体积，使用骨架屏优化FCP，避免大型DOM操作优化，使用transform代替位置调整，预加载关键资源
    - Lighthouse分析优化建议
    Lighthouse是Google开发的网站性能评估工具，可分析页面性能、可访问性、SEO等方面，并给出优化建议和具体分数。
    装插件， 给报告

