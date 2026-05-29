function myNew(Constructor, ...args) {
    // 1. 创建一个新对象，使用Constructor.prototype作为原型
    const obj = Object.create(Constructor.prototype);
    
    // 2. 执行构造函数，绑定this为新创建的对象
    const result = Constructor.apply(obj, args);
    
    // 3. 如果构造函数返回了一个对象，则返回该对象；否则返回新创建的对象
    return (result && typeof result === 'object') ? result : obj;
  }
  
  // 使用示例
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  Person.prototype.sayHello = function() {
    return `Hello, I'm ${this.name}`;
  };
  
  const john = myNew(Person, "John", 30);
  console.log(john.name); // "John"
  console.log(john.sayHello()); // "Hello, I'm John"