let obj = {};

Object.defineProperty(obj, 'name', {
    value: 'Alice',
    configurable: false, // 允许后续修改
    writable: true
    // writable: false     // 初始为只读
});

console.log(Object.getOwnPropertyDescriptor(obj, 'name')); // {value: 'Alice', writable: false, enumerable: false, configurable: true}

// 修改writable特性
Object.defineProperty(obj, 'name', {
    writable: true // 现在name属性变为可写了
});

obj.name = 'Bob';
console.log(obj.name); // 输出: Bob