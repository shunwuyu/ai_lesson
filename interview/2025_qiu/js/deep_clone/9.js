// Object.assign 会复制所有可枚举属性，包括 Symbol。
const s = Symbol('id');
const source = { [s]: 123, a: 1 };

const target = {};
Object.assign(target, source);

console.log(target[s], target); // 123 —— Symbol 属性也被复制了！