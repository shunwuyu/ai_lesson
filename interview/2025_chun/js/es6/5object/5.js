// 基本合并
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const result = Object.assign(target, source);

console.log(target);  // { a: 1, b: 4, c: 5 }
console.log(result);  // { a: 1, b: 4, c: 5 }
console.log(target === result);  // true

// const merged = Object.assign({}, obj1, obj2, obj3);