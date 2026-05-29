# 红绿灯

- sleep 模拟“休眠“
    返回一个延迟指定毫秒数后才 resolve 的 Promise

- async/await 无限循环（最直观）
    1.js
- 递归 Promise 链（经典面试写法，无 while(true)）
    2.js
- gen
    3.js 
    js/genco
- AbortController
    AbortController 是 Web API 提供的一个接口，用于控制一个或多个异步操作的生命周期，最常见的是用于取消（abort）一个正在进行的异步任务，比如：

    - 取消一个 fetch 请求
    - 终止一个 setTimeout 或 setInterval
    - 停止一个 EventTarget 的事件监听
    - 中断一个大型计算或动画

    作为一个信号（signal）机制，用来通知目标操作：“你该停止了”。
    爸爸保护女儿

在 AbortController 出现之前，JavaScript 缺乏统一的异步操作取消机制。

    - fetch 无法取消（早期）：只能等超时或完成。
    - setTimeout/setInterval：需要用 clearTimeout 手动清除，但逻辑分散。
    - 事件监听：忘记 removeEventListener 容易内存泄漏。
    - Promise 链：一旦开始无法中断。


- 组件卸载后请求仍在，可能导致：1. 内存泄漏（回调无法释放）；2. 更新已卸载组件状态报错；3. 资源浪费。abort可避免这些问题。
