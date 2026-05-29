// 创建一个对象
const obj = { a: 1, b: 2 };

// 使用 Object.values() 获取对象的所有值并转换为数组
// 然后通过数组解构赋值将值分别赋给变量 a 和 b
const [a, b] = Object.values(obj);

// 打印解构后的变量值
console.log(a); // 输出: 1
console.log(b); // 输出: 2