function myNew(Constructor, ...args) {
  // Object.create() 是 JavaScript 中用于创建一个新对象的方法，
  // 该新对象的原型（prototype）被设置为指定的对象。
  // 空对象， 原型指向 Constructor.prototype
  const obj = Object.create(Constructor.prototype) // 1️⃣ 创建对象并关联原型
  console.log(obj, '/////');
  const result = Constructor.apply(obj, args)      // 2️⃣ 执行构造函数
  return (result !== null && (typeof result === 'object' || typeof result === 'function'))
    ? result
    : obj                                          // 3️⃣ 返回规则
}

function Person(name, age) {
  this.name = name,
  this.age = age;
}

Person.prototype.say = function() {
  console.log(this.name, this.age);
}

myNew(Person, 'shunwuyu', 18);