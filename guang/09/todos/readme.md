- docker run -d \
  --name postgres-db \
  -p 5432:5432 \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=mydb \
  postgres:latest

- docker exec -it postgres-db psql -U admin -d postgres
- CREATE DATABASE test;
- \l 显示数据库
- \c test 切换到 test 数据库
- \dt 显示表
- nest new nest-todo
- cd nest-todo
- # 安装 prisma
npm install prisma@6.19.0 --save-dev
npm install @prisma/client@6.19.0
- # 初始化prisma，生成schema，默认数据库postgresql
npx prisma init
- 执行完 `prisma init` 后生成目录：

```
prisma/
 └── schema.prisma
.env
```

DATABASE_URL="postgresql://admin:123456@localhost:5432/test?schema=public"

- prisma/schema.prisma 文件
// This is your Prisma schema file,
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

- 执行迁移，在 Postgres 创建 todo 数据表
# 创建迁移文件 + 执行sql到数据库
npx prisma migrate dev --name init

# 生成 Prisma Client (TS类型)
npx prisma generate

## 创建 Prisma 全局服务（封装数据库连接）

```
nest generate service prisma
```

## 5. 创建 Prisma 全局服务（封装数据库连接）

```
nest generate service prisma
```

src/prisma/prisma.service.ts

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

src/app.module.ts 注册 PrismaService

```
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
```

---

## 6. 生成 Todo 模块、Controller、Service

```
nest generate module todo
nest generate controller todo
nest generate service todo
```

### 6.1 创建 DTO（数据传输对象）

src/todo/dto/create-todo.dto.ts

```
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
```

src/todo/dto/update-todo.dto.ts

```
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
```

> 
> 💡 Nest 校验需要安装包：

```
npm install class-validator class-transformer
```

开启全局校验，main.ts

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

### 6.2 Todo Service 业务层（调用 Prisma）

src/todo/todo.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
```

### 6.3 Todo Controller 控制器，路由接口

src/todo/todo.controller.ts

```
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
```

### 6.4 TodoModule

src/todo/todo.module.ts

```
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
```

---

## 7. 启动项目测试接口

```
npm run start:dev
```