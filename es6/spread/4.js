// 拷贝数组
let arr = [1, 3, 5, 7]
let arr2 = arr.concat() // 浅拷贝
let arr3 = arr.slice() // 浅拷贝
console.log(arr2, arr3)

arr[0] = 2
console.log(arr, arr2, arr3)


let arr4 = [1, 3, 5, 7]
let arr5 = [...arr4]
arr4[0] = 2
console.log(arr4, arr5)