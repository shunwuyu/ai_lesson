function foo(){
  var a = 1
  var b = a
  a = 2
  console.log(a) // 2
  console.log(b) // 1
}
foo()