// 函数也是值
// 在 JS 里，函数不只是工具，而是会走路的值！
function sayHello() {
    console.log('Hello JS!');
}

const greet = sayHello;
greet(); 

// ✅ 作为参数传入
function callTwice(fn) {
    fn();
    fn();
}
callTwice(sayHello);

// ✅ 从函数中返回
function createMultiplier(n) {
    return function (x) {
      return x * n;
    };
}

const double = createMultiplier(2);
console.log(double(5));