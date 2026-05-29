// bar 是一个对象，定义在全局作用域。
var bar = {
  myName:"time.geekbang.com",
  // 这个函数是在全局作用域中定义的（作为 bar 对象字面量的一部分），
  // 所以它的词法作用域是全局作用域。 outer 指向全局
  // 这意味着它会通过词法作用域（Lexical Scope）
  // 去查找 myName —— 也就是看它定义时所在的作用域中有没有 myName。
  printName: function () {
    // 引用了自由变量 myName
    //自由变量：在函数内部被使用但既不是该函数的参数
    // 也不是其局部变量、而是来自外层作用域的变量。
    console.log(myName)
    // console.log(this.myName);
  }    
}
function foo() {
  // 局部变量 
  let myName = "极客时间"
  // 返回了这个函数的引用
  // bar.printName 的词法作用域是在全局，不会因为从 foo 
  // 中返回就“捕获” foo 里的 myName。因为它不是在 foo 里定义的！
  return bar.printName
}
// 全局块级作用域
// 不是 window.myName 仍然是全局可访问的
// 
let myName = "极客邦"
// _printName 现在就是 bar.printName 函数的一个引用。
// 此时 foo 执行完毕，其内部的 myName = "极客时间" 
// 已经出栈销毁（即使没销毁，printName 也看不到它）。
let _printName = foo()
// 等价于 bar.printName()
// 调用这个函数时，它会在其**词法作用域（全局）**中查找 myName。
// 全局有一个 let myName = "极客邦"，所以输出： 👉 "极客邦"
_printName()
bar.printName()