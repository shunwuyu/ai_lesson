// 构造函数 没有提供任何参数时返回的false
console.log(Boolean()) // false
// 
console.log(Boolean(false)) // false
console.log(Boolean(true)) // true 

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(1), '1') 
console.log(Boolean(0), '0') // false
console.log(Boolean(NaN)) // false
console.log(Boolean("")) // false
