// 数组的 indexOf 和 includes 在搜索指定元素上有何不同呢 给出例子

// indexOf() 返回第一个匹配项的索引。如果没有找到匹配项，则返回 -1。
// includes() 返回一个布尔值，表示是否找到了匹配项。如果找到则返回 true，否则返回 false。

const fruits = ['apple', 'banana', 'cherry'];

console.log(fruits.indexOf('banana')); // 输出: 1
console.log(fruits.indexOf('watermelon')); // 输出: -1

console.log(fruits.includes('banana')); // 输出: true
console.log(fruits.includes('watermelon')); // 输出: false
// 对NaN处理
const numbers = [1, 2, NaN];

console.log(numbers.indexOf(NaN)); // 输出: -1 (不正确)
console.log(numbers.includes(NaN)); // 输出: true (正确)
