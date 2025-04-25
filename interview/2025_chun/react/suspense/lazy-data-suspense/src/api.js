// api.js
// 返回一个经过包装的Promise，可以与React Suspense配合使用
export function fetchRepos() {
    // 使用fetch获取数据并转换为JSON格式
    const promise = fetch('https://api.github.com/users/shunwuyu/repos')
      .then(res => res.json());
  
    return wrapPromise(promise);
}
// Promise包装器函数，将普通Promise转换为Suspense兼容格式
  // 包装 Promise 以配合 Suspense 使用
  function wrapPromise(promise) {
    let status = 'pending';
    // 用于存储Promise完成后的结果
    let result;
    // suspender用于存储原始Promise
    let suspender = promise.then(
      r => {
        status = 'success';
        result = r;
      },
      e => {
        status = 'error';
        result = e;
      }
    );
    // 返回一个带有read方法的对象
    return {
        /**
         * read方法是与Suspense配合工作的关键
         * - 如果Promise还在进行中，抛出Promise本身（Suspense会捕获这个Promise）
         * - 如果Promise失败，抛出错误（错误边界可以捕获）
         * - 如果Promise成功，返回数据
         */
      read() {
        if (status === 'pending') {
          throw suspender;
        } else if (status === 'error') {
          throw result;
        } else if (status === 'success') {
          return result;
        }
      }
    };
  }