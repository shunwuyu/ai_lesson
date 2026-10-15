# Redis: 实现Agent 短期记忆存储的最佳方案

用户和 Agent 聊了几轮之后，对话上下文该存放在哪里呢？

CLIᵠ版(就是本地单机跑、命令行界面、能自主规划执行任务的智能代理程序)的单机 Agent 很简单：

所有对话历史（messages）、摘要(summary)都直接放在进程内存里，不需要任何外部存储。

但后端服务不一样：

线上服务一般会部署多个服务实例做负载均衡（多台服务器分摊用户请求，避免单点压力过大，提升系统扛量和可用性。），单实例内存无法共享会话数据；同时对话属于高频读写的热数据，对响应延迟要求极高（psql 数据库写入延迟高），删除会话 。

热数据
用户发消息：读旧对话，追加新 message → 读 + 写
Agent 回复：把模型输出写入会话 messages → 写
上下文截断：消息太多，删掉早期记录 → 读 + 写
生成摘要：读取全部消息，更新 summary 字段 → 读 + 写


服务器实例会有很多，请求随机分给不同机器。这次对话落到 A 实例、下次可能到 B，内存不互通，所以要用 Redis 共享会话。

这种场景下，最近几轮对话、动态截断、历史摘要，这些运行时上下文必须放在 Redis 里。

依靠 Redis 低延迟读写、天然支持 TTLᵠ过期（Time To Live）、多实例数据共享的特性，完美支撑短期会话运行。

Redis 只负责承载运行时短期记忆，不会长期保存数据。

每一条消息本身，最终都会异步写入 PostgreSQL 保存，作为永久的聊天记录和可语义检索的长期记忆。

写消息的流程是这样的：

- 用户发消息
- 写入 Redis（更新短期记忆）
- 同时写入 PostgreSQL（落库永久保存）
- 截断、摘要都在 Redis 里做
- 长期记忆检索从 PostgreSQL + 向量查

我们先学下 Redis，然后基于它实现短期记忆。

Redis 是一个高性能的键值型内存数据库，也是后端开发中最常用的缓存中间件之一。

它的数据默认都存在内存里，读写延迟通常在亚毫秒级，天生就适合处理像对话上下文这样的**高频读写**场景。

它的几个特性，刚好完美适配 Agent 短期记忆的需求：

- 支持 TTL（过期时间）Time To Live

会话闲置一段时间后，数据会**自动**过期清理，不用我们写额外的定时清理逻辑，非常省心。

- 多实例共享数据

所有 Agent 服务实例都能连接同一个 Redis，用户的会话上下文在任何实例上都能被读取，完美解决了负载均衡下的会话共享问题。

- 丰富的数据结构

我们可以用 List 直接存对话列表，用 Hash 存会话元信息，用 String 存对话摘要，实现起来非常灵活。

List 是双向链表，可从头尾增删数据。Agent 场景用它存储对话消息，按消息顺序 lpush/rpush 存入，读取时直接拿到完整会话列表。
Hash Agent 场景存会话元信息，比如会话 id、用户 id、会话创建时间，按字段读写，不用解析整个大字符串。
String Agent 场景用来存放对话历史摘要，直接读写完整摘要文本，简单高效。

- 支持持久化

如果需要，Redis 也能通过 RDB/AOF 做数据备份，避免极端情况下会话数据丢失，兼顾性能与可靠性。

就是只保留最近几条对话消息放在 Redis 里，旧消息超出窗口就截断，要么生成摘要，要么归档进 PG，控制上下文长度，不让传给大模型的内容无限变长。

来，咱们捋这套 Agent 记忆架构，很好懂。
用户发消息先过 API 网关，网关会把请求分给任意一个 Agent 服务实例，因为服务是多开分担压力的，所以不能把对话存在单个服务内存里。

短期活跃对话放 Redis，这里用滑动窗口，只留最近的消息，消息多了就做截断、生成摘要，读写快，还能自动过期，所有服务实例都能读到这份会话。

而完整的聊天记录不会丢，会异步归档到 PostgreSQL 长期存着，PG 里还做了向量索引。当 Agent 需要久远的信息时，就去 PG 做向量检索拉取长期记忆。

简单分两层：Redis 管正在聊的热对话，追求快；PG 存全部历史，用来做 RAG 查老内容，快慢分工明确。

接下来，我们就来用一下 Redis

创建项目：

docker-compose.yml
redis 端口被占用
redisinsight  webui
connect your database
add redis database    redis  6379 同一个网络 hello-redis
都在docker 运行， redis   hello-redis
add key manually
string zhangshan 20    永不过期
string  lisi     30 10s 过期 

执行命令  第二个按钮
SET wangwu 20 EX 15

redis 的数据结构、应用场景，代码里怎么操作都会了。

接下来我们可以实现刚开始的需求：

基于 redis 实现 agent 短期记忆的存储。

如何将 agent 短期记忆存储到 redis 中？

如何从 redis 中读取 agent 短期记忆？

redis 有哪些数据结构？



set key value nx ex 秒数  nx 不存在时才创建


hset key field value
hmset key field1 value1 field2 value2
hget key field
hgetall key // 返回 `field 和 value` 成对的列表，键 + 值一起给你
hkeys key   // 获取所有字段名
hvals key  // 获取所有字段值
hincrby key field 增量

lpush key value1 value2
rpush key value1 value2
lrange key 0 -1 // 获取所有元素
lpop key
rpop key
llen key // 获取列表长度



sadd key value1 value2
smembers key
sismember key value // 判断元素是否在集合中
sinter key1 key2   // 获取交集
sunion key1 key2 // 获取并集
sdiff key1 key2 // 获取差集


zadd key score member // 添加元素到集合，score 是元素的权重
zrange key 0 -1 // 获取所有元素，按权重排序 升序
zrevrange key 0 -1 // 获取所有元素，按权重倒序排序
zscore key member // 获取元素的权重
zrank key member // 获取元素的排名，从 0 开始
