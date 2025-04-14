# 谈谈对koa的理解，用过哪些中间件。

- Koa 是一个轻量级、现代化(async await) Node.js Web 框架，

- 核心特点
    - 洋葱模型中间件机制：请求从外层中间件进入，按顺序执行到最里层，再从里层一层层返回（类似栈结构）；
    - 只提供核心功能：不像 Express 带了很多内置中间件，Koa 更专注于提供极简 API，扩展性强；
    - 完全支持 async/await：中间件天然支持异步流程控制，代码更加优雅可控；
    - 上下文对象 ctx：封装了 req 和 res，使得处理 HTTP 请求更加直观统一。
- 使用过的中间件
    - koa-router
    - koa-bodyparser 或 koa-body
    - koa-jwt + jsonwebtoken
    - koa-static
    - koa-cors

