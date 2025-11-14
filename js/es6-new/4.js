console.log(12121212121212121212121212121212121);
// 最大的 
// 64 位划分为三部分 1 位：符号位（sign） 11 位：指数位（exponent） 
// 52 位：尾数（fraction / mantissa）
// 对于规格化浮点数，最高位总是 1，所以标准规定这个 1 
// 不用显式存储，而是隐含在表示中
console.log(Number.MAX_SAFE_INTEGER);// 2⁵³ - 1

// 1312312312n
console.log(1312312312n, typeof 1312312312n)
// 不是 ES6 新增的 计算幂
console.log(Math.pow(2, 3));
// ES2016（ES7）新增的语法，叫做 指数运算符
console.log(2 ** 10);