- nest.js 是什么？

Nest.js 是一个 Node.js 框架，帮助你快速搭建服务器端应用程序，尤其是适合大型应用。

它使用 TypeScript 编写，提供了强大的模块化、依赖注入等功能。

- 安装和hello world
    npm i -g @nestjs/cli
    nest new hello
    pnpm run start

- 结构的意义
    - 每个 Nest 应用都有至少一个模块，它是应用的基本结构单位。
    - 控制器 (Controller)：负责处理客户端请求，并返回响应。
    - 服务 (Service)：处理业务逻辑，通常被控制器调用。
    - 依赖注入 (DI)：Nest.js 可以自动处理组件间的依赖关系。

- 新建一个
    nest generate controller cats
    nest generate service cats
    
    - 先路由访问
    - 访问service 
    - module
    nest generate module cats
    添加一个中间件
    nest generate middleware logger
    每个的概念