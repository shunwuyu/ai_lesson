# Todo Management 开发任务

基于 `design.md` 的实现计划拆分。按顺序执行，每个任务完成后可独立验证。

## 任务 1：创建 TodosModule 并注册到 AppModule

新增 `src/todos/todos.module.ts`，声明 `controllers: [TodosController]`、`providers: [TodosService]`；在 `src/app.module.ts` 的 `imports` 中加入 `TodosModule`。

- 为通过编译，先创建 `src/todos/todos.controller.ts` 与 `src/todos/todos.service.ts` 的最小占位类（空类），后续任务再填充实现。

**验收标准**：应用可启动，`TodosModule` 被成功加载。

## 任务 2：定义 Todo 实体与 DTO 类型

新增 `src/todos/todo.model.ts` 与 `src/todos/dto/` 下的类型定义。

- 定义 `Todo` 接口：`id`、`title`、`completed`、`createdAt`。
- 定义 `CreateTodoDto`：`{ title: string }`。
- 定义 `UpdateTodoDto`：`{ completed: boolean }`。
- 使用普通 TypeScript 类型，不引入 `class-validator`。

**验收标准**：类型文件可编译，字段与 `design.md` 数据模型一致。

## 任务 3：实现 TodosService 内存存储与业务逻辑

在 `src/todos/todos.service.ts` 中实现业务逻辑。

- 使用 `Map<string, Todo>` 作为进程内存储。
- 实现 `create`：校验并清理 `title`（非空、`string`、trim 后 1..200），生成 `crypto.randomUUID()`，默认 `completed: false`，写入 `createdAt`。
- 实现 `findAll`：返回全部 Todo。
- 实现 `updateCompleted`：按 `id` 更新 `completed`，不存在时抛 `NotFoundException`。
- 实现 `remove`：按 `id` 删除，不存在时抛 `NotFoundException`。
- 校验失败时抛 `BadRequestException`。
- 日志仅记录操作类型与 `id`，不记录 `title`。

**验收标准**：Service 方法满足 `design.md` 的输入校验、清理与错误处理规则。

## 任务 4：实现 TodosController 路由

在 `src/todos/todos.controller.ts` 中实现路由。

- `POST /todos`：调用 `create`，返回 `201` 与 Todo。
- `GET /todos`：调用 `findAll`，返回 `200` 与 Todo 数组。
- `PATCH /todos/:id`：调用 `updateCompleted`，返回 `200` 与更新后的 Todo。
- `DELETE /todos/:id`：调用 `remove`，返回 `204`。
- 使用 `@Controller('todos')` 声明路由前缀。

**验收标准**：路由与 `design.md` API 表一致，错误状态码正确映射（`400`/`404`）。

## 任务 5：编写 TodosService 单元测试

新增 `src/todos/todos.service.spec.ts`。

- 覆盖创建（成功、非法 title、title trim）。
- 覆盖查看全部。
- 覆盖完成 Todo（成功、不存在返回 404）。
- 覆盖删除（成功、不存在返回 404）。

**验收标准**：`npm run test` 通过，核心分支被覆盖。

## 任务 6：编写 TodosController e2e 测试

更新 `test/app.e2e-spec.ts` 或新增 `test/todos.e2e-spec.ts`。

- 覆盖 `POST /todos`、`GET /todos`、`PATCH /todos/:id`、`DELETE /todos/:id`。
- 覆盖非法输入 `400` 与不存在资源 `404`。

**验收标准**：`npm run test:e2e` 通过，验收标准中的四类操作均被验证。

## 任务 7：运行格式化、Lint 与全量测试

- 执行 `npm run format`。
- 执行 `npm run lint`。
- 执行 `npm run test` 与 `npm run test:e2e`。

**验收标准**：无 lint 错误，单测与 e2e 全部通过。
