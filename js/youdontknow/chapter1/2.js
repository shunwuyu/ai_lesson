// 如果 RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError
// 异常。值得注意的是，ReferenceError 是非常重要的异常类型。
function foo(a) {
  // ReferenceError: b is not defined  RHS 
  console.log( a + b );
  b = a;
}
foo( 2 );