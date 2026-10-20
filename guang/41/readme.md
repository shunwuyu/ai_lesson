# RabbitMQ Agent 中异步处理的标配方案

## RabbitMQ

RAG 流程里，pdf、docx、pptx 等各类文档上传后会解析为 markdown 格式
然后会分片存入向量数据库（比如 Milvus），会存入 ElasticSearch 做全文检索。
那解析的接口做向量化、ES 存储，需要同步等它们完成么？
很明显没必要，这俩完全可以异步来做。
后端如果想做异步处理，一般都是用**消息队列 MQ**，比如 RabbitMQ

**Advanced Message Queuing Protocol**，中文：**高级消息队列协议**抖音百科。
RabbitMQ 就是经典的 AMQP 实现。

- 为什么不用Promise.all?
Promise.all 是同进程内的并发；MQ 是跨进程、持久化的异步，任务独立存在，服务重启也能继续消费,更专业。

解析完文档得到 Markdown 后，往 MQ 发一条消息
两个消费者收到消息后，分别做不同的处理。
RabbitMQ 的架构是这样的：

Producer 和 Consumer 分别是生产者和消费者。
Connection 是客户端与 RabbitMQ 服务之间的 TCP 物理连接。
我们不会每次收发消息都新建独立 Connection，因为 TCP 连接创建开销较高；
所以在一条 Connection 内部划分多条逻辑通道，也就是 Channel。
生产者和消费者都是绑定到具体的 channel 来收发消息。
Queue 队列，是真正存放消息的容器，消息最终存在队列中等待消费者处理。
整套承载消息接收、路由、转发的 RabbitMQ 服务实例，统称为 Broker。
至于 Exchange，这个是把消息放到不同的队列里用的，叫做交换机。
它负责把我们发的消息按照规则放入不同的 Queue 里。


单 TCP 连接上分出多个逻辑通道

Exchange 主要有 4 种：

- fanout：把消息放到这个交换机的所有 Queue
- direct：把消息放到交换机的指定 key 的队列
- topic：把消息放到交换机的指定 key 的队列，支持模糊匹配
- headers：把消息放到交换机的满足某些 header 的队列
