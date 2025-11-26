// 在 ES6 之前，JavaScript 没有 class 关键字，人们使用
//  构造函数 + 原型 来模拟“类”。
// 构造函数本质上就是一个 普通函数
// 首字母必须大写（约定）
// 必须配合 new 使用
// 用来创建“对象实例”
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`)
}

const a = new Person("Andrew", 20)
a.sayHi() // Hi, I'm Andrew

// 何为原型？