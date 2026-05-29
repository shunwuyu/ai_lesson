// 函数声明（Function Declaration）
// 函数提升
add(1,2)
// multiply(2, 3) 
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // 5

// 函数表达式（Function Expression）
const multiply = function(a, b) {
    return a * b;
};
// 不会声明提前，必须先定义再调用。
console.log(multiply(2, 3));

// 箭头函数（Arrow Function）
// 简洁
const divide = (a, b) => a / b;
console.log(divide(6, 3));

