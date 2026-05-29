let obj = {};
Object.defineProperty(obj, 'visibleProp', {
  value: 'You can see me',
  writable: true,
  configurable: true,
  enumerable: true // 可枚举
});

Object.defineProperty(obj, 'hiddenProp', {
  value: 'You cannot see me',
  writable: true,
  configurable: true,
  enumerable: false // 不可枚举
});

// 使用 for...in 循环遍历对象的属性
for (let key in obj) {
  console.log(key + ': ' + obj[key]); // 仅输出 visibleProp 的值
}

// 使用 Object.keys 获取对象自身可枚举属性的数组
console.log(Object.keys(obj)); // 输出 ["visibleProp"]