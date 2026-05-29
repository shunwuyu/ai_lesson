// 模拟一个类的初始化
class MyClass {
    constructor() {
      // 用 nextTick 确保实例初始化完成后再执行回调
      process.nextTick(() => {
        this.init(); // 初始化方法
      });
  
      this.name = '测试实例';
    }
  
    init() {
      console.log(`初始化完成，实例名称：${this.name}`);
      // 这里可以执行依赖实例初始化的逻辑
    }
  }
  
  // 创建实例
  const myInstance = new MyClass();
  console.log('实例已创建，但 init 还未执行');