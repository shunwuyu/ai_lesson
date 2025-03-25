# 变量声明的三种方式

- 对象字面量：最常用的方式
const person = { name: "John", age: 30 };

- 构造函数：使用new关键字
const person = new Object();
   person.name = "John";
   person.age = 30;

- Object.create()：基于原型创建
const personProto = { greet() { return "Hello"; } };
   const person = Object.create(personProto);
   person.name = "John";
   - 也可以传入null

- Object.create2()：基于原型创建
- Object.assign()
    Object.assign() 是一个用于对象合并的方法，它将一个或多个源对象的所有可枚举属性复制到目标对象，并返回修改后的目标对象。

    