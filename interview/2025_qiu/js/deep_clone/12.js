// 表现像“深拷贝”（其实是浅拷贝，但没嵌套）
let arr1 = [1, 2, 3];

// 方法一：slice()
let arr2 = arr1.slice();

// 方法二：concat()
let arr3 = arr1.concat();

// 修改副本
arr2[0] = 999;
arr3[1] = 888;

console.log(arr1); // [1, 2, 3] ✅ 没被影响
console.log(arr2); // [999, 2, 3]
console.log(arr3); // [1, 888, 3]
