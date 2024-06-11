function add(a) {
    // 返回一个接受第二个参数b的内部函数
    return function(b) {
      // 计算并返回a + b的结果
      return a + b;
    };
  }
  
  // 使用示例
  const addFive = add(5); // 创建一个已经固定了a=5的函数addFive
  console.log(addFive(3)); // 输出8，相当于执行add(5, 3)