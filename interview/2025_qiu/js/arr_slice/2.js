// 不修改原数组（函数式思维）
// 更“函数式”，不会副作用，面试官一般会觉得思路清晰。
const arr = Array.from({ length: 10 }, (_, i) => i + 1);

const newArr = arr.filter((_, index) => index !== 4);
console.log(newArr); // [1,2,3,4,6,7,8,9,10]
