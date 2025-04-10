var x = 1;

function foo() {
    console.log(x); // undefined  变量提升
    var x = 2;
    console.log(x); // 2 
}

foo();
console.log(x); // 全局 1 