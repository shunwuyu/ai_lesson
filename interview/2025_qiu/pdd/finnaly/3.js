// 成功和失败都要写一遍处理逻辑
// 容易忘记 return 或 throw，导致值被吞或流程中断
// 代码重复，不够简洁
Promise.resolve('hello')
  .then(
    (value) => {
      console.log('success:', value);
      return value; // 必须手动返回原值，否则中断
    },
    (error) => {
      console.log('error:', error);
      throw error; // 必须手动抛出，否则吞掉错误
    }
  );

  Promise.resolve('hello')
  .finally(() => {
    console.log('清理资源，无论成功失败都执行');
    // 不用 return，不用 throw
    // 原始值自动透传
  })
  .then((value) => {
    console.log(value); // 输出: hello
  })
  .catch((err) => {
    console.log(err); // 输出: 出错了
  });

