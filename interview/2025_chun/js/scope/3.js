var a = 10; // 全局变量

(function () { //  立即执行函数表达式（IIFE） 内部
    // 但函数声明的提升优先级高于变量声明。
  // [Function: a]
    console.log(a);        // 函数声明首先提升，并覆盖同名变量
  

  function a() {}
  var a = 20; // 赋值
  console.log(a);        // 输出 20 
})();

console.log(typeof a);   // 输出 number 全局