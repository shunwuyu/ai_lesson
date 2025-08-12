const target = { a: 1 };
const source = { b: 2 };

const result = Object.assign(target, source);

console.log(result); // { a: 1, b: 2 }
console.log(target); // { a: 1, b: 2 } —— 注意！target 被修改了！