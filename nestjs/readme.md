[source]()

- npm install @nestjs/cli --global
- nest --version
- nest new ninghao-nestjs
- npm run start:dev
- localhost:3000
- nest info
- nest g co posts --dry-run
    generate controller
- nest g co posts
- get posts默认
- http://localhost:3000/posts?filter=popular&order=date
- dto  create dto

## service

nest generate service demo  posts/providers
nest generate interface post posts/interfaces
使用服务

- 更简单注入依赖

nest generate module posts
post-> module/posts

- 中间件
    nest generate middleware demo core/middlewares 
    修改app.module.ts
    export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(DemoMiddleware)
            .forRoutes('posts')
    }
}

- Exception
    posts.controller.ts

-  过滤器
    nest generate filter demo core/filters
    自定义处理器   
