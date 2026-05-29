// 数组的搜索指的是找到想要的元素，可能需要位置序号，也可能需要元素本身，还可能只是想知道有没有找到。
// 使用 find() 找到元素本身
const arr = [10, 20, 30, 40];

const result = arr.find(num => num > 25);
console.log(result); 
// 找到元素的位置 （ 索引）
// const arr = [10, 20, 30, 40];

const index = arr.findIndex(num => num > 25);
console.log(index); 

const arr = ['a', 'b', 'c'];

console.log(arr.indexOf('b')); // 输出: 1
console.log(arr.indexOf('z'));

// 只是判断是否存在

const hasLarge = arr.some(num => num > 25);
console.log(hasLarge); 

// 使用 includes()（适用于具体值）

// const fruits = ['apple', 'banana', 'cherry'];

// console.log(fruits.includes('banana')); // 输出: true
// console.log(fruits.includes('grape')); 