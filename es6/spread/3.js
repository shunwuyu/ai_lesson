let arr = [5]
arr.unshift(1, 2)
console.log(arr)

arr.push(6, 7)
console.log(arr)

// 任意位置添加 删除0个， 加3, 4
arr.splice(2, 0, 3, 4)
console.log(arr)


let arr2 = [3, 4]
arr2 = [1, 2, ...arr, 5, 6]
console.log(arr) 