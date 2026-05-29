// 如何从运行结果上分辨这两种状态呢
// 无数据代表数组对象没有这个 key，有数据代表数组对象有这个 key，但是值为 undefined
// hasOwnProperty
const arr = new Array(5);

console.log(arr.hasOwnProperty(0)); // false
console.log(0 in arr); // false

arr.fill(undefined);

console.log(arr.hasOwnProperty(0)); // true
console.log(0 in arr); // true


function createArray(...params) {
    return new Array(...params);
}
// 第一个 createArray 的调用返回的是一个长度为 5 的无数据数组
console.log(createArray(5));
// 第二个调用返回的包含数字 5 和 6 的长度为 2 的有数据数组
console.log(createArray(5, 6));