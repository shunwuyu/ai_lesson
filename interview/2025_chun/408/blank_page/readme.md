# 前端性能优化——首页资源压缩63%、白屏时间缩短86%
https://juejin.cn/post/7188894691356573754?searchId=202504150910113892E0802D9F13C19C5A

- 前端性能优化最重要的环节是？
    提升首屏的加载速度

- 路由懒加载
    SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，当用户打开首页时，会一次性加载所有的资源，造成首页加载很慢，降低用户体验

    - 丛图中看到了什么？
        https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d79005fbea824d33a3e05edc120ff7a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?

        https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d833fe71f7414fa7a7b37558e00c9685~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?

        1175KB->274KB

        资源拆分

        https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e13a1bb60309409ba565050e38a606b0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?

        https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5ea8b068b7142ce92a04eb0b05843cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?

    - 路由懒加载的原理是？
        懒加载前提的实现：ES6的动态地加载模块——import()
        调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中

        将进行懒加载的子模块分离出来，打包成一个单独的文件

    - 组件懒加载
        除了路由的懒加载外，组件的懒加载在很多场景下也有重要的作用

        dialogInfo 弹框组件


https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee1df9e482c443ffb1daf276e09e79d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?
    当用户打开 home 页时，会一次性加载该页面所有的资源，我们期望的是用户触发按钮后，再加载该弹框组件的资源


    - const dialogInfo = () => import(/* webpackChunkName: "dialogInfo" */ '@/components/dialogInfo');
    home.js 和 about.js 中没有了弹框组件的代码，该组件被独立打包成 dialogInfo.js，当用户点击按钮时，才会去加载 dialogInfo.js 和 dialogInfo.css

    使用组件路由懒后，该项目的首页资源进一步减少约 11%

## ES6模块化与CommonJS之间的区别
    - 模块加载时机
CommonJS：采用的是动态加载的方式。这意味着在运行时才会确定依赖关系，也就是说只有当代码执行到require()语句时，才会去加载指定的模块。由于这种动态性，使得很难在编译阶段（即未执行代码之前）通过静态分析来确定哪些模块被使用或未被使用。
    - ES6 (ECMAScript 2015)：引入了import和export关键字，支持静态加载。这意味着模块的依赖关系可以在编译阶段就确定下来，因为导入和导出的关系是固定的，不依赖于任何运行时的行为。因此，编译器可以在构建过程的早期就了解整个项目中模块的依赖图。

    静态分析与Tree-Shaking
静态分析：由于ES6模块系统允许在编译时进行静态分析，工具可以识别出哪些代码实际上没有被使用，并将其移除。这个过程通常被称为“tree-shaking”，它可以帮助减少最终打包文件的大小，提高应用性能。
Tree-Shaking：这是基于ES6模块静态结构的一种优化技术，用于消除未使用的代码。由于CommonJS模块在运行时才解析依赖关系，所以传统的打包工具难以准确地识别哪些代码未被使用，从而限制了tree-shaking的有效性。