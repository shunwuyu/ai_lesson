# AI Diary Server 从零开发教程

> 适合人群：接触过 TypeScript，但刚入门 NestJS 的新手。
> 学完你会得到：一个「AI 日记本」后端服务，同时使用 MySQL 和 Milvus 两种数据库，并接入 Embedding 向量化能力。

本教程会从 **空目录** 开始，一步步带你搭建出当前 `ai-diary-server` 项目的完整结构。所有代码都能在本仓库的 `src` 目录里找到，建议一边读一边对照源码。

---

## 目录

1. [这个项目到底做了什么](#1-这个项目到底做了什么)
2. [先搞懂几个核心概念](#2-先搞懂几个核心概念)
3. [环境准备](#3-环境准备)
4. [初始化 NestJS 项目](#4-初始化-nestjs-项目)
5. [安装项目依赖](#5-安装项目依赖)
6. [准备 MySQL 和 Milvus](#6-准备-mysql-和-milvus)
7. [配置 .env 环境变量](#7-配置-env-环境变量)
8. [在 AppModule 中连接 MySQL（TypeORM）](#8-在-appmodule-中连接-mysqltypeorm)
9. [深入理解 ORM、Entity、Repository、DTO](#9-深入理解-ormentityrepositorydto)
10. [编写 AiDiary Entity](#10-编写-aidiary-entity)
11. [编写 DTO](#11-编写-dto)
12. [开启全局参数校验 ValidationPipe](#12-开启全局参数校验-validationpipe)
13. [用 Nest CLI 生成模块和服务](#13-用-nest-cli-生成模块和服务)
14. [实现 Embedding 模块](#14-实现-embedding-模块)
15. [实现 Milvus 模块](#15-实现-milvus-模块)
16. [实现 AiDiary 业务模块](#16-实现-aidiary-业务模块)
17. [理解「自动同步」](#17-理解自动同步)
18. [启动项目](#18-启动项目)
19. [接口测试](#19-接口测试)
20. [常见问题排查](#20-常见问题排查)
21. [总结](#21-总结)

---

## 1. 这个项目到底做了什么

`ai-diary-server` 是一个 AI 日记本后端。它做的事情很典型：

- 把日记的结构化数据（内容、日期、心情、标签）存到 **MySQL**。
- 把日记内容和同一份结构化数据同时存到 **Milvus 向量数据库**，方便做语义检索。
- 写入 / 修改 Milvus 之前，先用 **Embedding 模型** 把文字内容变成向量（一串数字）。

这种「MySQL + Milvus 同时写」的做法，叫做 **双写**。

```
用户请求
   │
   ▼
AiDiaryController
   │
   ▼
AiDiaryService ──────► TypeORM Repository ──────► MySQL（结构化数据）
   │
   ├──────► EmbeddingService ──────► 文本 → 1024 维向量
   │
   └──────► MilvusService ──────► Milvus（向量数据）
```

为什么要两个数据库？

- MySQL 适合 **精确查询**：按 ID 查、按日期排序、查列表。
- Milvus 适合 **语义查询**：比如「我哪几天的日记心情比较好」，它不是靠关键词匹配，而是靠语义相似度。

所以一句话总结：**MySQL 管“是什么”，Milvus 管“像什么”。**

---

## 2. 先搞懂几个核心概念

不需要死记硬背，先有个印象，后面写代码时再反复验证。

### 2.1 NestJS 的三大件

| 概念 | 作用 | 常见装饰器 |
| --- | --- | --- |
| Module 模块 | 组织代码的基本单元，把相关的 Controller、Service 绑在一起 | `@Module` |
| Controller 控制器 | 处理 HTTP 请求，决定访问什么路径返回什么 | `@Controller`、`@Get`、`@Post` |
| Service / Provider 服务 | 写业务逻辑，被 Controller 调用 | `@Injectable` |

一个模块的典型结构：

```
ai-diary/
├── ai-diary.module.ts      # 模块：声明 controllers 和 providers
├── ai-diary.controller.ts  # 控制器：只负责接收请求、返回响应
├── ai-diary.service.ts     # 服务：只负责业务逻辑
├── dto/                    # 入参对象定义
└── entities/               # 数据库表对应的类
```

### 2.2 什么是 ORM

ORM 是 **Object-Relational Mapping**（对象关系映射）。

你不用手写 SQL，而是操作一个 **类** 和一个 **Repository 对象**：

```ts
// 不用 ORM，你要写 SQL
SELECT * FROM ai_diary WHERE id = 'xxx';

// 用 ORM，你操作对象
const diary = await repository.findOne({ where: { id: 'xxx' } });
```

ORM 帮你把「JS 类」翻译成「数据库表」，把「对象操作」翻译成「SQL」。

### 2.3 什么是 Entity

Entity 就是「数据库表的映射类」。

数据库表 `ai_diary`：

```
id | content | date | mood | tags | createdAt | updatedAt
```

对应的 Entity：

```ts
@Entity()
export class AiDiary {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  // ...
}
```

一个 `@Entity()` 类 = 一张表，一个带 `@Column()` 的属性 = 一个字段。

### 2.4 什么是 DTO

DTO 是 **Data Transfer Object**（数据传输对象）。

它用来描述「客户端传给后端的请求体长什么样」，并顺便做校验。

```ts
export class CreateAiDiaryDto {
  @IsString()
  content: string;

  @IsArray()
  tags: string[];
}
```

`@IsString()`、`@IsArray()` 来自 `class-validator`，用来校验字段类型。

### 2.5 什么是 Embedding / 向量

Embedding 就是把一段文字变成一串数字（向量）。语义相近的文字，向量之间的距离也近。

```ts
"今天很开心" → [0.12, -0.33, 0.45, ..., 共 1024 个数字]
"今天心情不错" → [0.11, -0.30, 0.43, ..., 和上面很接近]
```

有了向量，Milvus 才能做「语义相似度检索」。

---

## 3. 环境准备

先确保本机已经安装：

| 工具 | 用途 | 检查命令 |
| --- | --- | --- |
| Node.js | 运行 NestJS | `node -v` |
| pnpm | 包管理器 | `pnpm -v` |
| Docker | 运行 MySQL、Milvus | `docker -v` |
| Nest CLI | 生成代码 | `nest --version` |

### 3.1 安装 Node.js

建议 Node 20+（本项目 `@types/node` 是 22，Node 20/22 都可以）。

去 <https://nodejs.org/> 下载 LTS 版本即可。

### 3.2 安装 pnpm

本项目使用 pnpm（仓库里有一个 `pnpm-lock.yaml`）。

```bash
npm install -g pnpm
```

### 3.3 安装 Docker

去 <https://www.docker.com/products/docker-desktop/> 下载 Docker Desktop 并启动。

### 3.4 安装 Nest CLI

```bash
npm install -g @nestjs/cli
```

安装完成后，`nest --version` 能输出版本号就说明成功。

---

## 4. 初始化 NestJS 项目

进入你想放项目的目录，执行：

```bash
nest new ai-diary-server
```

CLI 会问你用哪个包管理器，选择 **pnpm**。

完成后目录结构大致如下：

```
ai-diary-server/
├── node_modules/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── ...
```

先启动看看默认项目：

```bash
cd ai-diary-server
pnpm run start:dev
```

浏览器打开 <http://localhost:3000>，看到 `Hello World!` 就说明脚手架正常。

按 `Ctrl + C` 停掉服务。

---

## 5. 安装项目依赖

在项目根目录执行：

```bash
pnpm add @nestjs/config @nestjs/typeorm typeorm mysql2
pnpm add @nestjs/mapped-types class-validator class-transformer
pnpm add @zilliz/milvus2-sdk-node @langchain/openai openai
pnpm add uuid
```

安装的包作用如下：

| 包 | 作用 |
| --- | --- |
| `@nestjs/config` | 读取 `.env` 环境变量 |
| `@nestjs/typeorm` | NestJS 和 TypeORM 的桥接 |
| `typeorm` | ORM 框架 |
| `mysql2` | MySQL 数据库驱动 |
| `@nestjs/mapped-types` | 提供 `PartialType`，用于更新 DTO |
| `class-validator` | 给 DTO 加校验装饰器 |
| `class-transformer` | 配合校验，做数据类型转换 |
| `@zilliz/milvus2-sdk-node` | Milvus 官方 Node SDK |
| `@langchain/openai` | OpenAI 兼容的 Embedding 客户端 |
| `openai` | OpenAI 类型依赖（`@langchain/openai` 会用到） |
| `uuid` | 生成唯一 ID |

> 说明：项目实际用 `@langchain/openai` 连接阿里云 DashScope，因为 DashScope 提供了 **OpenAI 兼容模式**，所以用 OpenAI 客户端就能调用。

---

## 6. 准备 MySQL 和 Milvus

### 6.1 启动 MySQL（端口 3307）

本项目 `.env` 里 MySQL 端口是 `3307`，不是默认的 `3306`。这样设计是为了避免和你电脑上已有的 MySQL 冲突。

用 Docker 启动一个 MySQL：

```bash
docker run -d \
  --name ai-diary-mysql \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=ai_diary \
  mysql:8.4
```

参数解释：

- `--name ai-diary-mysql`：容器名字
- `-p 3307:3306`：把容器内的 `3306` 映射到本机 `3307`
- `-e MYSQL_ROOT_PASSWORD=123456`：root 密码
- `-e MYSQL_DATABASE=ai_diary`：启动时自动创建数据库 `ai_diary`

验证 MySQL：

```bash
docker ps
```

能看到 `ai-diary-mysql` 在运行即可。

> 如果你的电脑已经有 MySQL，也可以直接使用，但记得把 `.env` 里的 `MYSQL_HOST`、`MYSQL_PORT`、账号密码改成你自己的。

### 6.2 启动 Milvus（端口 19530）

Milvus 官方提供了 Docker Compose 文件，一个文件会同时启动 `etcd`、`minio`、`milvus-standalone` 三个容器。

新建一个目录：

```bash
mkdir milvus
cd milvus
```

去官方 Release 下载 `milvus-standalone-docker-compose.yml`：

<https://github.com/milvus-io/milvus/releases>

下载后放入 `milvus` 目录。项目里已经提供了这份文件，内容核心如下：

```yaml
version: '3.5'

services:
  etcd:
    container_name: milvus-etcd
    image: quay.io/coreos/etcd:v3.5.25
    # ...

  minio:
    container_name: milvus-minio
    image: minio/minio:RELEASE.2024-05-28T17-19-04Z
    # ...

  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:v3.0.0
    command: ["milvus", "run", "standalone"]
    ports:
      - "19530:19530"
      - "9091:9091"
    depends_on:
      - "etcd"
      - "minio"
```

启动：

```bash
docker compose -f ./milvus-standalone-docker-compose.yml up -d
```

命令解释：

- `-f`：指定 compose 文件
- `up -d`：后台启动

验证 Milvus 健康状态：

```bash
curl http://localhost:9091/healthz
```

返回 `OK` 就说明启动成功。

---

## 7. 配置 .env 环境变量

在项目根目录新建 `.env` 文件：

```bash
touch .env
```

写入以下内容：

```env
MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DATABASE=ai_diary

MILVUS_ADDRESS=localhost:19530

VECTOR_DIM=1024

OPENAI_API_KEY=sk-请替换成你自己的密钥
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-plus
EMBEDDINGS_MODEL_NAME=text-embedding-v3
```

字段解释：

| 变量 | 说明 |
| --- | --- |
| `MYSQL_HOST` | MySQL 地址 |
| `MYSQL_PORT` | MySQL 端口 |
| `MYSQL_USER` | MySQL 用户名 |
| `MYSQL_PASSWORD` | MySQL 密码 |
| `MYSQL_DATABASE` | 数据库名 |
| `MILVUS_ADDRESS` | Milvus 地址，默认端口 19530 |
| `VECTOR_DIM` | 向量维度，这里固定 1024 |
| `OPENAI_API_KEY` | DashScope 的 API Key |
| `OPENAI_BASE_URL` | DashScope 的 OpenAI 兼容地址 |
| `MODEL_NAME` | 聊天模型名（本教程核心只用到 Embedding，但保留配置） |
| `EMBEDDINGS_MODEL_NAME` | Embedding 模型名，`text-embedding-v3` 输出 1024 维 |

> 重要：
> 1. `OPENAI_API_KEY` 一定要替换成你自己的，不要使用别人的 key。
> 2. `.env` 里是敏感信息，**绝不能提交到 Git**。检查 `.gitignore` 里是否包含 `.env`。

---

## 8. 在 AppModule 中连接 MySQL（TypeORM）

打开 `src/app.module.ts`，把它改成：

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiDiaryModule } from './ai-diary/ai-diary.module';
import { MilvusModule } from './milvus/milvus.module';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    AiDiaryModule,
    MilvusModule,
    EmbeddingModule,
  ],
})
export class AppModule {}
```

逐块解释：

### 8.1 ConfigModule

```ts
ConfigModule.forRoot({
  isGlobal: true,
})
```

- `ConfigModule.forRoot()`：读取项目根目录的 `.env` 文件。
- `isGlobal: true`：这个模块全局可用，其他模块不需要重复 import 就能使用 `ConfigService`。

### 8.2 TypeOrmModule.forRootAsync

`forRoot` 用于配置数据库连接（全局根配置）。因为我们要读取 `.env`，所以用 **异步版本** `forRootAsync`。

```ts
TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('MYSQL_HOST'),
    // ...
  }),
})
```

- `inject: [ConfigService]`：把 `ConfigService` 注入到工厂函数里。
- `useFactory`：返回 TypeORM 的数据库连接配置。
- `config.get('MYSQL_HOST')`：读取 `.env` 里的 `MYSQL_HOST`。

### 8.3 两个重要配置

```ts
synchronize: true,
autoLoadEntities: true,
```

- `synchronize: true`：TypeORM 会根据 Entity 自动创建 / 更新数据库表结构。**开发阶段很方便，生产环境必须关闭**。
- `autoLoadEntities: true`：自动加载通过 `TypeOrmModule.forFeature()` 注册的 Entity，不用手动在 `entities` 数组里罗列。

---

## 9. 深入理解 ORM、Entity、Repository、DTO

这里用一个具体例子串起来。

### 9.1 数据库表 vs Entity

MySQL 表 `ai_diary` 长这样：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | varchar | 主键 |
| content | text | 日记内容 |
| date | varchar | 日期字符串 |
| mood | varchar | 心情 |
| tags | text | 标签数组（simple-array 存储） |
| createdAt | datetime | 创建时间 |
| updatedAt | datetime | 更新时间 |

对应的 Entity：

```ts
@Entity()
export class AiDiary {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  date: string;

  @Column()
  mood: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

装饰器含义：

| 装饰器 | 含义 |
| --- | --- |
| `@Entity()` | 声明这是一个数据库实体（对应一张表） |
| `@PrimaryColumn()` | 主键字段 |
| `@Column()` | 普通字段，默认类型由 TS 类型推断 |
| `@Column('text')` | 显式指定 MySQL 类型为 `text` |
| `@Column('simple-array')` | 数组以逗号分隔字符串形式存储 |
| `@CreateDateColumn()` | 自动写入创建时间 |
| `@UpdateDateColumn()` | 自动写入更新时间 |

### 9.2 Repository 是什么

Repository 是 TypeORM 提供的「仓库对象」，专门用来操作某个 Entity。

```ts
@InjectRepository(AiDiary)
private repository: Repository<AiDiary>
```

拿到 `repository` 后，你就能做增删改查：

```ts
repository.save(diary);                    // 保存
repository.find();                         // 查询所有
repository.findOne({ where: { id } });     // 按条件查询一个
repository.delete(id);                     // 删除
```

### 9.3 DTO 和 Entity 的区别

新手最容易混的一对概念：

- **Entity**：对应 **数据库表**，描述数据怎么存。
- **DTO**：对应 **HTTP 请求体**，描述客户端传什么数据进来，并做校验。

为什么不能直接用 Entity 接收请求？

因为请求体是外部输入，需要校验；数据库实体还包含 `id`、`createdAt`、`updatedAt` 这些不需要用户传的字段。

---

## 10. 编写 AiDiary Entity

创建文件 `src/ai-diary/entities/ai-diary.entity.ts`：

```ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AiDiary {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  date: string;

  @Column()
  mood: string;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

注意：

- `id` 不是数据库自增，而是我们在 Service 中用 `uuid()` 生成。
- `tags` 用 `simple-array`，存入 MySQL 时是 `tag1,tag2` 这样的字符串，读取时 TypeORM 自动帮你还原成数组。

---

## 11. 编写 DTO

DTO 放在 `src/ai-diary/dto/` 下，一共三个文件。

### 11.1 create-ai-diary.dto.ts

```ts
import { IsArray, IsString } from 'class-validator';

export class CreateAiDiaryDto {
  @IsString()
  content: string;

  @IsString()
  date: string;

  @IsString()
  mood: string;

  @IsArray()
  tags: string[];
}
```

- `@IsString()`：字段必须是字符串。
- `@IsArray()`：字段必须是数组。

### 11.2 update-ai-diary.dto.ts

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAiDiaryDto } from './create-ai-diary.dto';

export class UpdateAiDiaryDto extends PartialType(CreateAiDiaryDto) {}
```

`PartialType` 会把 `CreateAiDiaryDto` 里的所有字段都变成 **可选**。

这样更新接口可以只传需要修改的字段，例如：

```json
{
  "mood": "开心"
}
```

### 11.3 search-ai-diary.dto.ts

```ts
import { IsString } from 'class-validator';

export class SearchAiDiaryDto {
  @IsString()
  content: string;
}
```

搜索接口只需要用户传一段用来匹配的文本。

---

## 12. 开启全局参数校验 ValidationPipe

打开 `src/main.ts`：

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);

  console.log('Server: http://localhost:3000');
}

bootstrap();
```

`ValidationPipe` 的作用：

- 自动对 `@Body()` 收到的 DTO 执行 `class-validator` 校验。
- `whitelist: true`：自动剔除 DTO 里没有定义的字段，防止多余数据进入业务逻辑。
- `transform: true`：把请求体转换成 DTO 类的实例，并做类型转换。

---

## 13. 用 Nest CLI 生成模块和服务

Nest CLI 能帮我们快速生成标准文件。这里演示两个基础命令。

### 13.1 生成 ai-diary 完整资源

```bash
nest g resource ai-diary
```

CLI 会询问：

- What transport layer do you use? 选择 **REST API**
- Would you like to generate CRUD entry points? 输入 **Y**

它会自动生成：

```
src/ai-diary/
├── dto/
│   ├── create-ai-diary.dto.ts
│   └── update-ai-diary.dto.ts
├── entities/
│   └── ai-diary.entity.ts
├── ai-diary.controller.ts
├── ai-diary.module.ts
├── ai-diary.service.ts
└── 若干 spec 测试文件
```

然后我们在这个基础上，把生成的文件改成教程里的最终代码。

### 13.2 生成 milvus 模块和服务

```bash
nest g module milvus
nest g service milvus
```

生成：

```
src/milvus/
├── milvus.module.ts
└── milvus.service.ts
```

### 13.3 生成 embedding 模块和服务

```bash
nest g module embedding
nest g service embedding
```

生成：

```
src/embedding/
├── embedding.module.ts
└── embedding.service.ts
```

---

## 14. 实现 Embedding 模块

### 14.1 embedding.service.ts

创建 `src/embedding/embedding.service.ts`：

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from '@langchain/openai';

@Injectable()
export class EmbeddingService {
  private embeddings: OpenAIEmbeddings;

  constructor(private config: ConfigService) {
    this.embeddings = new OpenAIEmbeddings({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
      model: this.config.get<string>('EMBEDDINGS_MODEL_NAME'),
      dimensions: this.config.get<number>('VECTOR_DIM'),

      configuration: {
        baseURL: this.config.get<string>('OPENAI_BASE_URL'),
      },
    });
  }

  async createEmbedding(text: string): Promise<number[]> {
    return this.embeddings.embedQuery(text);
  }
}
```

解释：

- `OpenAIEmbeddings` 是 LangChain 提供的 OpenAI 兼容 Embedding 客户端。
- `apiKey`：DashScope 的密钥。
- `model`：`text-embedding-v3`。
- `dimensions`：指定输出维度为 1024。
- `configuration.baseURL`：把请求地址指到阿里云 DashScope 的兼容模式。
- `embedQuery(text)`：输入一段文字，返回一个 `number[]`（1024 维向量）。

### 14.2 embedding.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding.service';

@Module({
  imports: [ConfigModule],
  providers: [EmbeddingService],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}
```

关键点：`exports: [EmbeddingService]`。

一个模块里的 Provider 默认只能自己用，只有写进 `exports` 后，其他模块 import 了 `EmbeddingModule` 才能注入 `EmbeddingService`。

---

## 15. 实现 Milvus 模块

### 15.1 milvus.service.ts

创建 `src/milvus/milvus.service.ts`：

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

@Injectable()
export class MilvusService implements OnModuleInit {
  private client: MilvusClient;
  private COLLECTION_NAME = 'ai_diary';
  private vectorDim: number;

  constructor(private config: ConfigService) {
    this.vectorDim = this.config.get<number>('VECTOR_DIM')!;

    this.client = new MilvusClient({
      address: this.config.get<string>('MILVUS_ADDRESS') as string,
    });
  }

  async onModuleInit() {
    await this.initCollection();
  }

  async initCollection() {
    const has = await this.client.hasCollection({
      collection_name: this.COLLECTION_NAME,
    });

    if (has.value) return;

    await this.client.createCollection({
      collection_name: this.COLLECTION_NAME,

      fields: [
        {
          name: 'id',
          data_type: DataType.VarChar,
          max_length: 50,
          is_primary_key: true,
        },
        {
          name: 'vector',
          data_type: DataType.FloatVector,
          dim: this.vectorDim,
        },
        {
          name: 'content',
          data_type: DataType.VarChar,
          max_length: 5000,
        },
        {
          name: 'date',
          data_type: DataType.VarChar,
          max_length: 50,
        },
        {
          name: 'mood',
          data_type: DataType.VarChar,
          max_length: 50,
        },
        {
          name: 'tags',
          data_type: DataType.Array,
          element_type: DataType.VarChar,
          max_capacity: 10,
          max_length: 50,
        },
      ],
    });

    await this.client.createIndex({
      collection_name: this.COLLECTION_NAME,
      field_name: 'vector',
      index_name: 'vector_idx',
      index_type: 'AUTOINDEX',
      metric_type: 'COSINE',
    });

    await this.client.loadCollectionSync({
      collection_name: this.COLLECTION_NAME,
    });
  }

  async insert(data: any) {
    await this.client.insert({
      collection_name: this.COLLECTION_NAME,
      data: [data],
    });

    await this.client.flushSync({
      collection_names: [this.COLLECTION_NAME],
    });
  }

  async delete(id: string) {
    await this.client.delete({
      collection_name: this.COLLECTION_NAME,
      filter: `id=="${id}"`,
    });
  }

  async search(vector: number[]) {
    return this.client.search({
      collection_name: this.COLLECTION_NAME,
      data: [vector],
      limit: 5,
      output_fields: ['id', 'content', 'date', 'mood', 'tags'],
    });
  }
}
```

#### 15.1.1 Milvus 核心概念

- **Collection**：相当于 MySQL 的「表」。
- **Schema / Fields**：表的字段定义。
- **Entity**：Collection 里的一条数据。
- **Index**：向量索引，加速相似度检索。

#### 15.1.2 `onModuleInit` 生命周期

`MilvusService` 实现了 `OnModuleInit` 接口：

```ts
async onModuleInit() {
  await this.initCollection();
}
```

Nest 在模块初始化完成后会自动调用这个方法。所以我们可以在服务启动时自动创建 Collection 和索引。

#### 15.1.3 `initCollection` 做了什么

1. 检查 Collection `ai_diary` 是否存在。
2. 不存在则创建 Collection，并定义 6 个字段。
3. 为 `vector` 字段创建向量索引 `AUTOINDEX`，度量方式 `COSINE`（余弦相似度）。
4. 把 Collection 加载进内存，方便后续查询。

字段类型说明：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | VarChar | 主键，字符串 |
| vector | FloatVector | 1024 维浮点向量 |
| content | VarChar | 日记内容 |
| date | VarChar | 日期 |
| mood | VarChar | 心情 |
| tags | Array | 标签数组，元素是 VarChar |

#### 15.1.4 insert 删除与检索

- `insert`：插入一条数据，然后 `flushSync` 刷盘，让数据立即可见。
- `delete`：按 ID 删除。`filter` 表达式 `id=="xxx"` 是 Milvus 的过滤语法。
- `search`：用向量去查最相似的 5 条数据，并返回指定字段。

### 15.2 milvus.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MilvusService } from './milvus.service';

@Module({
  imports: [ConfigModule],
  providers: [MilvusService],
  exports: [MilvusService],
})
export class MilvusModule {}
```

和 `EmbeddingModule` 一样，通过 `exports` 把 `MilvusService` 暴露出去。

---

## 16. 实现 AiDiary 业务模块

这是最核心的部分，它把 MySQL、Embedding、Milvus 三者串起来。

### 16.1 ai-diary.service.ts

```ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { AiDiary } from './entities/ai-diary.entity';
import { CreateAiDiaryDto } from './dto/create-ai-diary.dto';
import { UpdateAiDiaryDto } from './dto/update-ai-diary.dto';
import { MilvusService } from '../milvus/milvus.service';
import { EmbeddingService } from '../embedding/embedding.service';

@Injectable()
export class AiDiaryService {
  constructor(
    @InjectRepository(AiDiary)
    private repository: Repository<AiDiary>,

    private milvusService: MilvusService,
    private embeddingService: EmbeddingService,
  ) {}

  async create(dto: CreateAiDiaryDto) {
    const id = uuid();

    const diary = this.repository.create({
      id,
      ...dto,
    });

    await this.repository.save(diary);

    const vector = await this.embeddingService.createEmbedding(dto.content);

    await this.milvusService.insert({
      id,
      vector,
      content: dto.content,
      date: dto.date,
      mood: dto.mood,
      tags: dto.tags,
    });

    return diary;
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const diary = await this.repository.findOne({
      where: { id },
    });

    if (!diary) {
      throw new NotFoundException('Diary not found');
    }

    return diary;
  }

  async update(id: string, dto: UpdateAiDiaryDto) {
    const diary = await this.findOne(id);

    Object.assign(diary, dto);

    await this.repository.save(diary);

    await this.milvusService.delete(id);

    const vector = await this.embeddingService.createEmbedding(diary.content);

    await this.milvusService.insert({
      id,
      vector,
      content: diary.content,
      date: diary.date,
      mood: diary.mood,
      tags: diary.tags,
    });

    return diary;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.repository.delete(id);

    await this.milvusService.delete(id);

    return {
      message: '删除成功',
    };
  }

  async search(content: string) {
    const vector = await this.embeddingService.createEmbedding(content);

    return this.milvusService.search(vector);
  }
}
```

#### 16.1.1 构造函数注入

```ts
constructor(
  @InjectRepository(AiDiary)
  private repository: Repository<AiDiary>,

  private milvusService: MilvusService,
  private embeddingService: EmbeddingService,
) {}
```

Nest 会自动帮你创建并注入这三个依赖：

- `Repository<AiDiary>`：操作 MySQL 的仓库对象。
- `MilvusService`：操作 Milvus。
- `EmbeddingService`：文本转向量。

#### 16.1.2 create：双写

```ts
const diary = this.repository.create({ id, ...dto });
await this.repository.save(diary);
```

先写 MySQL。

```ts
const vector = await this.embeddingService.createEmbedding(dto.content);
await this.milvusService.insert({ id, vector, content, date, mood, tags });
```

再把内容向量化，写入 Milvus。

#### 16.1.3 update：先删 Milvus 再重插

因为 Milvus 的更新没有 MySQL 那么直接，这里采用的策略是：

1. 更新 MySQL。
2. 删除 Milvus 里旧的这条数据。
3. 用更新后的内容重新生成向量。
4. 重新插入 Milvus。

#### 16.1.4 remove：删除不需要向量化

```ts
await this.repository.delete(id);
await this.milvusService.delete(id);
```

删除直接按 ID 操作，**不需要调用 Embedding**，因为删除不需要向量。

#### 16.1.5 search：语义检索

```ts
const vector = await this.embeddingService.createEmbedding(content);
return this.milvusService.search(vector);
```

用户输入的文字先向量化，再拿向量去 Milvus 里做相似度检索。

### 16.2 ai-diary.controller.ts

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AiDiaryService } from './ai-diary.service';
import { CreateAiDiaryDto } from './dto/create-ai-diary.dto';
import { UpdateAiDiaryDto } from './dto/update-ai-diary.dto';
import { SearchAiDiaryDto } from './dto/search-ai-diary.dto';

@Controller('ai-diary')
export class AiDiaryController {
  constructor(private readonly service: AiDiaryService) {}

  @Post()
  create(@Body() dto: CreateAiDiaryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAiDiaryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('search')
  search(@Body() dto: SearchAiDiaryDto) {
    return this.service.search(dto.content);
  }
}
```

路由映射：

| 装饰器 | 路径 | 说明 |
| --- | --- | --- |
| `@Post()` | `POST /ai-diary` | 新增日记 |
| `@Get()` | `GET /ai-diary` | 查询所有日记 |
| `@Get(':id')` | `GET /ai-diary/:id` | 查询单条 |
| `@Patch(':id')` | `PATCH /ai-diary/:id` | 更新 |
| `@Delete(':id')` | `DELETE /ai-diary/:id` | 删除 |
| `@Post('search')` | `POST /ai-diary/search` | 语义搜索 |

> 注意：`@Post('search')` 放在 `@Get(':id')` 后面没问题，因为请求方法不同。只要保证路由不冲突即可。

### 16.3 ai-diary.module.ts

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiDiary } from './entities/ai-diary.entity';
import { AiDiaryController } from './ai-diary.controller';
import { AiDiaryService } from './ai-diary.service';
import { MilvusModule } from '../milvus/milvus.module';
import { EmbeddingModule } from '../embedding/embedding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiDiary]),
    MilvusModule,
    EmbeddingModule,
  ],
  controllers: [AiDiaryController],
  providers: [AiDiaryService],
})
export class AiDiaryModule {}
```

关键点：

- `TypeOrmModule.forFeature([AiDiary])`：注册 `AiDiary` 实体，这样本模块才能使用 `@InjectRepository(AiDiary)`。
- `imports: [MilvusModule, EmbeddingModule]`：因为本模块要注入 `MilvusService` 和 `EmbeddingService`，所以必须导入这两个模块。

---

## 17. 理解「自动同步」

项目里有两种「自动同步」，不要搞混。

### 17.1 TypeORM 的 `synchronize`

在 `app.module.ts` 里：

```ts
synchronize: true,
autoLoadEntities: true,
```

`autoLoadEntities` 让 TypeORM 找到所有通过 `forFeature` 注册的 Entity；`synchronize` 则根据这些 Entity 自动建表、改表。

例如你定义了 `AiDiary` Entity，启动项目后，MySQL 里会自动出现一张 `ai_diary` 表，字段和 Entity 一致。

### 17.2 Milvus 的 `onModuleInit`

在 `milvus.service.ts` 里：

```ts
async onModuleInit() {
  await this.initCollection();
}
```

它让服务启动时自动：

1. 检查 Collection 是否存在。
2. 不存在就创建 Collection。
3. 创建向量索引。
4. 加载 Collection。

所以 MySQL 表和 Milvus Collection 都不需要你手动建，启动项目就自动就绪。

---

## 18. 启动项目

先确认：

1. MySQL 容器在运行：`docker ps`
2. Milvus 容器在运行：`curl http://localhost:9091/healthz` 返回 `OK`
3. `.env` 已配置好

然后执行：

```bash
pnpm run start:dev
```

看到类似输出：

```
Server: http://localhost:3000
```

就说明启动成功。

此时：

- MySQL 中已自动创建 `ai_diary` 表。
- Milvus 中已自动创建 `ai_diary` Collection、索引并加载。

---

## 19. 接口测试

### 19.1 新增日记

```bash
curl -X POST http://localhost:3000/ai-diary \
  -H "Content-Type: application/json" \
  -d '{
    "content": "今天和朋友们去公园散步，天气很好，心情非常开心。",
    "date": "2026-08-19",
    "mood": "开心",
    "tags": ["公园", "朋友", "散步"]
  }'
```

成功后会返回这条日记的完整数据，包括自动生成的 `id`、`createdAt`、`updatedAt`。

### 19.2 查询列表

```bash
curl http://localhost:3000/ai-diary
```

### 19.3 查询单条

把 `:id` 替换成上一步返回的真实 ID：

```bash
curl http://localhost:3000/ai-diary/:id
```

### 19.4 更新日记

```bash
curl -X PATCH http://localhost:3000/ai-diary/:id \
  -H "Content-Type: application/json" \
  -d '{
    "mood": "非常开心"
  }'
```

### 19.5 删除日记

```bash
curl -X DELETE http://localhost:3000/ai-diary/:id
```

### 19.6 语义搜索

```bash
curl -X POST http://localhost:3000/ai-diary/search \
  -H "Content-Type: application/json" \
  -d '{
    "content": "我哪几天心情比较好"
  }'
```

这一步会：

1. 把 `"我哪几天心情比较好"` 变成向量。
2. 去 Milvus 中查找语义最接近的 5 条日记。
3. 返回它们的 `id`、`content`、`date`、`mood`、`tags` 和相似度。

---

## 20. 常见问题排查

### 20.1 MySQL 连接失败

报错类似：

```
ECONNREFUSED 127.0.0.1:3307
```

检查：

```bash
docker ps
```

看 MySQL 容器是否在运行，端口是否映射到 `3307`。

### 20.2 Milvus 连接失败

检查健康状态：

```bash
curl http://localhost:9091/healthz
```

如果失败，重新启动 Milvus：

```bash
cd milvus
docker compose -f ./milvus-standalone-docker-compose.yml up -d
```

### 20.3 Embedding 返回维度不对

报错可能提到维度不匹配。

检查：

- `.env` 中 `VECTOR_DIM=1024`
- `EMBEDDINGS_MODEL_NAME=text-embedding-v3`
- Milvus 的 `vector` 字段 `dim` 也是 1024

三者必须一致。

### 20.4 Embedding 请求 401 / 密钥错误

检查 `OPENAI_API_KEY` 是否正确，并且 DashScope 账户是否开通了 `text-embedding-v3` 模型。

### 20.5 更新时报 404

说明传入的 `id` 在 MySQL 里不存在。先调用查询列表接口确认 ID。

### 20.6 想清空数据重新开始

清空 Milvus Collection（可选，谨慎操作）：

```bash
# 进入 Milvus 容器执行，或使用 Attu 图形化工具操作
```

开发阶段如果只是想重置，最简单的是：

1. 删除并重建 MySQL 容器。
2. 删除并重建 Milvus 容器（或删除对应 volume）。
3. 重启 NestJS 服务，让它自动重建表和 Collection。

---

## 21. 总结

到这里，你已经完成了一个完整的 AI 日记本后端。

回顾整个流程：

```
HTTP 请求
   │
   ▼
Controller（路由层，只接收请求）
   │
   ▼
Service（业务层，组织逻辑）
   │
   ├──► TypeORM Repository ──► MySQL
   ├──► EmbeddingService ────► 文本转向量
   └──► MilvusService ───────► Milvus 语义检索
```

你学到了：

1. NestJS 的 Module、Controller、Service 结构。
2. ORM、Entity、Repository、DTO 的核心概念。
3. 用 `@nestjs/typeorm` + TypeORM 连接 MySQL，并自动建表。
4. 用 `@zilliz/milvus2-sdk-node` 操作 Milvus。
5. 用 `@langchain/openai` 调用 Embedding 模型生成向量。
6. MySQL + Milvus 的「双写」模式。
7. `ValidationPipe` 参数校验。

下一步建议：

- 把 `OPENAI_API_KEY` 换成自己的真实 key，完整跑通一遍。
- 试试修改 `limit: 5`，观察搜索结果数量变化。
- 给 DTO 增加更多校验规则，比如 `@IsNotEmpty()`、`@MinLength()`。
- 尝试用 Attu 图形化工具查看 Milvus 里的 Collection 和向量数据。
