var a = 1
// 3 的复制发生在编译阶段
function fn(a) {
  var a
  console.log(a) 
}
fn(3)