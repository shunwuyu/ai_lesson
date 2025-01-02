let numbers = [40, 1, 5, 200];
// a 是当前正在比较的元素，而 b 是下一个要比较的元素。
// 冒泡 调换顺序
// a - b 的结果小于 0，则 a 会被排在 b 之前；如果 a - b 的结果大于 0，
// 则 a 会被排在 b 之后；如果 a - b 的结果等于 0，则 a 和 b 的相对顺序不变。
numbers.sort((a, b) => a - b);
console.log(numbers);

let fruits = ['banana', 'apple', 'cherry'];
fruits.sort();
console.log(fruits); // 输出: ['apple', 'banana', 'cherry']

let items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -6 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 }
];

// 根据 value 属性升序排列
// items.sort((a, b) => a.value - b.value);

// 根据 name 属性字母顺序排列
items.sort((a, b) => a.name.localeCompare(b.name));

console.log(items);

// sort() 方法会改变原数组 不想改变怎么办？ 先复制一份再排序
let sortedArray = [...originalArray].sort();
