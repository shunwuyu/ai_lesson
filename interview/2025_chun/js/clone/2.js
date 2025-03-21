// 数组 arr1 的浅拷贝 只有简单数据
let arr1 = [1,2,3,4];
let arr2 = arr1.slice(0);
let arr3 = arr1.concat();
arr2[1] = 6;
arr3[1]= 7;
console.log(arr1, arr2, arr3);