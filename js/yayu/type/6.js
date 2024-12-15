// [1, 2, 3]? 什么都没有做
// console.log(['1', '2', '3'].map(parseInt))
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt

// ['1', '2', '3'].map((v, i, arr) => parseInt(v, i))

parseInt('1', 0) // 1
parseInt('2', 1) // NaN 0 01 10 -> 2 
parseInt('3', 2) // NaN

console.log(parseInt(10, 8)); //8