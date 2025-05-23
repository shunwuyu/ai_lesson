// Array() 构造器 来初始化一个有确切容量的空数组
// 不是undefined
// <5 empty items> 状态
// 没有数据不代表是 undefined
const arr = new Array(5);
// undefined 是一种数据类型，表示变量已声明但未赋值
// console.log(arr,arr[0]);

// fill 函数可以批量填充任意数据
arr.fill(undefined);
console.log(arr);




