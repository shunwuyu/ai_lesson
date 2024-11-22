let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 是 obj1 的引用

console.log(obj1); // 输出: { name: 'Alice' }
console.log(obj2); // 输出: { name: 'Alice' }

obj2.name = 'Bob'; // 修改 obj2 的属性

console.log(obj1); // 输出: { name: 'Bob' }
console.log(obj2); // 输出: { name: 'Bob' }