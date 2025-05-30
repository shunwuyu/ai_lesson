// 闭包全局不合适，应改成局部的例子
// 不合适的做法：把大数据处理的闭包放在全局
// 全局闭包不合适：数据大、调用少、长期占内存。

// 局部闭包更合适：短期使用后自动回收，节省内存。
const processData = (function () {
    const bigArray = new Array(1_000_000).fill("data"); // 占用大量内存
  
    return function (index) {
      return bigArray[index];
    };
  })();
  
  // 只调用了一两次，但 bigArray 会一直占用内存直到页面关闭
  console.log(processData(0));
  

  function processData(index) {
    const bigArray = new Array(1_000_000).fill("data");
    return bigArray[index];
  }
  console.log(processData(0));