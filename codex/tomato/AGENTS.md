# tomato — 项目约定

## 架构分层

- 计时核心逻辑放在 `timer-engine.ts`，不混入 DOM 操作。
  Date.now() 差值校准，setInterval 只做触发检查。
- 阶段管理（专注/休息流转、番茄计数）在 `phase-manager.ts`。
- localStorage 操作统一封装在 `storage.ts`，外部不直接读写 key。
- 组件是纯视图层，不持有业务状态，数据通过回调或参数传入。
- 每个番茄完成在 `app.ts` 的 `onComplete` 里集中处理：
  通知 → advance → 存记录 → switchMode → 更新 UI。

## 代码规范

- TypeScript strict 模式，`noUnusedLocals` 保持开启。
- 组件工厂函数返回的对象应包含 `destroy()` 方法，上层负责调用。
- 音频资源用 Web Audio API 生成，不放外部 MP3 文件。
- 计时器工厂接受回调对象 `{ onTick, onComplete }`，不抛出事件或 Promise。

## 扩展点

- 新增持久化字段 → 改 `storage.ts` 的接口定义和读写函数。
- 新增阶段类型（如长休息） → 改 `phase-manager.ts` 的状态机。
- 新增统计视图 → 新增 `src/components/` 文件，引用 `storage.ts` 的查询接口。
- 新增通知渠道 → 改 `notification.ts`。

## 目录约定

- `src/components/` — 视图组件，每个文件一个工厂函数。
- `src/*.ts`（非 components）— 纯逻辑模块，不导入 DOM API。
- 配置文件（`vite.config.ts`、`tsconfig.json`）保持最小，不引入未使用的插件。
- `dist/` 为构建产物，不提交。
