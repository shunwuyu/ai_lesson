function Person(name, age) {
  // 1. this 被绑定到 obj (由 Object.create 创建)
  // 2. 执行这两行，相当于给 obj 添加了 name 和 age 属性
  this.name = name;
  this.age = age;

  // 3. 但是，我们显式返回一个*全新的*对象
  // 这个返回的对象与 'this' (即 obj) 完全不同
  return {
    customName: "Custom " + name,
    customAge: age + 100,
    special: "I am special!",
    // 注意：这里没有使用 this.say，因为返回的是新对象，它没有继承 Person.prototype
    introduce: function() {
      console.log(`Hi, I'm ${this.customName}, ${this.customAge} years old.`);
    }
  };
}

// Person.prototype.say = function() {
//   console.log(this.name, this.age);
// }
// 注意：因为返回的是一个新对象，它不继承 Person.prototype，所以 say 方法不可用

const personInstance = myNew(Person, 'shunwuyu', 18);

console.log(personInstance);
// 输出:
// { customName: "Custom shunwuyu", customAge: 118, special: "I am special!", introduce: [Function: introduce] }

personInstance.introduce(); 