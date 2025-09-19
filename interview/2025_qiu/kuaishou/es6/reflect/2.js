const obj = {};

// 传统方式：操作失败可能静默或抛错，结果难判断
Object.defineProperty(obj, 'x', { value: 1, writable: false });
Object.defineProperty(obj, 'x', { value: 2 }); // 失败但不报错（严格模式下才报）

// Reflect：返回布尔值，明确成功与否
if (Reflect.defineProperty(obj, 'y', { value: 2 })) {
  console.log('属性定义成功');
} else {
  console.log('属性定义失败'); // 会执行这里
}