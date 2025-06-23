// [startIndex, endIndex) 半开区间
"我是中国人".substring(0, 1);
// substring 允许 endIndex<startIndex，会自动交换这两个值，而 slice 不允许，会返回空串；

console.log("我是中国人".substring(3, 2)) 
console.log("我是中国人".slice(3, 2) )
// substring 的参数如果是负数，会当作 0 处理，。
console.log("我是中国人".substring(-2, -1))
// .slice(-2, -1) 表示从倒数第2个开始，但不包含倒数第1个，所以结果是 "国"。
console.log("我是中国人".slice(-2, -1))
// 双码元和 Emoji 修饰序列的影响
console.log("今天天气晴朗🧑🏾🎓！".slice(0, 9));