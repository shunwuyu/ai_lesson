function foo(){
  var a = {name:"极客时间"}
  var b = a
  a.name = "极客邦" 
  console.log(a)
  console.log(b)
}
foo()