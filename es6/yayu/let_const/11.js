// 在文件 `11.js` 中，虽然 var value = "global"; 声明了一个全局变量 value ，但在函数和块级作用域内分别使用了 let 和 const 声明了同名的局部变量 value 。由于 let 和 const 存在暂时性死区（TDZ），在声明之前访问这些变量会导致 ReferenceError 。

// 具体原因如下：

// 1. 暂时性死区（TDZ） ： let 和 const 声明的变量在声明之前是不可访问的，即使外层作用域有同名变量。
// 2. 作用域优先级 ：在函数和块级作用域内， let 和 const 声明的局部变量会覆盖外层的同名变量，但在声明之前访问会触发 TDZ 错误。
// ReferenceError: Cannot access 'value' before initialization
var value = "global";

// 例子1
(function() {
    console.log(value);

    let value = 'local';
}());

// 例子2
{
    console.log(value);

    const value = 'local';
};