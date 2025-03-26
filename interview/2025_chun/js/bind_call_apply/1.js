// 传统方式使用 apply 求数组最大值
// 第一个参数 null 是因为 Math.max 不需要 this 上下文
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);  // 7

// 现代写法（ES6+）更推荐使用扩展运算符
const maxES6 = Math.max(...numbers);  // 7