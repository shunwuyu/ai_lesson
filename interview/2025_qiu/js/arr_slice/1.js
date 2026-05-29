// splice 是最常用的方法，时间复杂度 O(n)，会修改原数组。
const arr = Array.from({ length: 10 }, (_, i) => i + 1); 
// [1,2,3,4,5,6,7,8,9,10]

arr.splice(4, 1); // 删除索引为 4 的元素（第 5 个）
console.log(arr); // [1,2,3,4,6,7,8,9,10]
