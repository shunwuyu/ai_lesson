const arr1 =  ["apple", "banana", 1]
const arr2 =  ["apple", 1, "banana"]

function fn(arr1, arr2) {
  // Arrary.some: 有一项不满足 返回false
  // Arrary.indexOf: 查到返回下标，查不到返回 -1
  if (arr1.length !== arr2.length) {
    return false;
  }
  // some 有一项不满足 返回false
  return !arr1.some(item => arr2.indexOf(item)===-1)
}

fn(arr1,arr2) // true

// Arrary.prototype.indexOf() 是使用的严格相等算法 => NaN值永远不相等

// Array.prototype.includes() 是使用的零值相等算法 => NaN值视作相等
const arr3 =  ["apple", "banana", NaN]
const arr4 =  ["apple", NaN, "banana"]

console.log(fn(arr3,arr4) )


function fn2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return !arr1.some(item => !arr2.includes(item))
}

console.log(fn2(arr3,arr4)) // true
