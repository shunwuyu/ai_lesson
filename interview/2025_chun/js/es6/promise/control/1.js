class ConcurrentPromise {
    constructor(limit) {
        this.limit = limit; // 最大并发数
        this.queue = []; // 存储待执行的任务
        this.activeCount = 0; // 当前正在执行的任务数量
    }

    // 添加任务
    add(promiseFn) {
        // 将任务添加到队列
        this.queue.push(promiseFn);
        this.run(); // 尝试运行任务
    }

    // 运行任务
    run() {
        // 如果当前正在执行的任务数量小于限制
        while (this.activeCount < this.limit && this.queue.length > 0) {
            const promiseFn = this.queue.shift(); // 从队列中取出任务
            this.activeCount++; // 增加正在执行的任务数量

            // 执行任务
            promiseFn().then(() => {
                this.activeCount--; // 任务完成，减少正在执行的数量
                this.run(); // 尝试运行下一个任务
            }).catch(() => {
                this.activeCount--; // 任务失败，减少正在执行的数量
                this.run(); // 尝试运行下一个任务
            });
        }
    }
}

// 使用示例
const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Completed after ${time}ms`);
            resolve();
        }, time);
    });
};

const concurrentPromise = new ConcurrentPromise(2); // 设置最大并发数为2

// 添加任务
concurrentPromise.add(() => delay(1000)); // 1秒任务
concurrentPromise.add(() => delay(500));  // 0.5秒任务
concurrentPromise.add(() => delay(2000)); // 2秒任务
concurrentPromise.add(() => delay(1500)); // 1.5秒任务