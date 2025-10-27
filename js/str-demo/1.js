let str = 'abc';
// 团队开发中应统一引号风格。推荐使用单引号 ' 以避免与HTML属性冲突，
// 关键是一致性。
let str2 = "abc";
let str3 = `abc`;  // es6 模板字符串
// 2.html
// 这行代码使用 String 构造函数创建了一个包装字符串 'abc' 的字符串对象实例。
//string 是基础类型， String 是类
let str4 = new String('abc');
console.log(str, str2, str3, str4, str4.valueOf(), typeof str4);
// 简单数据类型， js 面向对象的非常彻底， 包装类
console.log(str.length);
// 包装类是JavaScript中为基本数据类型（如string、number、boolean）
// 提供的对象类型，用于让基本值能够调用方法和访问属性。
let tempStrObj = new String(str);
// 在临时对象上执行操作
let result = tempStrObj.length;
// 操作完成后，tempStrObj 被丢弃
// 每当对基本类型进行属性或方法访问时，
// 引擎会临时将其“装箱”为对应的包装对象，完成操作后再“拆箱”并销毁该对象。
tempStrObj = null; //null 的作用是显式地清空变量的引用，表示“这里不再指向任何对象 内存回收

// 基本类型的数字
let price = 29.9;
// 调用 toFixed() 方法 - JavaScript 自动使用 Number 包装类
console.log(price.toFixed(2)); // 输出: "29.90"
// 背后思想（示意）：
// 1. 临时装箱: let tempNumObj = new Number(price);
// 2. 调用方法: tempNumObj.toFixed(2) → "29.90"
// 3. 拆箱销毁: tempNumObj = null;
// 4. 返回结果: "29.90"
