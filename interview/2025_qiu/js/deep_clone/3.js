// 后面的会覆盖前面的。谁后谁说了算
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }