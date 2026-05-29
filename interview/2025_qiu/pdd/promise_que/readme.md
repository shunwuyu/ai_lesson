
题目描述 实现一个任务队列调度器 TaskScheduler，仅需满足以下核心功能： 初始化时可设置最大并发任务数（默认值为 2） 提供 addTask 方法，用于添加返回 Promise 的异步任务 系统会自动调度执行任务，始终保持不超过最大并发数的任务在运行 当前一个任务完成后，自动从队列中取出下一个任务执行// 示例任务 const task1 = () => new Promise(resolve => setTimeout(() => { console.log('任务1完成'); resolve(1); }, 1000) ); const task2 = () => new Promise(resolve => setTimeout(() => { console.log('任务2完成'); resolve(2); }, 2000) ); 给出思路和解法 const task3 = () => new Promise(resolve => setTimeout(() => { console.log('任务3完成'); resolve(3); }, 1500) ); const task4 = () => new Promise(resolve => setTimeout(() => { console.log('任务4完成'); resolve(4); }, 1000) ); // 测试代码 const scheduler = new TaskScheduler(2); scheduler.addTask(task1); scheduler.addTask(task2); scheduler.addTask(task3); scheduler.addTask(task4);


任务队列：保存等待执行的任务。

并发控制：同时运行的任务数量不超过 maxConcurrency。

自动调度：一个任务完成后，自动启动下一个任务。

用一个队列 queue 存储待执行任务。

用变量 runningCount 记录当前正在执行的任务数。

每次 addTask 时，先放入队列，然后调用 schedule 检查是否可以启动任务。

当任务完成后，runningCount--，再继续调度下一个。