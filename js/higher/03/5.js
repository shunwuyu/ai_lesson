// 创建一个数组
let arr = [1, 2, 3, 4, 5];

// 1. 数组是对象，可以有属性
arr.customProperty = "This is a custom property";
console.log(arr.customProperty); // 输出: This is a custom property

// 2. 数组可以有方法
arr.customMethod = function() {
    return this.length;
};
console.log(arr.customMethod()); // 输出: 5

// 3. 数组的长度属性
console.log(arr.length); // 输出: 5

// 4. 数组的方法
console.log(arr.push(6)); // 输出: 6 (新的数组长度)
console.log(arr); // 输出: [1, 2, 3, 4, 5, 6]

// 5. 遍历数组
arr.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
});
// 输出:
// Index: 0, Value: 1
// Index: 1, Value: 2
// Index: 2, Value: 3
// Index: 3, Value: 4
// Index: 4, Value: 5
// Index: 5, Value: 6

// 6. 数组的原型方法
console.log(Array.isArray(arr)); // 输出: true
// Array.prototype.join
console.log(arr.join(', ')); // 输出: 1, 2, 3, 4, 5, 6

// 7. 数组的索引访问

console.log(arr[0]); // 输出: 1
console.log(arr[2]); // 输出: 3

// 8. 修改数组元素
arr[1] = 10;
console.log(arr); // 输出: [1, 10, 3, 4, 5, 6]

// 9. 删除数组元素
delete arr[2];
console.log(arr); // 输出: [1, 10, undefined, 4, 5, 6]