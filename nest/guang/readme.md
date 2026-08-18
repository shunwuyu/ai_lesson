# 什么是nest.js

NestJS 是基于 Node.js 的后端框架，默认使用 TypeScript 开发，全面模块化思想，适合构建企业级服务。
适合中大型项目，生态完善，适合团队协作开发后端接口。

## 安装 

安装 nest cli

npm i -g @nestjs/cli

创建新项目

nest new hello

进入目录启动

npm run start:dev

http:localhost:3000

## 核心目录说明

`src/main.ts`：程序入口
`app.module.ts`：根模块 根组件
`app.controller.ts`：控制器  控制器就是负责接收前端发过来的请求，把活儿交给服务去干，最后再把结果返回给前端。
`app.service.ts`：业务服务 service 就是真正干活的，处理业务、操作数据，不让控制器写复杂逻辑。

## 工厂模式

工厂模式就像蜜雪冰城门店，你不用自己熬糖浆煮茶，只要点单告诉店员（工厂）要什么饮品，门店直接给你做好一杯成品对象，不用管里面怎么做出来的。

demo 

```
// 多个产品类
class IceCream {
  constructor() {
    this.name = '摩天脆脆'
    this.price = 3
  }
  show() {
    console.log(`🍦${this.name}，${this.price}元`)
  }
}

class LemonTea {
  constructor() {
    this.name = '柠檬水'
    this.price = 4
  }
  show() {
    console.log(`🍋${this.name}，${this.price}元`)
  }
}

class MilkTea {
  constructor() {
    this.name = '珍珠奶茶'
    this.price = 8
  }
  show() {
    console.log(`🧋${this.name}，${this.price}元`)
  }
}

// 蜜雪冰城工厂：负责生产各个类的实例
class MixueFactory {
  static createDrink(type) {
    switch (type) {
      case 'ice': return new IceCream()
      case 'lemon': return new LemonTea()
      case 'milk': return new MilkTea()
      default: throw new Error('暂无这款饮品')
    }
  }
}

// 使用：外部只找工厂，不直接 new 各个饮品类
const drink1 = MixueFactory.createDrink('ice')
drink1.show()

const drink2 = MixueFactory.createDrink('milk')
drink2.show()

```

## 单例模式
```
single.html
```

## 代理模式
proxy.js

## 订阅发布者模式


工厂封装复杂构建，可产出 Web、微服务等多种应用实例，屏蔽底层细节。

## ORM
Object‑Relational Mapping
对象关系映射

Object：代码里的类、对象
Relational：关系型数据库（MySQL 这类）
Mapping：互相转换映射

### 用户登录、注册
- 新建数据库
  mydb
  utf8mb4
  utf8mb4_unicode_ci

- 准备用户表

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COLLATE utf8mb4_unicode_ci utf8 字符集
PRIMARY KEY (`id`), 主键
`UNIQUE KEY `name` (`name`)`：唯一索引，约束`name`字段的值**不能重复**

### prisma  
Prisma 是新一代 TypeScript ORM，用 `schema.prisma` 文件定义数据模型，自动生成类型安全客户端，不用手写实体类，自动生成 TS 类型，开发体验好，现在 Nest 新项目主流选择。

npm i prisma@6 -D
npm i @prisma/client@6

bcrypt 是一个密码哈希库，把明文密码加盐后经过多轮计算转成一串不可逆的哈希值，存库里即使泄露也反推不出原密码。

pnpm i bcrypt
pnpm i -D @types/bcrypt

初始化 prisma
npx prisma init

生成 `prisma/schema.prisma` 和 `.env`

.env
DATABASE_URL="mysql://root:123456@127.0.0.1:3307/mydb?schema=public"

编写 schema.prisma
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 对应你提供的user表结构
model User {
  id       Int    @id @default(autoincrement())
  name     String @db.VarChar(255)
  password String @db.VarChar(255)

  @@unique([name])
  @@map("user")
}

```
- npx prisma migrate dev --name create_user_table
这条命令会：

1. 在 prisma/migrations 生成迁移 sql 文件
2. 连接 mydb 数据库，自动创建`user`表，等价你贴的 CREATE TABLE 语句
3. 自动生成 @prisma/client TS 类型

生成 prisma client（migrate dev 已经做了，保险手动跑一次）
npx prisma generate

Nestjs PrismaModule 封装（全局 Prisma 服务）

生成 prisma 模块

nest g module prisma
nest g service prisma

x修改 prisma.service.ts
```
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

```