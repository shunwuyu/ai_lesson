class MyPromise {
    constructor(executor) {
        // 初始化状态
        this.state = 'pending'; // 状态: pending, fulfilled, rejected
        this.value = undefined;  // 成功时的值
        this.reason = undefined;  // 失败时的原因
        this.onFulfilledCallbacks = []; // 存储成功回调
        this.onRejectedCallbacks = []; // 存储失败回调

        // 执行传入的 executor 函数
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error); // 捕获 executor 中的异常
        }
    }

    // 成功时调用
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled'; // 更新状态
            this.value = value; // 保存成功的值
            // 执行所有成功回调
            this.onFulfilledCallbacks.forEach(callback => callback(value));
        }
    }

    // 失败时调用
    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected'; // 更新状态
            this.reason = reason; // 保存失败的原因
            // 执行所有失败回调
            this.onRejectedCallbacks.forEach(callback => callback(reason));
        }
    }

    // then 方法
    then(onFulfilled, onRejected) {
        // 返回一个新的 Promise
        return new MyPromise((resolve, reject) => {
            // 处理成功情况
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value); // 执行成功回调
                    resolve(result); // 解析新的 Promise
                } catch (error) {
                    reject(error); // 捕获异常并拒绝
                }
            };

            // 处理失败情况
            const handleRejected = () => {
                try {
                    const result = onRejected(this.reason); // 执行失败回调
                    resolve(result); // 解析新的 Promise
                } catch (error) {
                    reject(error); // 捕获异常并拒绝
                }
            };

            // 根据状态决定执行哪个回调
            if (this.state === 'fulfilled') {
                handleFulfilled();
            } else if (this.state === 'rejected') {
                handleRejected();
            } else {
                // 如果状态是 pending，存储回调
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }
}

// 使用示例
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!'); // 模拟异步操作成功
    }, 1000);
});

promise.then(value => {
    console.log(value); // 输出: Success!
}).catch(error => {
    console.error(error);
});