// ES6 增加了箭头函数
// let func = function (value) {
//     return value;
// };
// 
// let func = value => value;

// 多个参数：
// let func = (value, num) => value * num;
// 如果函数的代码块需要多条语句：
// let func = (value, num) => {
//     return value * num
// };

// 如果需要直接返回一个对象：
// 为了防止大括号被解析为函数体，而不是对象字面量
// () 是表达式分组符
let func = (value, num) => ({total: value * num});