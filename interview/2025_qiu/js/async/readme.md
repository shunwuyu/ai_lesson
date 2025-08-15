# 异步 async sync 同步

- 同步和异步的理解
    举个例子 read_file

    阻塞执行，直到文件读完才继续。

- 表达
    JavaScript中，同步是按顺序执行，阻塞后续代码；异步则不阻塞，通过回调、Promise等机制在任务完成后通知，适合I/O操作。JS引擎基于事件循环实现异步，确保主线程流畅，提升性能与响应性。

- JavaScript 主流异步编程方式：
    - 回调函数（Callback）
        回调地狱 可读性差，错误处理不统一。
    - 事件监听 / 发布订阅（EventEmitter、DOM 事件）
        手写 
    - Promise
        then 链式调用
        好处是避免深层回调，支持错误链式捕获。
        在业务中我会用 Promise.all 并发多个请求，
        比如个人中心页同时加载「用户资料」和「最近订单列表」，减少总耗时，提升页面响应速度。
    - Generator + co 库
        genco
    - async/await
        语法糖
    - Web Worker
    - 流式API 

- 底层原理
    - JS 单线程，异步依赖 事件循环（Event Loop） 来调度任务
    - 宏任务（MacroTask）：script、setTimeout、setInterval、I/O 回调
    - 微任务（MicroTask）：Promise.then、MutationObserver、queueMicrotask
    - async/await 只是 Promise 的语法糖，底层依然基于微任务调度
    - Node.js 有自己的事件循环阶段（Timers → I/O callbacks → idle → poll → check → close callbacks）