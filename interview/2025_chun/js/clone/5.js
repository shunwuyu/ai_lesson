// 定义一个构造函数
function Person(name) {
    this.name = name;
  }
  
  // 在原型上添加方法
  Person.prototype.sayHello = function() {
    return `Hello, I'm ${this.name}`;
  };
  
  // 创建实例
  const john = new Person('John');
  console.log(john.sayHello()); // "Hello, I'm John"
  
  // 使用JSON进行深拷贝
  const johnCopy = JSON.parse(JSON.stringify(john));
  console.log(johnCopy.name); // "John" - 数据保留
  console.log(johnCopy.sayHello); // undefined - 方法丢失
  
  // johnCopy是普通对象，不再是Person的实例
  console.log(johnCopy instanceof Person); // false