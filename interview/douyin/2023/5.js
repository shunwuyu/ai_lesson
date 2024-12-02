function serialPromiseExecution(promiseArray) {
    return promiseArray.reduce((chain, currentPromiseFn) => {
      // 确保 currentPromiseFn 是一个返回 Promise 的函数
      if (typeof currentPromiseFn !== 'function') {
        throw new Error('All elements in the array must be functions that return a Promise');
      }
  
      // 使用上一个 Promise 的结果作为下一个 Promise 的输入（如果需要的话）
      return chain.then((previousResult) => 
        currentPromiseFn(previousResult)
          .catch((error) => { // 捕获并传播错误，保持整个链的稳定性
            throw error;
          })
      );
    }, Promise.resolve()); // 初始化为 resolved Promise，初始值为空
  }
  
  // 示例：
  const promises = [
    () => Promise.resolve(1),
    (value) => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(value + 1)
            }, 2000)
        })
    },
    // (value) => Promise.resolve(value + 1),
    (value) => Promise.resolve(value + 2),
  ];
  
  serialPromiseExecution(promises)
    .then(finalResult => console.log(finalResult)) // 输出：4
    .catch(err => console.error('Error in the promise chain:', err));