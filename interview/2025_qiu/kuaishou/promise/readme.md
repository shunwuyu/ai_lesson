已知一组异步任务，每个任务有唯一的 id，并且可能依赖其他任务。
要求实现一个函数 runTasks(tasks)，
考察点：
Promise 基础（会写 Promise.all 并行/顺序执行）。
任务依赖调度（拓扑排序思想）。
代码实现能力（要能实现一个简单的任务调度器）。


- 所有依赖完成后才能执行该任务；
- 如果多个任务之间没有依赖关系，则它们可以并行执行；
- 返回一个 Promise，当所有任务执行完毕后 resolve。

```
const tasks = [
  { id: 'A', run: () => Promise.resolve('A done'), deps: [] },
  { id: 'B', run: () => Promise.resolve('B done'), deps: ['A'] },
  { id: 'C', run: () => Promise.resolve('C done'), deps: ['A'] },
  { id: 'D', run: () => Promise.resolve('D done'), deps: ['B', 'C'] },
];

```

任务执行顺序：A → (B 和 C 并行) → D。
runTasks(tasks) 返回的 Promise resolve 值可以是所有任务结果组成的 Map 或数组，例如：

拓扑排序是对有向无环图（DAG）进行线性排序，使得对于每一条有向边 (u, v)，节点 u 在排序中总是位于节点 v 的前面，常用于解决任务调度、依赖关系等先后顺序问题。


解答思路

建图：把任务和依赖关系抽象为有向图。

拓扑排序：

入度为 0 的任务（没有依赖）先执行；

当某个任务完成时，把它的结果记录下来，同时减少依赖它的任务的入度；

如果一个任务的入度变成 0，就可以并行执行它。

Promise 并行：用 Promise.all 启动多个入度为 0 的任务。

整体完成：所有任务执行完后 resolve。

