let a = 10;
let b = a; // b 是 a 的副本

console.log(a); // 输出: 10
console.log(b); // 输出: 10

b = 20; // 修改 b 的值

console.log(a); // 输出: 10
console.log(b); // 输出: 20