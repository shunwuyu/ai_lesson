# alert([].constructor==Object)的输出是什么? 

false

数组的构造函数: 这道题考察了 JavaScript 中数组的构造函数。[].constructor 返回的是 Array 构造函数，而不是 Object。因此，[].constructor == Object 的比较结果为 false

面试官可能想考察你对 JavaScript 原型链和对象构造的理解。数组是对象的一种特殊形式，但它们有自己的构造函数。

