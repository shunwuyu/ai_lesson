# 闭包

闭包的本质是函数与其词法作用域（Lexical Scope）的绑定，即使外部函数执行完毕，其变量仍然能被内部函数访问。这种特性源于**执行上下文（Execution Context）**的持久化，使得 JavaScript 能模拟私有变量和数据封装。”

- 关键点
    - 内部函数引用了外部函数的变量。
    - 外部函数执行完毕后，变量不会被垃圾回收（GC），因为仍被内部函数引用
    - 形成一个私有作用域，避免外部直接访问。

- 作用域链
    闭包的核心在于作用域链（Scope Chain）的维护。当一个函数在其定义的作用域之外执行时，它仍然携带着对原始作用域的引用。这与 V8 引擎的持久化执行上下文优化有关，使得变量不会被回收。

    function counter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2

- 模块化 & 数据封装

“闭包是 JavaScript 实现数据私有化（Encapsulation）的基础，类似于 Java/C++ 的私有变量。在现代前端开发中，闭包常用于模块模式（Module Pattern）、事件监听、回调函数等场景。”

const CounterModule = (function () {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getCount());  // 1


- 柯里化
1.js

- 闭包应用
    函数防抖/节流 柯里化 记忆函数  Hooks 数据私有化 偏函数 ....
