// JavaScript 中的包装类（Wrapper Class）是为了方便操作原始值（如字符串、数字和布尔值），而临时创建的对象。
let str = "hello world";
// 使用字符串的方法，实际上创建了一个临时的 String 对象
console.log(str.length); // 输出: 11
console.log(str.toUpperCase()); // 输出: HELLO WORLD

let num = 123;
// 使用数字的方法，实际上创建了一个临时的 Number 对象
console.log(num.toString()); // 输出: "123"
console.log((1000).toFixed(2)); // 输出: "1000.00"