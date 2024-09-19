- restful  技能点和表达
- nest new nid-nest
- cd nid-nest
- git init 
- git add .
- git commit -m 'init'
- npm run start:dev
  :3000
- insomnia 
- repo
  nid-rest
  git remote add origin 
  git push origin master
- 新建app 目录
  app 开头的文件放到目录里面
  新增controllers   providers   调整到位
  更新相应路径

- 根目录下添加环境变量
  .env 
  APP_AUTHOR=
  .gitignore 添加.env .env*
  npm i @nestjs/config
  app.module3.ts  配置全局模块
  app.service3.ts  读取配置文件

- 新建一个文件，放在 src/app/configs 里面，名字是 app.config.ts ，在配置文件里要默认导出一个函数，这个函数返回的东西就是应用的配置。export default，导出一个函数，让这个函数返回一个对象，里面可以先添加一个 app，它的值又是一个对象，里面添加一个 author 属性。
  - app.module4.ts 添加配置模块
  - app.service4.ts 读取 app.config.ts配置

- 打开数据库
  - 连接TablePlus  https://tableplus.com/download
  - 新建数据库 nid_nest
    encoding utf8mb4
    collation utf8mb4_general_ci

- 数据库相关的配置
  - .env 
  - app/configs/database.config.ts
  - app.module.ts

- orm
  npm i mysql2 typeorm @nestjs/typeorm
  app.module.ts 配置orm
  注释下密码 看反馈
  synchronize: true

- 自动加载实体
  - .env3
  - db.config.ts
  - app.module.ts
    typeOrm
  - app.module.ts

TypeORM 是基于对象关系映射（ORM）的库，提供了操作数据库的高层抽象，简化复杂的 SQL 查询，而 mysql2 仅是一个基础的数据库驱动。

-  user  module 
  nest generate module user 
  app 模块注册 app.module8.ts
  创建用户子模块 
  nest generate module user-create user/create --flat
  nest generate controller user-create user/create/controllers --flat
  修改下前缀  users
  添加一个Post 装饰方法

- 实体
  user/entities  新加user.entity.ts
  user.entity.subscribe.ts 订阅事件
  user.module.ts 注册实体
  可以看到user 表有了， id字段有了
  再添加password name 字段， true,  自动添加  打开结构，看下类型

- commnd
  - user/create/commands
  - user-create.controller.ts 
  - user-create.handler.ts  
  - user-create.module.ts 添加 cqrs import 