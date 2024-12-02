const arr = [];

// 尝试使用 Object.defineProperty 使数组的某个索引响应式
Object.defineProperty(arr, '0', {
  get() {
    return this._0;
  },
  set(newVal) {
    this._0 = newVal;
    console.log('Element at index 0 changed to', newVal);
  },
  configurable: true,
  enumerable: true
});

// 设置数组的第一个元素
arr[0] = 1; // 输出: Element at index 0 changed to 1
console.log(arr[0]); // 1

// 数组的 length 属性没有更新
console.log(arr.length); // 0，而不是 1

// 尝试使用 push 方法
arr.push(2);
console.log(arr); // [1, 2]
console.log(arr.length); // 2，但是没有输出 "Element at index 1 changed to 2"

// 尝试动态添加新属性
arr[1] = 3;
console.log(arr); // [1, 3]