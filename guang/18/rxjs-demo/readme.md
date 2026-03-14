# RxJS

RxJS = 用“数据流”的方式处理异步事件。

在 JS 里我们常见的异步方式：

- callback

- Promise

- async/await

- event listener

setTimeout(() => {
  console.log('hello')
}, 1000)

fetch('/api').then(res => res.json())

这些 都是一次性的异步任务。

但现实里有很多 连续发生的事件：

- SSE消息
- 输入框输入
- 定时器 setInterval
- 鼠标移动
- AI流式回复

这些其实更像：

事件1 → 事件2 → 事件3 → 事件4

像 一条河流。

把异步事件当成“数据流”来处理。

## 核心概念：Observable

Observable（可观察对象）

可以理解为：

一个不断产生数据的容器

Observable
   │
   ├─ 数据1
   ├─ 数据2
   ├─ 数据3
   └─ 数据4

- demo1

