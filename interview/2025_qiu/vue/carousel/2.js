// 数组有序的情况
const arr = [1, 2, 3, 4, 5];
const index = arr.findIndex(num => num > 2);
const result = arr.slice(index); // [3, 4, 5]
