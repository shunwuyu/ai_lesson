// NaN 是 JavaScript 中的一个特殊值
// 代表“不是一个数字”（Not-a-Number）
// 它用于表示一个无法表示的数值结果，
// 比如由数学运算产生的错误或未定义的结果。
console.log(parseInt("abc")) // NaN
console.log(typeof NaN) // number
console.log(2 * "a")
// 它不等于任何值，包括它自己
console.log(NaN === NaN, NaN == NaN)
console.log(isNaN(parseInt("abc")))
// es6
console.log(Number.isNaN(parseInt("abc")))