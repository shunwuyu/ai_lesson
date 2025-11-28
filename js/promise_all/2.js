// 手写 Promise.all 的核心逻辑
Promise.all = function(promiseArr) {
  // 1. 初始化计数器 index：记录已经成功完成的 Promise 数量
  //    初始化结果数组 result：用于按原始顺序存储每个 Promise 的结果
  let index = 0, result = [];

  // 2. 返回一个新的 Promise，这是 Promise.all 的标准行为
  return new Promise((resolve, reject) => {
    
    // 3. 遍历传入的 promiseArr（可能是 Promise，也可能是普通值）
    promiseArr.forEach((p, i) => {
      
      // 4. 使用 Promise.resolve(p) 包装每一项：
      //    - 如果 p 本来就是 Promise，Promise.resolve 会直接返回它（穿透）
      //    - 如果 p 是普通值（如 42、"hello"），会被转为已 fulfilled 的 Promise
      //    这样确保后续 .then 能安全调用
      Promise.resolve(p).then(
        
        // 5. 成功回调（fulfilled）：
        val => {
          // 6. 计数器 +1，表示又有一个 Promise 成功完成了
          index++;
          
          // 7. 将当前 Promise 的结果 val 存入 result 数组的 **对应索引 i** 处
          //    ⚠️ 关键点：即使后面的 Promise 先完成，也会按原始顺序存放（i 不变）
          result[i] = val;
          
          // 8. 判断是否所有 Promise 都已完成（index 等于数组长度）
          if (index === promiseArr.length) {
            // 9. 如果全部成功，就 resolve 整个结果数组
            resolve(result);
          }
        },
        
        // 10. 失败回调（rejected）：
        err => {
          // 11. 只要任意一个 Promise reject，立即 reject 整个 Promise.all
          //     并且不再等待其他 Promise 的结果（符合规范）
          reject(err);
        }
      );
    });
  });
};