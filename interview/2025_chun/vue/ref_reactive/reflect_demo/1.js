const obj = { a: 1 };
const proto = { b: 2 };
Object.setPrototypeOf(obj, proto);

console.log(obj.a); // 输出: 1
console.log(obj.b); // 输出: 2
console.log(obj.c); // 输出: undefined
console.log(obj.__proto__);