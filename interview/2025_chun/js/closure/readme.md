# 闭包

https://juejin.cn/post/6844903858636849159?searchId=2025041710302521E5A93B56685A7E35EE

- 闭包是函数和其引用的外部变量组合形成的作用域。 javascript高级程序设计
- 闭包是函数记住并访问其定义时作用域的能力你不知道的javascript

- 闭包的方法是通过背包的类比。当一个函数被创建并传递或从另一个函数返回时，它会携带一个背包。背包中是函数声明时作用域内的所有变量。


- 理解闭包之前 了解js 执行上下文
  - 全局作用域 
  当我们启动程序时，我们从全局执行上下文中开始。一些变量是在全局执行上下文中声明的。我们称之为全局变量
  - 函数作用域
  当程序调用一个函数时， 会发生什么
  1. JavaScript创建一个新的执行上下文，我们叫作本地执行上下文。
  2. 这个本地执行上下文将有它自己的一组变量，这些变量将是这个执行上下文的本地变量。
  3. 新的执行上下文被推到到执行堆栈中。可以将执行堆栈看作是一种保存程序在其执行中的位置的容器。
  - 函数结束时
  函数什么时候结束?当它遇到一个return语句或一个结束括号}。

  1. 这个本地执行上下文从执行堆栈中弹出。
  2. 函数将返回值返回调用上下文。调用上下文是调用这个本地的执行上下文，它可以是全局执行上下文，也可以是另外一个本地的执行上下文。这取决于调用执行上下文来处理此时的返回值，返回的值可以是一个对象、一个数组、一个函数、一个布尔值等等，如果函数没有return语句，则返回undefined。
  3. 这个本地执行上下文被销毁，销毁是很重要，这个本地执行上下文中声明的所有变量都将被删除，不在有变量，这个就是为什么 称为本地执行上下文中自有的变量。

- 词法作用域
  一个函数可以访问在它的调用上下文中定义的变量，这个就是词法作用域
- 返回函数的函数
  函数可以返回任何东西。让我们看一个返回函数的函数示例，因为这对于理解闭包非常重要。





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

https://juejin.cn/post/6844903858636849159?searchId=2025041710302521E5A93B56685A7E35EE

- demo
  2.js  执行过程

- 词法作用域（Lexical scope）
  一个函数可以访问在它的调用上下文中定义的变量，这个就是词法作用域

  闭包的方法是通过背包的类比。

