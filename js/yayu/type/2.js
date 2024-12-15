// +0 是指正零，而 -0 是指负零
// 符号位不一样
console.log(1 / +0); // 输出: Infinity
console.log(1 / -0); // 输出: -Infinity
console.log(Object.is(5, 5)); // 输出: true
console.log(Object.is(+0, -0)); // 输出: false