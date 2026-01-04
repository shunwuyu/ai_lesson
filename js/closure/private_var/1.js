// “私有变量”和“数据封装”
// count 是函数作用域内的变量，外部无法直接访问，
// 只能通过返回对象的方法操作。
// 利用闭包实现了“私有变量”和“数据封装”，是经典模块模式的简化形式。
function createCounter() {
  let count = 0; // 私有变量

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1