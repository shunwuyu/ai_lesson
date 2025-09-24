// promise.allSetted()是接收一个 Promise 数组，等待所有 Promise 完成（无论成功或失败），并返回一个包含每个 Promise 结果的对象数组。
// promise.race()接收一个 Promise 数组，返回第一个完成（无论成功或失败）的 Promise 的结果。
// promise.all()接收一个 Promise 数组，当所有 Promise 都成功时返回一个包含所有结果的数组；如果任何一个 Promise 失败，则立即返回失败的结果。

function promiseAllSettled(iterable) {
  // 返回一个新 Promise
  return new Promise((resolve) => {
    const results = [];
    let completedCount = 0;
    const len = iterable.length;

    // 空数组直接返回
    if (len === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < len; i++) {
      // 包装成 Promise，防止非 Promise 值
      Promise.resolve(iterable[i])
        .then(
          (value) => {
            results[i] = { status: 'fulfilled', value };
          },
          (reason) => {
            results[i] = { status: 'rejected', reason };
          }
        )
        .finally(() => {
          completedCount++;
          if (completedCount === len) {
            resolve(results);
          }
        });
    }
  });
}