# Nest + tool 实现OpenClaw 同款定时任务功能（下）

- 图的意义

我理解 OpenClaw 是个能把用户需求转成定时 AI 任务的调度框架。像示例里，它能解析用户指令，调用定时、搜索、发邮件等工具，按计划完成个性化的自动化任务。

## 我们用 ORM 框架来操作数据库

prisma 之外的TypeORM

ORM 是 Object Relational Mapping，对象关系映射，就是把对数据库表的操作转换为对对象的操作

Prisma 上手简单、类型原生（ts支持）、迁移便捷，开发体验好；TypeORM  生态成熟，自由度更高，复杂定制场景更灵活。

- 图

这是 TypeORM 这类 ORM 的工作模型：用 User/Post 类映射 MySQL 表，通过 Repository 执行增删改查，自动转成 SQL 操作数据库。

Repository 本意是仓库，在 ORM / 架构里特指「数据访问仓库」，专门负责数据的存取。
- Service 层：处理业务逻辑（比如校验、计算、多表联动、组合调用），它会调用 Repository 来拿数据，但不直接写数据库操作。
- Repository 层：只干一件事 —— 和数据库打交道（增删改查、SQL/ORM 操作），不处理业务逻辑。

更细化

## 新建项目

nest new cron-job-tool

