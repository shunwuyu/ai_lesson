# 手写async await

async/await 本质上是把一个用 Promise 写的异步流程，编译成一个 generator（yield） + 一个 runner：await 对应 yield，runner 把每次 yield 的值 Promise.resolve(...) 后再继续 next，异常通过 throw 传回 generator。async 函数最终返回一个 Promise。

- 考察你对 Promise、生成器、状态机的理解
  next 

- 用 Generator 配合 Promise 实现。每次 yield 出一个 Promise，用 step 递归处理：成功就 next 传结果进去，失败就 throw 进去。通过 Promise.then 自动等待，模拟 await 效果。最后返回 Promise，实现 async 的核心行为。
  
  
