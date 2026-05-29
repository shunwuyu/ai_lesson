var value = "global";

(function() {
    console.log(value); // ReferenceError: Cannot access 'value' before initialization
    let value = 'local'; // 局部变量覆盖了外层的全局变量
}());

// 【1】执行上下文创建阶段：
// 创建一个词法环境（Lexical Environment）。

// 发现 let value 声明 → 在当前作用域中预留空间，但不会初始化为 undefined。

// 此时变量 value 进入了 暂时性死区（TDZ）：从词法环境创建到 let value 执行之间，不能访问该变量。

// 【2】执行阶段：
// 执行到 console.log(value) 时，JS 引擎发现局部作用域中有 let value，于是不会向上找全局的 var value。

// 但是这时 value 尚未初始化，处于 TDZ 中。

// 所以访问它会抛出：
// ReferenceError: Cannot access 'value' before initialization

// 暂时性死区（TDZ）的关键点：
// let / const 声明的变量在作用域中预注册，但不会被初始化为 undefined。

// 在声明之前访问变量会抛出错误，而不是返回 undefined（这是 var 的行为）。