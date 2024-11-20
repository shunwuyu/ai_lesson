var a = 1
function fn(a) {
  console.log(a)
  var a = 2   // 可以放到下面
  function a() { }
  
  var b = a
  console.log(a)
}
fn(3)
