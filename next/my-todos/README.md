# my-todos

- npx create-next-app@latest my-todos
- npm install prisma @prisma/client
    prisma 是命令行工具，用于管理数据库 schema、迁移等。
    数据库 schema 是数据库的结构蓝图，定义了表、字段、数据类型、关系和约束等组织方式。
    迁移（Migration）是记录数据库结构变更（如建表、改字段）的版本化脚本，用于在不同环境间安全、可控地同步数据库模式。

    @prisma/client 是类型安全的数据库客户端，用于在代码中查询数据库。

- npx prisma init
    初始化 Prisma，创建 prisma 目录和 schema 文件，安装必要依赖。


- npx prisma migrate dev --name init