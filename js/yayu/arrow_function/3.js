function constant() {
    return () => arguments[0]
}
// 箭头函数可以访问外围函数的 arguments 对象
var result = constant(1);
console.log(result()); // 1

// 如果要访问参数呢？
let nums = (...nums) => nums;
