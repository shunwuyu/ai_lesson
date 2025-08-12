const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3, d: 4 };

Object.assign(target, source1, source2);

console.log(target); // { a: 1, b: 2, c: 3, d: 4 }