# 企业知识库项目

- nest new knowledge-hub-backend

- 为啥要把文档拆出来呢？
分开存有啥好处呢？

冷热数据分开，刷文档列表只查 PG，速度很快
只有点开详情，才去 Mongo 拉 Markdown 正文

充分利用两个库各自长处：

PG 管筛选、分页、权限、统计，承载全部结构化业务数据
Mongo 专门放长文本，不会拖累列表查询性能

两边读写压力互不干扰，负载隔离

有同学可能会问，MongoDB 单个文档存储上限是 16M，那超了咋办呢？

其实不会的，因为我们会把图片外置，存到 oss，只保留图片链接



构化元数据放 PG 方便筛选统计；大段 markdown 正文放 Mongo，避免 PG 表膨胀、查询变慢，分开存储各司其职。
- pgadmin
  - 名称 knowledge_hub_postgres
  container 名字
  - 连接 
    - 主机名称/地址
    host.docker.internal
    - 端口
    5432
    - 数据库
    knowledge_hub
    - 用户名
    user
    - 密码
    123456

  - 架构-> public -> 表

- pnpm add @nestjs/typeorm typeorm pg @nestjs/mongoose mongoose @nestjs/config class-validator class-transformer snowflake-id

class-validator 配合装饰器校验类属性，自动校验入参，快速拦截非法数据。
class-transformer 用来做对象转换，把普通对象和类实例互相转，配合 class-validator 一起用。
snowflake-id 用于生成全局唯一的 ID