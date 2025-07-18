// for...in 以普通对象的方式来遍历数组，
// 这意味着，如果数组对象上有其他属性，很可能也被遍历出来，
// for...in 遍历的是对象的 可枚举属性名（字符串），而不是数组的数值索引
const arr = [1,2,3];
arr.name = '张三';
// arr.map
for (let key in arr) {
  console.log(arr[key]);
}
// 不可以枚举
console.log(Object.getOwnPropertyDescriptor(Array.prototype, 'find'))
// 建议
for (let item of arr) {
  console.log(item);
}
// 既要值，也要索引
for (const [index, value] of arr.entries()) {
    console.log(index, value);
}