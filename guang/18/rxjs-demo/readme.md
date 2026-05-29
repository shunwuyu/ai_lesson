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
流程
Observable 创建数据
       ↓
subscribe 订阅
       ↓
接收数据


三、Observable 像什么？

AI回复

你好
你好，我是
你好，我是AI助手
你好，我是AI助手，很高兴见到你

流式返回

这就是 Observable 的用武之地。

四、最常用的创建方式

1 from

把数组 / Promise / iterable 变成数据流。

import { from } from 'rxjs';

const stream = from([1,2,3]);

stream.subscribe(v => console.log(v));

五、管道 pipe（最重要）

RxJS 最强的能力：

数据流加工

就像：

自来水厂

水源 → 过滤 → 消毒 → 输送 → 家庭

RxJS：

数据 → pipe → 加工 → 输出

import { from, map } from 'rxjs';

from([1,2,3])
  .pipe(
    map(x => x * 2)
  )
  .subscribe(console.log);

  