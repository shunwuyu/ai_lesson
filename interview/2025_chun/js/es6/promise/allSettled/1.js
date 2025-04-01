/**
 * 自定义实现 Promise.allSettled
 * @param {Array<Promise>} promises - 一个包含多个 Promise 的数组
 * @returns {Promise} - 返回一个 Promise，解析为每个 Promise 的结果数组
 */
function allSettled(promises) {
    return new Promise((resolve) => {
        // 结果数组，用于存储每个 Promise 的结果
        const results = [];
        let completedCount = 0; // 记录已完成的 Promise 数量

        // 遍历每个 Promise
        promises.forEach((promise, index) => {
            // 确保每个元素都是 Promise
            Promise.resolve(promise)
                .then(value => {
                    // 如果 Promise 成功，存储结果
                    results[index] = { status: 'fulfilled', value };
                })
                .catch(reason => {
                    // 如果 Promise 失败，存储错误原因
                    results[index] = { status: 'rejected', reason };
                })
                .finally(() => {
                    // 每个 Promise 完成后增加计数
                    completedCount++;
                    // 如果所有 Promise 都已完成，解析结果
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('Error');
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, 3));

allSettled([promise1, promise2, promise3])
    .then(results => {
        console.log(results);
        // 输出:
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: 'Error' },
        //   { status: 'fulfilled', value: 3 }
        // ]
    });