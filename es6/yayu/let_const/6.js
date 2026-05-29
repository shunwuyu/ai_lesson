// 块级声明用于声明在指定块的作用域之外无法访问的变量。
// let 是块级申明 不会被提升
if (true) {
    let value = 1;
}
// ReferenceError: value is not defined
console.log(value); 