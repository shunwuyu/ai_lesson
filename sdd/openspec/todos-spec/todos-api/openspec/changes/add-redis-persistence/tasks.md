## 1. 依赖与配置

- [x] 1.1 完成 `redis` 第三方库审批，并通过 `npm install redis` 添加到 `package.json`，验证安装命令成功且无依赖冲突
- [x] 1.2 新增 `REDIS_CLIENT` provider，使用 `process.env.REDIS_URL`（默认 `redis://localhost:6379`）创建 Redis 客户端，验证文件存在且 `npm run build` 通过

## 2. TodosService 改造

- [x] 2.1 在 `TodosService` 中通过 `@Inject(REDIS_CLIENT)` 注入客户端，并将 `create`/`findAll`/`updateCompleted`/`remove` 改为 async，迁移到 Hash 操作（HSET/HGETALL/HGET/HDEL），验证 `npm run build` 通过
- [x] 2.2 实现 JSON 序列化/反序列化与 Redis 错误映射（命令失败抛 `ServiceUnavailableException`），验证非法 JSON 与命令失败路径有处理
- [x] 2.3 在 `todos.module.ts` 中注册 Redis provider，验证应用可启动且 `TodosModule` 正常加载

## 3. Controller 适配

- [x] 3.1 将 `TodosController` 各处理器返回类型改为 `Promise`，验证编译通过且 NestJS 路由解析正常

## 4. 测试

- [x] 4.1 更新 `todos.service.spec.ts`，注入 fake Redis client，覆盖创建/查看/完成/删除成功路径及 `400`/`404` 校验分支，验证 `npm run test` 通过
- [x] 4.2 更新 e2e 测试以适配 Redis（使用测试替身或独立测试实例），覆盖四类接口及重启后数据保留场景，验证 `npm run test:e2e` 通过
- [x] 4.3 本地启动 Redis，手动或脚本验证创建/查看/完成/删除操作及服务重启后数据仍保留

## 5. 收尾

- [x] 5.1 运行 `npm run format`、`npm run lint`、`npm run test`、`npm run test:e2e`，验证无 lint 错误且全部测试通过
