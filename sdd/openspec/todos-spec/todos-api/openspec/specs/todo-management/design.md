# Todo Management 设计文档

## Context

当前项目是基于 NestJS 的脚手架，仅提供 `GET /` 返回 `Hello World!`。需要在现有工程中实现 Todo 管理能力，满足 `requirements.md` 中定义的创建、查看、完成、删除 Todo 四类操作。

设计目标是在不引入外部数据库和未经审批的第三方库的前提下，用最小复杂度交付可用的 REST API。

## Goals / Non-Goals

### Goals

- 提供 Todo 的创建、查看、完成、删除 REST API。
- 使用 NestJS 模块化结构组织代码。
- 对用户输入进行验证与清理。
- 使用进程内存储，保持实现简单。

### Non-Goals

- 用户认证与授权。
- 多用户数据隔离。
- 数据库持久化与分布式存储。
- 前端界面。
- 分页、排序、过滤等查询能力。

## 技术栈

- 运行时：Node.js
- 框架：NestJS 11
- 语言：TypeScript
- 存储：进程内内存存储（`Map`）
- 测试：Jest、Supertest

## 架构设计

### 模块划分

新增独立的 `TodosModule`，与现有 `AppModule` 解耦：

- `TodosController`：处理 HTTP 请求，负责路由、参数解析、响应与错误映射。
- `TodosService`：承载业务逻辑与内存数据访问。
- `Todo`：Todo 实体类型定义。
- `CreateTodoDto` / `UpdateTodoDto`：请求体形状定义（使用普通 TypeScript 类型，不引入 class-validator）。

`AppModule` 通过 `imports: [TodosModule]` 引入该模块。

### 数据模型

```ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
```

字段说明：

- `id`：唯一标识，使用 `crypto.randomUUID()` 生成。
- `title`：Todo 标题，经过 trim 后保存。
- `completed`：完成状态，创建时默认 `false`。
- `createdAt`：创建时间，ISO 8601 字符串。

### API 设计

| 方法 | 路径 | 说明 | 请求体 | 成功响应 |
| --- | --- | --- | --- | --- |
| `POST` | `/todos` | 创建 Todo | `{ "title": string }` | `201` + Todo |
| `GET` | `/todos` | 查看全部 Todo | - | `200` + Todo[] |
| `PATCH` | `/todos/:id` | 完成/更新 Todo | `{ "completed": boolean }` | `200` + Todo |
| `DELETE` | `/todos/:id` | 删除指定 Todo | - | `204` |

### 输入校验与清理

- `POST /todos`：
  - `title` 必须存在且为 `string`。
  - `title` 去除首尾空白后长度必须为 1 到 200。
  - 保存前对 `title` 执行 `trim()` 清理。
- `PATCH /todos/:id`：
  - `completed` 必须为 `boolean`。
- `:id` 路径参数按字符串处理，未命中时返回 `404`。

校验在 `TodosService` 或 Controller 层以轻量逻辑实现，避免引入 `class-validator`、`class-transformer` 等未经审批的第三方依赖。

### 错误处理

| 场景 | 状态码 |
| --- | --- |
| 请求体缺失或字段类型错误 | `400` |
| Todo 不存在 | `404` |

## Decisions

1. **使用进程内内存存储**：以 `Map<string, Todo>` 保存数据。实现简单、无外部依赖，符合当前教学与脚手架阶段，满足验收标准。重启丢失数据为可接受的非目标。

2. **`id` 使用 `crypto.randomUUID()`**：Node.js 内置能力，无需第三方 UUID 库，满足唯一性要求。

3. **完成操作用 `PATCH /todos/:id` 实现**：以部分更新语义修改 `completed`，语义清晰，便于后续扩展其他字段。

4. **不引入 `class-validator` / `class-transformer`**：符合公司「禁止使用未经审批的第三方库」策略，改用轻量手动校验。

5. **日志不记录用户输入**：遵循合规要求，日志仅记录操作类型与 `id`，不记录 `title` 等可能包含 PII 的内容。

## Alternatives Considered

- **SQLite / PostgreSQL 持久化**：可保留数据，但引入数据库依赖与连接管理，超出当前阶段范围，故不采用。
- **`PUT /todos/:id` 全量更新**：需要客户端提交完整对象，语义较重；`PATCH` 更贴合「完成 Todo」的最小变更需求。
- **引入 `class-validator` 做 DTO 校验**：可简化校验代码，但属于未经审批的第三方库，按公司策略不采用。

## Risks / Trade-offs

- **数据易失**：进程重启后数据丢失。当前为演示/教学场景可接受；若需持久化，后续可替换 `TodosService` 的存储实现，不影响 Controller 与外部契约。
- **并发一致性**：内存 Map 在单进程内操作，无需处理分布式并发；后续扩展多实例时需重新评估存储方案。
- **输入校验较原始**：手动校验覆盖面有限，但当前 API 字段简单，风险可控。

## Migration Plan

1. 新增 `todos` 模块目录与文件。
2. 在 `AppModule` 中注册 `TodosModule`。
3. 实现 `TodosService` 的内存存储与业务逻辑。
4. 实现 `TodosController` 路由与错误映射。
5. 补充单元测试与 e2e 测试。

## Open Questions

- `title` 长度上限是否需要调整（当前假设 200）？
- 是否需要在 `GET /todos` 增加分页或过滤参数？
- 是否需要支持批量删除或清空已完成 Todo？
