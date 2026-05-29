class TaskScheduler {
  constructor(maxConcurrency = 2) {
    this.maxConcurrency = maxConcurrency; // 最大并发数
    this.runningCount = 0;                 // 当前正在执行的任务数量
    this.queue = [];                        // 任务队列
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      // 包装任务，方便完成后触发下一轮调度
      const run = () => {
        this.runningCount++;
        task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.runningCount--;
            this.schedule(); // 任务完成后调度下一个
          });
      };
      this.queue.push(run);
      this.schedule();
    });
  }

  schedule() {
    // 在并发限制内取任务执行
    while (this.runningCount < this.maxConcurrency && this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
  }
}

const task1 = () => new Promise(resolve => 
  setTimeout(() => { console.log('任务1完成'); resolve(1); }, 1000)
);
const task2 = () => new Promise(resolve => 
  setTimeout(() => { console.log('任务2完成'); resolve(2); }, 2000)
);
const task3 = () => new Promise(resolve => 
  setTimeout(() => { console.log('任务3完成'); resolve(3); }, 1500)
);
const task4 = () => new Promise(resolve => 
  setTimeout(() => { console.log('任务4完成'); resolve(4); }, 1000)
);

const scheduler = new TaskScheduler(2);
scheduler.addTask(task1);
scheduler.addTask(task2);
scheduler.addTask(task3);
scheduler.addTask(task4);
