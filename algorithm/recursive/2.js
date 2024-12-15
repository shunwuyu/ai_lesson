const flatten = (arr) => {
  let result = [];
  arr.forEach((item, i, arr) => {
    // 若为数组,递归调用 faltten,并将结果与result合并
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(arr[i])
    }
  })
  return result;
};
const arr = [1, [2, [3, 4, 5]]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]

