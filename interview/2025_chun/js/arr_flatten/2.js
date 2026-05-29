function flatten(arr) {
    return arr.toString().split(',').map(item =>parseFloat(item))
}
console.log(flatten([1, [2, [3, [4, 5]]], 6]));
  // 输出:[ 1, 2, 3, 4, 5, 6 ]
  