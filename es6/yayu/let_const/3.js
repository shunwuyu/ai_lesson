// 简单数据类型（值传递）
let a = 10;
let b = a;
b = 20;

console.log(a);
// a 和 b 各自存储自己的值，互不影响。

let obj1 = { name: 'Alice' };
let obj2 = obj1;
obj2.name = 'Bob';

console.log(obj1.name); // Bob，obj1 被修改

// obj1 和 obj2 指向同一个内存地址，修改其中一个会影响另一个。