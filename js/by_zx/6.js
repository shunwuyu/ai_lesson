var a = 1
// 3 的复制发生在编译阶段
function fn(a) {
  function a() {}
  var a
  // function 函数声明的优先级高于变量声明，因此
  //  function a() { } 会覆盖形参 a 的值。
  console.log(a)  
  a = 2
  
}
fn(3)