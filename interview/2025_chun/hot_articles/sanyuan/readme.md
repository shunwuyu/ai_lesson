# (1.6w字)浏览器灵魂之问，请问你能接得住几个
[(1.6w字)浏览器灵魂之问，请问你能接得住几个](https://juejin.cn/post/6844904021308735502)

- 能不能实现图片懒加载
    - clientHeight、scrollTop 和 offsetTop
    clientHeight 元素内容区的可视高度（不包括滚动条、边框和外边距），单位像素。常用于获取元素当前可见区域的高度。

    scrollTop 元素内容顶部被卷起的距离（即滚动条向下滚动的像素值）。常用于获取或设置元素的垂直滚动位置。

    offsetTop 元素的上边界到最近的定位父元素（position 非 static）的上边界的距离，单位像素。常用于计算元素相对父容器的垂直位置。

    首先给图片一个占位资源

    <img src="default.jpg" data-src="http://www.xxx.com/target.jpg" />

    browser-demo/1.js

    - 方案二：getBoundingClientRect

    - IntersectionObserver
    实现了监听window的scroll事件、判断是否在视口中以及节流三大功能

    功能非常强大
    3.js

    IntersectionObserver 属于 HTML5 的 Web API
    属于宏任务

    MutationObserver 监听 DOM 变化
    ResizeObserver（监听元素尺寸变化）
    IntersectionObserver（监听元素可见性）

## 能不能实现事件的防抖和节流

- 节流
    节流的核心思想: 如果在定时器的时间范围内再次触发，则不予理睬，等当前定时器完成，才能启动下一个定时器任务。这就好比公交车，10 分钟一趟，10 分钟内有多少人在**公交站**等我不管，10 分钟一到我就要发车走人！
    例子重要
    4.js

- 防抖
    每次事件触发则删除原来的定时器，建立新的定时器。跟王者荣耀的回城功能类似，你反复触发回城功能，那么只认最后一次，从最后一次触发开始计时。

    5.js

- 双剑合璧——加强版节流
    它结合了节流的频率控制和防抖的最后一次触发保证，即：持续触发时每隔一段时间响应一次，同时在结束触发后还能再执行一次，用户体验更平滑。
6.js

## 谈谈你对重绘和回流的理解。
- 首先理解渲染流水线
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f080ba7fa706eb~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

- 渲染进程的主线程之外指的是？

渲染进程的主线程之外，指的是除了主线程外的其他线程，如合成线程、光栅化线程等，它们处理UI更新、图像渲染等任务，以提高性能和响应速度

- 图中分图块是啥意思
    图中分图块指的是将页面内容分割成多个图块，以便于并行处理和渲染，提高效率。

- 生成位图是什么意思
    生成位图是指将图像或图形对象转换为由像素组成的位图（Bitmap）图像的过程。

- 调用线程池 
    调用线程池在图中指的是利用预先创建的一组线程来处理任务，以提高效率和响应速度。

- 回流

    回流也叫重排

    DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生回流的过程

    - 一个 DOM 元素的几何属性变化，常见的几何属性有width、height、padding、margin、left、top、border 等等, 这个很好理解。
    - 使 DOM 节点发生增减或者移动。
    - 读写 offset族、scroll族和client族属性的时候，浏览器为了获取这些值，需要进行回流操作
    - 调用 window.getComputedStyle 方法。

- 回流过程
    如果 DOM 结构发生改变，则重新渲染 DOM 树，然后将后面的流程(包括主线程之外的任务)全部走一遍。
    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f0809e65b3d2fc~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

    将解析和合成的过程重新又走了一篇，开销是非常大的

    - 重绘
    当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致重绘(repaint)。

    由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，从而省去布局的过程。流程如下：

    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f080a26aa222d4~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

    跳过了生成布局树和建图层树的阶段，直接生成绘制列表，然后继续进行分块、生成位图等后面一系列操作。

    - 合成

    还有一种情况，是直接合成。比如利用 CSS3 的transform、opacity、filter这些属性就可以实现合成的效果，也就是大家常说的GPU加速。

    GPU加速的原因
在合成的情况下，会直接跳过布局和绘制流程，直接进入非主线程处理的部分，即直接交给合成线程处理。交给它处理有两大好处:


能够充分发挥GPU的优势。合成线程生成位图的过程中会调用线程池，并在其中使用GPU进行加速生成，而GPU 是擅长处理位图数据的。


没有占用主线程的资源，即使主线程卡住了，效果依然能够流畅地展示。


    - 最佳实战
    1. 避免频繁使用 style，而是采用修改class的方式。
    2. 使用createDocumentFragment进行批量的 DOM 操作。
    3. 对于 resize、scroll 等进行防抖/节流处理。
    4. 添加 will-change: tranform ，让渲染引擎为其单独实现一个图层，当这些变换发生时，仅仅只是利用合成线程去处理这些变换，而不牵扯到主线程，大大提高渲染效率。当然这个变化不限于tranform, 任何可以实现合成效果的 CSS 属性都能用will-change来声明。

    will-change 是一个 CSS 属性，用来提前告诉浏览器某个元素将来可能会发生变化，从而让浏览器提前为性能优化做准备。

    强制生成一个新的合成层（compositing layer）；

这个新合成层会在 GPU 中独立渲染，避免整个页面的重绘；

更适合做动画，会更流畅；

可能会多占用 GPU 显存，正如你看到 .bottom 是 39.1KB，.top 是 400B。

    7.html
    devtool 更多工具， 图层

## 从输入URL到页面呈现发生了什么

- 能不能说一说浏览器缓存
    缓存是性能优化中非常重要的一环
    - 强缓存
    - 协商缓存
    - 缓存位置

    - 强缓存
        不需要发送HTTP请求
        在HTTP/1.0和HTTP/1.1当中，这个字段是不一样的。在早期，也就是HTTP/1.0时期，使用的是Expires，而HTTP/1.1使用的是Cache-Control。

        - Expires
        Expires即过期时间，存在于服务端返回的响应头中，告诉浏览器在这个过期时间之前可以直接从缓存里面获取数据，无需再次请求。

        Expires: Wed, 22 Nov 2019 08:41:00 GMT

        表示资源在2019年11月22号8点41分过期，过期了就得向服务端发请求。

        是服务器的时间和浏览器的时间可能并不一致

    - Cache-Control
        它和Expires本质的不同在于它并没有采用具体的过期时间点这个方式，而是采用过期时长来控制缓存，对应的字段是max-age。

        - private： 这种情况就是只有浏览器能缓存了，中间的代理服务器不能缓存。
        - 
