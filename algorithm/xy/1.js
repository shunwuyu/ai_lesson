// unshift 方法-添加元素到数组的头部
const arr = [1,2];
// arr.unshift(0) // [0,1,2]
// push 方法-添加元素到数组的尾部 入队列
// arr.push(3)
// splice 方法-添加元素到数组的任何位置
// splice 用于删除的操作
// 剪接
console.log(arr);
console.log(arr.splice(1,1), arr)
arr.splice(1,0,3) // [1,3,2]
// 第一个入参是起始的索引值
// 第二个入参表示从起始索引开始需要删除的元素个数
// 第三个位置开始的入参，都代表着需要添加到数组里的元素的值