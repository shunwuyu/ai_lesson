// 绕过类型检查
// 灵活但危险
let a: any;
a = 123;
a = 'hello';
a.toFixed();   // 不报错，即便 a 现在是字符串也可以调用

