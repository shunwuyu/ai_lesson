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

let arr4 = [
    { name: "张三", hobbies: ["篮球"] },
    { name: "李四" }
  ];

// 使用 slice 浅拷贝
let arr5 = arr1.slice();
// 使用 concat 浅拷贝
let arr6 = arr1.concat();

// 修改副本中的对象
arr5[0].name = "张三（改）";
arr5[0].hobbies.push("音乐");

arr6[1].name = "李四（concat改）";

console.log(arr4[0].name);
console.log(arr4[0].hobbies);
console.log(arr4[1].name);