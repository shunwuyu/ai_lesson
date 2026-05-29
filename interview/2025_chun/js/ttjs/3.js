// JS如何存储小数
// JS用IEEE 754双精度浮点数格式存储小数，存在精度误差。
// 0.1 在二进制中无法精确表示，
// 0.1 在二进制中是个无限循环小数，表示为：
// 0.0001100110011001100110011001100110011...(无限循环)
console.log(0.1+0.2 !== 0.3) // true
// 实际开发中，遇到精度的问题，你是怎么解决的，你有什么好办法
// toFixed 或四舍五入
// 如 decimal.js、bignumber.js 等，专门处理高精度小数。
// 放大为整数计算
// 例如将金额（元）转为分，0.1元变成10分，计算后再缩小。
// - JavaScript的最大安全整数是多少
// JavaScript 的最大安全整数是 9007199254740991，即 Number.MAX_SAFE_INTEGER。
// ES规范中新提出的BigInt解决了什么问题呢，你又发现了BigInt中哪些坑呢
// - 不能与 Number 混用运算
// 1n + 1  报错
// - 不支持 Math 对象方法
// Math.sqrt(4n)  Math 只支持 Number。
// - JSON 不支持 BigInt
// 直接 JSON.stringify({a: 1n}) 会报错。
// - 精度无限但性能较低
// 适合大数计算，不适合高性能场景
// - 不能用 toFixed、toPrecision 等 Number 方法