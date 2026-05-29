const Singleton = (() => {
  let instance;
  return () => instance || (instance = { 
    name: 'MySingleton', 
    timestamp: new Date(),
    sayHello() { console.log(`Hello from ${this.name}`); }
  });
})();

// 使用示例
const obj1 = Singleton();
const obj2 = Singleton();

console.log(obj1 === obj2); // true
obj1.sayHello(); // Hello from MySingleton
