# PostgreSQL AI时代最适合的数据库
/ˈpoʊstɡrɛskjuːəl/

关系型数据库是互联网应用的基石。

账号信息、订单数据、聊天记录，或者企业的业务数据，几乎全部都依赖关系型数据库存储。

你用豆包、gemini 之类的 agent 的时候，不管多久的会话、聊天，都能翻到记录：
点开豆包看看
存在关系型数据库里的， 怎么设计表？
- 用户表存用户信息
- 每个会话放一个表
- 每条消息放一个表
两个表关联

当用户登录的时候，会查出所有的会话列表显示在左边，这用到表和表的关联查询，用户和会话是一对多关系

当点击某个会话的时候，会查询所有的历史消息，会话和消息也是一对多关系

id 是主键（primary key），用于表示表的一条记录（record）

user_id、conversation_id 是外键（foreign key），用于关联其他表的主键

通过这种主外键就可以实现表和表的关联查询

比如 sql 语句如下：

```
<!-- 根据用户ID 查询他的所有会话  按时间倒序-->
SELECT *
FROM conversations
WHERE user_id="你的用户ID"
ORDER BY created_at DESC
<!-- 根据会话ID 查询这个会话里的所有消息 -->
SELECT *
FROM messages
WHERE conversation_id="会话ID"
ORDER BY created_at ASC
```

MySQL、PostgreSQL（简称 PG）都是很流行的关系型数据库。

但在 AI 时代，PostgreSQL 优势更大。

因为消息内容需要加一个对应的向量字段用于语义检索：

mysql不支持， 你需要在milvus 里建一个对应的集合。

这里用同样的结构来创建 milvus 集合就行，id 和 shturl.cc/ 一致。

这样语义检索出数据后，可以关联到 MySQL 那边。

查询的时候是这样，写入的时候也要写两份，同样的数据要双写到 MySQL + Milvus，比较麻烦。

那如果关系型数据库也支持向量检索就好了。

没错，这就是 PostgreSQL 的最大优势。

PostgreSQL 只需要在原本的消息表上，多加一个向量字段，不需要额外的数据库，不需要双写，不需要维护两套系统。

所有消息、会话、用户数据、向量语义特征，全部存在同一张表里。

查询的时候更简单。不用先查 Milvus、再查 MySQL，再手动拼接结果。

一条 SQL 就能同时做到：

```
-- AI 长期记忆：根据用户ID + 会话ID +  语义检索历史消息
<!-- 内连接 SQL 里简写直接写 `JOIN`，默认等价 `INNER JOIN`
只返回两张表**匹配条件相等**的数据，两边都有才会查出。
SELECT u.name, o.goods
FROM users u
JOIN orders o 
ON u.id = o.user_id;   图
外连接分为：LEFT JOIN、RIGHT JOIN、FULL JOIN
SELECT u.name, o.goods
FROM users u
LEFT JOIN orders o 
ON u.id = o.user_id;
## 1. LEFT JOIN 左连接（左外连接）
**左边表全部保留，右边匹配不到填 NULL**
## 2. RIGHT JOIN 右连接（右外连接）
**右边表全部保留，左边匹配不到填 NULL**

SELECT u.name, o.goods
FROM users u
RIGHT JOIN orders o 
ON u.id = o.user_id;

## 3. FULL JOIN 全连接
SELECT u.name, o.goods
FROM users u
FULL JOIN orders o 
ON u.id = o.user_id;
**左右两边全部数据都保留，匹配不上填 NULL**
mysql 不原生支持 full join，PG（PostgreSQL）支持。
 -->
SELECT m.*
FROM messages m
JOIN conversations c
ON m.conversation_id = c.id
WHERE
  c.user_id = '你的用户ID' -- 只查这个用户
AND c.id = '你的会话ID' -- 只查这个会话
ORDERBY
  m.embedding <=> '[1.2, 0.5, 0.8, ...]' -- 向量相似度检索
LIMIT5;
小于等于大于 余弦距离运算符 
```

按用户过滤、按会话筛选、按时间排序、按语义检索。

这就是 AI 时代最需要的能力。

业务关系 + 向量检索，完美融合。

不用拆分架构，不用同步数据，不用写复杂的关联逻辑。

一张表，搞定传统关系查询 + AI 长期记忆。

所以你会发现 OpenAI、豆包、Kimi、通义千问、Dify 这些头部 AI 产品，几乎都把 PostgreSQL 当成核心数据库。

不是 MySQL 不好，而是在 AI 时代 PostgreSQL 真的太合适了。

## docker-compose.yml

init-scripts/ 初始化脚本目录
启动ui
连接

host.docker.internal

- create server 
  常规， 取名
  host.docker.internal
  user
  123456

  hello_pg
    Schemas
      Tables

      

- 建表语句
  - create_tables.sql
  serial 绑定序列实现整数自增，常用来做主键。
  - 执行

  可以把sql放到init-scripts/目录下
  
  SERIAL
  Postgres 的便捷写法，自动生成递增数字，拿来当 id 主键不用自己填值。

  CREATE INDEX IF NOT EXISTS idx_messages_embedding
    ON messages USING hnsw (embedding vector_cosine_ops);
  给 messages 表 embedding 向量字段创建 hnsw 余弦相似度向量索引，加速向量检索。


当然，这些 sql 不需要记住，大概理解就行，我们一般都是通过 ORM 框架来操作数据库。

比如前面讲过的 TypeORM。

创建 nest 项目：

nest new typeorm-pg-crud

pnpm install --save @nestjs/typeorm typeorm pg

TypeORM 模块配置，设置 pg 数据库连接信息，开启同步建表与 SQL 日志打印。

nest g res conversations --no-spec
Nest 命令，快速生成 conversations 全套 CRUD 模板代码，不生成 spec 测试文件。

TypeORM 实体，对应数据库表，类映射数据表，类属性对应表字段。

因为 user 只服务于 conversation，没必要单开 users 模块，就顺手放一起了。TypeORM 的 entity 其实放哪都行，只要被注册到数据源就行，这里纯图省事。