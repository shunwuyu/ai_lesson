// 参数处理：
// 支持在 bind 时传入参数
// 支持在调用新函数时传入参数
// 两次传入的参数都会被保留并传给原函数
// this 绑定：
// 普通函数调用时，this 指向 bind 传入的 context
// 作为构造函数调用时（使用 new），this 指向新创建的实例
// 原型链继承：
// 使用空函数 fNOP 作为中转
// 保证绑定后的函数可以继承原函数的原型属性
// 防止修改绑定函数的原型时影响原函数的原型

Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

function Person(name, age) {
  console.log(this.name);
  this.name = name;
  this.age = age;
 
}
Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
}

// 使用 bind2
const context = { name: 'see' };
const boundPerson = Person.bind2(context);

// 作为普通函数调用 json
boundPerson('John', 25); // this 指向 context

// 作为构造函数调用
const person = new boundPerson('Mike', 30); // this 指向新创建的实例
person.sayHello(); // 可以访问原型方法