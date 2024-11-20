var a = 1
function fn(a) {
  var a
  console.log(a) 
  a = 2
  function a() { }
  var b = a
  console.log(a)
}
fn(3)