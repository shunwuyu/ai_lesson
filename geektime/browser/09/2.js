// 全局作用域
var globalVar = "我是全局变量";

function myFunction() {
    // 函数作用域
    var localVar = "我是局部变量";
    console.log(globalVar); // 可以访问全局变量
    console.log(localVar);  // 访问局部变量
}

myFunction();
console.log(globalVar);     // 正常输出
// console.log(localVar);   // ❌ 报错！localVar 未定义