class Singleton {
  // 私有静态实例
  static #instance = null;

  constructor(name) {
    if (Singleton.#instance) {
      // 如果已经有实例，直接返回该实例
      return Singleton.#instance;
    }
    this.name = name || 'ClassSingleton';
    this.timestamp = new Date();

    // 保存实例
    Singleton.#instance = this;
  }

  // 静态方法获取实例
  static getInstance(name) {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton(name);
    }
    return Singleton.#instance;
  }

  sayHello() {
    console.log(`Hello from ${this.name}`);
  }
}

// 使用示例
const obj1 = Singleton.getInstance('MySingleton');
const obj2 = Singleton.getInstance('AnotherName');

console.log(obj1 === obj2); // true
obj1.sayHello(); // Hello from MySingleton
obj2.sayHello(); // Hello from MySingleton

// 直接 new 也会返回同一个实例
const obj3 = new Singleton('ThirdName');
console.log(obj1 === obj3); // true
