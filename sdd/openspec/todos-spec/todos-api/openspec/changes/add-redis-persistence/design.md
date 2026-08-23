# Redis 持久化设计文档

## Context

当前 `TodosService` 使用进程内 `Map<string, Todo>` 同步读写数据，`TodosController` 与 `TodosService` 均为同步方法。`TodosModule` 通过 `providers: [TodosService]` 直接注册，测试中以 `new TodosService()` 无参构造。

本设计的目标是将数据访问迁移到 Redis，同时保持现有 REST API 契约不变。动机见 `proposal.md` 的 Why 部分。

约束：

- 公司策略：禁止硬编码密钥/敏感信息、日志排除 PII、禁止未经审批的第三方库、数据库连接使用加密传输。
- 不引入 `@nestjs/config`、`class-validator` 等未经审批的第三方库；连接配置直接读取 `process.env`。

## Goals / Non-Goals

**Goals:**

- 用 Redis 作为 Todo 的唯一持久化数据源，替代内存 `Map`。
- 保持 `POST /todos`、`GET /todos`、`PATCH /todos/:id`、`DELETE /todos/:id` 的对外契约不变。
- 通过环境变量注入 Redis 连接，避免硬编码地址与凭据。
- 让 `TodosService` 可通过依赖注入替换 Redis 客户端，便于单元测试。

**Non-Goals:**

- 不做多实例分布式一致性设计（仅面向单 Redis 实例）。
- 不做缓存层或内存 + Redis 双写。
- 不做数据备份、过期策略或 Redis 高可用（Sentinel/Cluster）。
- 不改动输入校验规则与现有错误语义（`400`/`404`）。

## Decisions

### 1. Redis 客户端使用官方 `redis`（node-redis）包

选择 npm 包 `redis`，理由：Redis 官方维护、Promise API 成熟、类型支持良好。

备选方案：

- `ioredis`：社区流行、API 友好，但多引入一个非官方依赖。
- 使用 Node.js `net`/`tls` 自行实现最小 RESP 协议客户端：无第三方依赖，符合审批策略，但实现与维护成本高、易出错，不适合当前教学场景。

假设 `redis` 依赖在实现前已完成审批。若未获批，需退回原生 RESP 方案或使用 ioredis。

### 2. 使用单个 Redis Hash 存储全部 Todo

使用一个 Hash，键为 `todos`：

- field = Todo 的 `id`
- value = 序列化后的 Todo JSON 字符串

操作映射：

| Service 方法 | Redis 命令 |
| --- | --- |
| `create` | `HSET todos <id> <json>` |
| `findAll` | `HGETALL todos` |
| `updateCompleted` | `HGET todos <id>` + `HSET todos <id> <json>` |
| `remove` | `HDEL todos <id>` |

理由：一个 Hash 即可表达「按 id 读写 + 获取全部」，命令语义与现有 CRUD 方法一一对应，复杂度最低，且无需维护额外的索引结构。

备选方案：

- 每个 Todo 一个 String 键（`todo:<id>`）+ 额外 `Set` 维护 id 列表：需要两步操作与一致性维护。
- 单个 String 键存 JSON 数组：`findAll` 简单，但并发写存在整体覆盖风险。

### 3. 连接配置使用 `REDIS_URL` 环境变量

通过 `process.env.REDIS_URL` 注入连接地址，默认 `redis://localhost:6379`。使用 `createClient({ url })`。

理由：单一配置点、便于本地开发与部署。生产环境可改为 `rediss://` 以启用 TLS 加密传输，符合安全要求。连接串中的密码不打印到日志。

备选方案：`REDIS_HOST` + `REDIS_PORT` + `REDIS_PASSWORD` 分离配置，更细粒度但增加配置项与拼装逻辑。

### 4. 通过 NestJS Provider 注入 Redis 客户端

新增一个 provider，使用 token（如 `REDIS_CLIENT`）暴露 `createClient({ url })` 返回的客户端实例。`TodosService` 通过 `@Inject(REDIS_CLIENT)` 注入。

理由：便于在单元测试中注入 fake client，避免在 service 内部硬编码连接逻辑。模块加载时建立连接，应用关闭时断开连接（`onModuleDestroy` 或 provider 生命周期）。

备选方案：`TodosService` 内部自行创建并持有 client，实现简单但测试需依赖真实 Redis，可测性差。

### 5. `TodosService` 方法异步化

`create`、`findAll`、`updateCompleted`、`remove` 改为 `async` 并返回 `Promise`。`TodosController` 直接返回这些 Promise（NestJS 原生支持异步处理器），无需额外改动路由结构。

理由：`redis` 客户端命令均为异步 API，异步化是必要调整。

`id` 仍由 `crypto.randomUUID()` 生成，`createdAt` 仍由 `new Date().toISOString()` 生成，然后序列化写入 Redis。

### 6. 错误处理

- 输入校验（`title` trim、长度、`completed` 类型）保持现有逻辑，仍在访问 Redis 之前执行。
- `HGET` 未命中、`HDEL` 删除不存在的 field 时，抛 `NotFoundException`（404），与现有行为一致。
- Redis 连接失败或命令执行异常时，捕获并抛 `ServiceUnavailableException`（503），日志仅记录错误类型与 `id`，不记录 `title` 或连接凭据。

### 7. 测试策略

- 单元测试：构造 `TodosService` 时注入一个 fake Redis client（实现 `hSet`、`hGetAll`、`hGet`、`hDel` 等最小方法），验证校验分支、成功路径与 `404` 场景。现有 `new TodosService()` 无参构造需改为带依赖构造。
- e2e 测试：优先使用测试替身或独立测试 Redis；若使用真实 Redis，测试前清空 `todos` 键并保证端口可配置，避免污染开发数据。

## Risks / Trade-offs

- **Redis 不可用导致 Todo API 全部不可用** → 通过 `ServiceUnavailableException` 显式暴露 503，并在日志记录错误类型，便于定位；当前为单实例教学场景可接受。
- **引入 `redis` 第三方库需审批** → 在实现前完成审批；若未获批需切换方案（见 Decisions 1）。
- **数据仅存 Redis、无备份** → 明确为非目标；数据丢失风险由 Redis 自身持久化策略（RDB/AOF）承担。
- **并发一致性** → Redis Hash 单命令具备原子性；`updateCompleted` 的「读 + 写」两步在极端并发下存在竞态，但单实例教学场景可接受，后续如需强一致再引入 Lua 脚本或 WATCH。
- **JSON 序列化/反序列化失败** → 写入时由 `JSON.stringify` 保证输入可控；读取时对 `JSON.parse` 加 `try/catch`，解析失败记录错误并跳过或抛 503。

## Migration Plan

1. 完成 `redis` 依赖审批并安装。
2. 新增 Redis provider 与 `REDIS_CLIENT` token，读取 `REDIS_URL`。
3. 改造 `TodosService`：注入 client、方法异步化、迁移到 Hash 操作、补充 Redis 错误映射。
4. 更新 `TodosController` 返回类型为 `Promise`。
5. 更新 `todos.module.ts` 注册 provider。
6. 适配单元测试（注入 fake client）与 e2e 测试。
7. 本地启动 Redis，验证创建/查看/完成/删除及重启后数据保留。

## Open Questions

- e2e 测试使用真实 Redis 还是测试替身？
- 是否需要支持 Redis Sentinel/Cluster（当前仅单实例）？
- 是否需要为 Todo 数据设置 TTL 或归档策略？
