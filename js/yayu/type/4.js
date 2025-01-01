console.log(Number())  // 0
// undefined 表示一个未定义或不存在的值，
// 在数值上下文中没有意义，所以无法转换成一个具体的数字。
console.log(Number(undefined)) // NaN
// null 在 JavaScript 中表示一个空值或对象不存在，
// 但在数值上下文中，它被视为不存在的对象或值，因此被转换为零。
console.log(Number(null)) // 0 
console.log(Number(false)) // 0
console.log(Number(true)) // 1
// 如果字符串只包含数字（包括正负号和小数点），那么它会被正确地解析为对应的数值。
// 如果字符串以数字开始但后面跟着非数字字符（如字母、特殊符号等），Number()
//  函数不会尝试解析部分字符串；相反，整个转换操作会被认为是失败的，并返回 NaN
console.log(Number("123")) // 123
console.log(Number("-123")) // -123
console.log(Number("1.2")) // 1.2
console.log(Number("000123")) // 123
console.log(Number("-000123")) // -123
// 16进制
console.log(Number("0x11"))  // 17
console.log(Number("")) // 0
console.log(Number(" ")) // 0
console.log(Number("123 123")) // NaN
console.log(Number("foo")) // NaN
console.log(Number("100a")) // NaN
