let obj = {};
Object.defineProperty(obj, 'prop', {
  value: 10,
  writable: false,     // 不能修改值
  configurable: false,  // 可以删除或修改属性描述 切换false
  enumerable: true
});

// 修改属性的值（失败，严格模式下会抛出TypeError writeable）
obj.prop = 20; 
console.log(obj.prop); // 输出: 10

// 删除属性（成功）
// delete obj.prop;
// console.log(obj.prop); // 输出: undefined

// // 重新定义属性
Object.defineProperty(obj, 'prop', { value: 30, writable: true });
console.log(obj.prop); // 输出: 30