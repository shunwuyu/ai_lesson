const arr = [1, [[2, 3], 4],5]
const flatten = (arr, deep = 1) => {
    if (deep <= 0) return arr;
    return arr.reduce((res, curr) => res.concat(Array.isArray(curr) ? flatten(curr, deep - 1) : curr), [])
}
// function flatten (arr,deep=1) {
// return   arr.reduce((acc,val) => acc.concat(Array.isArray(val)? flatten(val,deep-1):val),[])
// }
console.log(arr, Infinity);
// 输出:[ 1, 2, 3, 4, 5, 6 ]
