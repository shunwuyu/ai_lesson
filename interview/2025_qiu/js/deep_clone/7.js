// 实际应用场景 —— 哪些地方会用到？
// 给函数参数设置默认值（经典用法）

function createUser(options) {
    const defaults = {
      name: "匿名用户",
      age: 18,
      isAdmin: false
    };
  
    // 合并默认值和用户传的选项
    const config = Object.assign({}, defaults, options);
    
    console.log(config);
  }
  
  createUser({ name: "李四", age: 25 });
  // 输出：{ name: "李四", age: 25, isAdmin: false }


  const baseConfig = { api: "/api", timeout: 5000 };
  const envConfig = { timeout: 10000, debug: true };
  
  const finalConfig = Object.assign({}, baseConfig, envConfig);
  // { api: "/api", timeout: 10000, debug: true }