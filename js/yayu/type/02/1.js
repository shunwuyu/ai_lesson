console.log(1 + '1')
// 当 + 运算符作为一元操作符的时候 ES5规范1.4.6 会调用 ToNumber 处理该值
console.log(+'1');
// 当输入的值是对象的时候，先调用 ToPrimitive(input,  Number) 方法
// 如果 obj 为基本类型，直接返回
// 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，调用 toString 方法，如果返回一个原始值，则JavaScript 将其返回。
// 否则，JavaScript 抛出一个类型错误异常
console.log(+[]); //0 
// [].valueOf() []
// [].toString() "" 基本类型
// 然后再调用 ToNumber 方法，"" 对应的返回值是 0，所以最终返回 0
console.log([].values)
console.log([].toString())// "" 基本类型
// Number(""); //  +"" toNumber 
console.log(+['1']);//1
// obj 
console.log(['1'].valueOf(), '////'); // [ '1' ]
console.log([ '1' ].toString()) //  "1" 
console.log(Number("1")) // 1
console.log(+['1', '2', '3'], '---'); // NaN
// obj
// valueOf
console.log(['1', '2', '3'].valueOf())
// toString
console.log(['1', '2', '3'].toString())
// toNumber Number("1,2,3")
console.log(+{});// NaN
// obj
// valueOf 
console.log({}.valueOf());
// toString
console.log({}.toString());
// toNumber
console.log(Number({}));