// 对象赋值 —— “只是换个名字，还是同一个东西”
// 这叫引用传递，对象、数组、函数等复杂类型都是这样。
let obj1 = { name: "张三", age: 20 };
let obj2 = obj1;  // 把 obj1 “赋值”给 obj2

obj2.age = 99;     // 修改 obj2

console.log(obj1.age); // 99 ❌ obj1 也被改了！
console.log(obj2.age); // 99 ✅

let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);
// 数组也是对象，所以也是“贴标签”，不是“复印”。
console.log(arr1); // [1, 2, 3, 4] ❌ 原数组也被改了