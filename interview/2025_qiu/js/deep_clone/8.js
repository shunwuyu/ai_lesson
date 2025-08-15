// 快速创建对象副本（浅拷贝）
const original = { x: 1, y: 2 };
const copy = Object.assign({}, original);

copy.x = 999;
console.log(original.x); // 1 —— 没被影响（因为是基本类型）