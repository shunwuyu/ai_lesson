const Singleton = (function () {
  // 私有变量，用于存储实例
  let instance;

  // 创建实例的函数
  function createInstance() {
    return {
      name: 'MySingleton',
      timestamp: new Date(),
      sayHello() {
        console.log(`Hello from ${this.name}`);
      }
    };
  }

  // 返回获取实例的接口
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// 使用示例
const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();

console.log(obj1 === obj2); // true，说明是同一个实例

obj1.sayHello(); // Hello from MySingleton
