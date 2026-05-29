// myAsync：模拟 async 函数，接收一个生成器函数作为参数
function myAsync(generatorFn) {
  // 返回一个函数，可以接收调用时传入的参数（模拟 async 函数的参数）
  return function (...args) {
    // 使用传入的参数执行生成器函数，得到一个生成器对象
    const gen = generatorFn.apply(this, args);

    // 返回一个 Promise，模拟 async 函数返回 Promise 的特性
    return new Promise((resolve, reject) => {
      // 定义 step 函数，用于驱动生成器一步步执行
      // key: 调用 gen 的方法，如 'next' 或 'throw'
      // arg: 传给 gen 方法的参数（即 yield 返回的值或错误）
      function step(key, arg) {
        let result;
        try {
          // 执行生成器的方法，比如 gen.next(value) 或 gen.throw(error)
          result = gen[key](arg);
        } catch (error) {
          // 如果生成器内部抛错，直接 reject 整个 Promise
          return reject(error);
        }

        // 获取生成器返回的结果：value 是 yield 后的值，done 表示是否执行完毕
        const { value, done } = result;

        if (done) {
          // 如果生成器执行完成，将最终返回值 resolve
          return resolve(value);
        } else {
          // 如果还没完成，说明 value 是一个 Promise（或 thenable）
          // 使用 Promise.resolve 确保 value 是 Promise 类型
          // 然后等待它完成：
          //   - 成功：调用 step('next', res)，把结果传回给 yield
          //   - 失败：调用 step('throw', err)，在生成器中抛出错误
          Promise.resolve(value).then(
            (res) => step("next", res),
            (err) => step("throw", err)
          );
        }
      }

      // 启动执行：第一次调用 next，开始执行生成器
      step("next");
    });
  };
}

const asyncFn = myAsync(function* () {
  const data1 = yield fetch("https://api.github.com/shunwuyu/github/repos").then(res => res.json());
  const data2 = yield fetch("https://api.github.com/users/shunwuyu").then(res => res.json());
  return [data1, data2];
});

asyncFn().then(console.log);