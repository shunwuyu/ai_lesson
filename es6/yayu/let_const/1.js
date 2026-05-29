// - 编译阶段 var a 被**提升（hoisting）**到了作用域（全局）顶部
// 但其赋值 a = 1 不会提升 
// 所以在执行 console.log(a) 时，a 已声明但尚未赋值，
// 默认值是 undefined。
// - 编译阶段 JavaScript 引擎（如 V8）在执行代码前，会先扫描一遍代码。
//     语法检查啊，等等
// - 执行阶段
// 执行到 console.log(a) 时，a 已经存在于当前作用域中（因为 var 提升），
// 但是还没有赋值，所以输出 undefined。
console.log(a);// undefined
var a = 1;

// 编译后被重写为
var a;           // 提升了声明
console.log(a);  // 此时 a 是 undefined
a = 1;           // 执行赋值

// 执行上下文
// 每次 JS 执行一个函数或全局代码时，会创建一个执行上下文
// （Execution Context）， Variable Environment（变量环境）
// 是其中之一
// 代码执行的时候就到当前环境查找

