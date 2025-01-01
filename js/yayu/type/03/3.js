// 相同类型
console.log(undefined == undefined)
console.log(null == null)
console.log(NaN == 1, NaN == NaN)
console.log(1 == NaN, NaN == NaN)
console.log(1 == 1)
console.log(+0 == -0)
console.log(-0 == +0)
console.log(1 == 2)
console.log("123" == "123")  //完全相等返回true,否则返回false  
console.log(false == false)  // x和y都是true或者false，返回true，否则返回false
// 它们实际上是两个独立的对象实例。
// 规则 6  x和y指向同一个对象，返回true，否则返回false
console.log([] != []) // x和y指向同一个对象，返回true，否则返回false

// 不同类型
console.log(undefined == null)
console.log(1 == "1")  //判断x == ToNumber(y)
console.log("1" == 1) // 判断ToNumber(x) == y

console.log(false == 0) // x是布尔值，判断ToNumber(x) == y

console.log(0 == false) //y是布尔值，判断x ==ToNumber(y)

let x = 42;
let y = {
    valueOf: function() {
        return 42;
    }
};

console.log(x == y);  // toPrimitive(y) == x
//   x不是字符串或者数字，y是对象，判断x == ToPrimitive(y)


console.log(false == undefined) // false  undefined -> 数字 是 NaN