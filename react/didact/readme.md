- 元素（Element）与 createElement（JSX 的底层）

- 渲染：render（把 element -> DOM）

- 并发渲染（requestIdleCallback 工作循环）

- Fiber 数据结构与 performUnitOfWork

- 提交阶段（Commit）与更新（Reconciliation）

- 支持函数组件（Function Components）

- Hooks：useState（实现状态在 Hook 内的保存与更新）

- 完整合并代码 + 练习题

## Element 与 createElement

JSX 在编译后本质上会调用一个工厂函数（React.createElement）。我们自己实现一个返回轻量 element 对象的函数。

element = { type, props }，props.children 始终是数组。为原始文本创建 TEXT_ELEMENT 方便统一处理。