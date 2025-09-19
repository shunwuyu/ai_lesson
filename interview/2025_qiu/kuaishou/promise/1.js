/**
 * 并发执行一组有依赖关系的异步任务（拓扑排序调度）
 * @param {Array} tasks - 任务数组，每个任务包含 id、deps（依赖的 task id 数组）和 run（异步执行函数）
 * @returns {Object} 所有任务执行结果，以 task.id 为键
 */
async function runTasks(tasks) {
  // 创建一个 Map：id -> 任务对象，便于快速查找任务
  const taskMap = new Map(tasks.map(t => [t.id, t]));
  console.log(taskMap, '////////');
  // 记录每个任务的“入度”（即还剩多少个依赖未完成）
  // 初始化为 deps.length，表示初始时需要等待这么多依赖完成
  const indegree = new Map(tasks.map(t => [t.id, t.deps.length]));
  console.log(indegree, '???');
  // 存储最终每个任务的执行结果
  const result = {};

  // 初始化：找出所有没有依赖的任务（入度为0），这些任务可以立即执行
  let ready = tasks.filter(t => t.deps.length === 0).map(t => t.id);
  console.log(ready);
  /**
   * 执行单个任务的函数
   * @param {string} id - 要执行的任务 ID
   */
  async function run(id) {
    const task = taskMap.get(id);           // 获取任务对象
    const output = await task.run();        // 异步执行任务的 run 函数
    result[id] = output;                    // 保存执行结果

    // 遍历所有其他任务，检查是否有任务依赖当前任务（id）
    for (const [tid, t] of taskMap) {
      // 如果某个任务 t 的依赖列表中包含当前完成的任务 id
      if (t.deps.includes(id)) {
        // 将该任务 tid 的入度减一（因为一个依赖完成了）
        indegree.set(tid, indegree.get(tid) - 1);

        // 如果 tid 的所有依赖都已完成（入度为0）
        if (indegree.get(tid) === 0) {
          // 将其加入下一批可执行任务队列
          ready.push(tid);
        }
      }
    }
  }

  // 主循环：按“批次”并发执行任务
  while (ready.length > 0) {
    // 取出当前所有可执行的任务（同一层，无相互依赖或依赖已满足）
    const currentBatch = [...ready];  // 浅拷贝，避免后续 push 影响本次执行
    ready = [];                       // 清空，准备收集下一批任务

    // 并发执行当前批次的所有任务
    // Promise.all 等待这一批全部完成后再进入下一轮
    await Promise.all(currentBatch.map(run));
  }

  // 所有任务执行完毕，返回结果对象
  return result;
}


const tasks = [
  { id: 'A', run: () => new Promise(res => setTimeout(() => res('A done'), 5000)), deps: [] },
  { id: 'B', run: () => Promise.resolve('B done'), deps: ['A'] },
  { id: 'C', run: () => Promise.resolve('C done'), deps: ['A'] },
  { id: 'D', run: () => Promise.resolve('D done'), deps: ['B', 'C'] },
];

runTasks(tasks).then(res => console.log(res));