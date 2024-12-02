const target = { a: 1, b: 2 };
const source1 = { b: 4, c: 5 };
const source2 = { d: 6 };

// 使用 Object.assign 将源对象的属性复制到目标对象
const result = Object.assign(target, source1, source2);

console.log(result); // 输出: { a: 1, b: 4, c: 5, d: 6 }