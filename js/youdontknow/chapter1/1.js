var a = 1;
function foo() {
  var a = 2;
  function bar() {
    var a = 3;
  }
  console.log(a);
}
foo()