// for 循环 、while 循环 break
// forEach  不可以中途退出
const arr = [1, 2, 3, 4, 5];
Array.prototype.foo = 123
arr.forEach(num => {
  if (num === 3) {
    console.log('想要退出循环，但做不到');
    return; // 只是跳出当前这个回调，forEach 还会继续
  }
  console.log(num);
});
// for...in 和 for...of 也可以遍历数组，它们有很大的区别
// 可枚举属性的“键名”（索引）
// 稍慢 性能
// 语义混乱（用于对象更合适）
// 会遍历原型
// 支持 break、continue
for (const index in arr) {
    console.log(index, arr[index]);
}
// 可迭代对象的“值”
// 性能更稳定，顺序可靠
// 语义清晰
// 不会遍历原型x
for (const value of arr) {
    console.log(value);
}

// 如果我需要索引和值，我会结合 entries() 来使用 for...of：？
for (const [index, value] of arr.entries()) {
    console.log(index, value);
}