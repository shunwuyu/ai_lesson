function foo() {
  function bar() {
    var a = 1
    console.log(b)
  }
  var b = 2
  return bar
}
foo()
const baz = foo()
baz()