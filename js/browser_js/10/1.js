function bar() { 
    console.log(myName)
}
function foo() { 
    var myName = "极客邦" 
    bar()
}
var myName = "极客时间"
foo()