// 字符数组 一个下标就能唯一定位一个字符
// "我是中国人"[1] 
// charAt 和 at
// console.log("我是中国人"[5])
// 数组下标，如果参数在 [0, length - 1] 之外的，返回 undefined
// ，如"我是中国人"[5] === undefined；

// charAt 函数，如果参数在 [0, length - 1] 之外的，返回空串，如"我是中国人".
console.log("我是中国人".charAt(5) === "")
console.log("我是中国人".at(-1) === "人")
// 三种方法的参数都是指码元的位置
console.log("𠯿a"[1], "𠯿a"[2], "𠯿a".charAt(2), "𠯿a".charAt(0))
// 怎么办？
// Array.from() 能正确识别并分割 Unicode 字符（包括超出 BMP 的字符），而普通的字符串索引访问则不行。
console.log(Array.from("𠯿a")[0], [..."𠯿a"][0] )
// 在有 Emoji 修饰序列的场景下，因为它不是一个 Unicode 整体，
console.log(Array.from("🧑🏾🎓a")[0])
