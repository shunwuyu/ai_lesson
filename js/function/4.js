// 1. return 语句
// 函数没写 return，默认返回 undefined。
function add(a, b) {
    return a + b;
}
const result = add(5, 6);
console.log(result); // 11
// 2. 没有 return
function noReturn() {
    console.log('I do not return anything');
}
console.log(noReturn()); // undefined
  

