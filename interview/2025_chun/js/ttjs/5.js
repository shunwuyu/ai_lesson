// "b" + "a"
// 结果是 "ba"
// +"a"一元加号 + 尝试将 "a" 转为数字，结果是 NaN。
// "baNaN" + "a"
// 结果是 "baNaNa"。
console.log("b" + "a" + +"a" + "a");// baNaNa