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

## 大文件上传

- 在大文件上传系统中，sessionId（会话 ID）是一个非常关键的设计，它在整个分片上传、断点续传、状态追踪和恢复过程中起着核心作用。
sessionId 是一个唯一标识符，用来标记一次“上传会话”（Upload Session），服务器通过它来识别和管理同一个文件的多个分片上传过程。

为什么需要 sessionId？
1. 标识一次上传任务（而非文件）
一个文件可能被多次上传（比如失败重试、不同用户上传同名文件）。
sessionId 保证了每次上传是独立的，即使文件名、大小、哈希都一样。
服务器用 sessionId 区分不同的上传行为。

2. 支持断点续传（Resume Upload）
这是 sessionId 最重要的用途之一。

当你暂停上传或网络中断，客户端下次恢复时，带着原来的 sessionId 去查询：

服务器返回哪些分片已经上传成功（uploaded: [1, 3, 5]），客户端就知道从哪些分片继续传。
没有 sessionId，服务器无法知道“你是谁”、“你传到哪了”。


3. 管理临时文件和状态
服务器为每个 sessionId 维护一个上传状态：
已上传的分片列表
上传是否暂停
文件元信息（文件名、总大小、分片大小等）
临时存储路径（如 /tmp/uploads/abc123/）
上传完成后，服务器根据 sessionId 把所有分片合并成完整文件。
成功或超时后，清理该 sessionId 对应的资源。

4. 实现秒传（Instant Upload）
客户端上传前发送文件哈希（如 chunkedSha256）。
服务端检查这个哈希是否已存在：
如果存在 → 返回 { instant: true, fileId: 'xxx' }，跳过上传。
如果不存在 → 创建新 sessionId，开始分片上传。
sessionId 是连接“哈希验证”和“分片上传”的桥梁。

5. 防止并发冲突
多个用户同时上传不同文件，sessionId 确保他们的分片不会混在一起。
即使分片命名只是 chunk_1, chunk_2，也通过目录 /uploads/${sessionId}/chunk_1 隔离。

6. 支持暂停/恢复语义
onPause()：客户端设置 paused = true，但不删除 sessionId。
onResume()：用同一个 sessionId 重新拉取状态，继续上传。
如果没有 sessionId，恢复时就只能重新开始。


-   <Button onClick={start} disabled={!file || !hash}>
    只有当用户选择了文件，且后台/worker 已经算好了文件的 hash（文件指纹），才能点击上传。

- 上传图片 + hash计算得到值再能上传

- 怎么计算hash?
    先将文件按固定大小切片，计算每个分片的 SHA256 哈希值，再将所有分片的哈希值按顺序拼接成一个字符串，对该字符串再次计算 SHA256，得到的结果就是这个文件的 chunkedSha256 指纹。

