// 在这个例子中， a 是一个数字类型的值。 当执行 a() 时，引擎会进行
//  RHS 查询找到 a 的值，然后尝试将其作为函数进行调用。 但是由于
//  数字类型的值不是函数，所以引擎会抛出 TypeError 异常，表示对 a 进行了非法操作。
var a = 2;
a(); // TypeError: a is not a function

