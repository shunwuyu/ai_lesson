const handler = {
  get(target, prop, receiver) {
    // console.log(this,'???')
    if (prop in target) {
        return Reflect.get(target, prop, receiver);
    } else {
        return 'Not Found';
    }
  }
};

const proxyObj = new Proxy({ a: 1 }, handler);

console.log(proxyObj.a);      // 输出: 1
// 直接访问会触发代理的 get 拦截器，并返回 'Not Found'。
console.log(proxyObj.b);      // 输出: Not Found

// 使用 Reflect.get
console.log(Reflect.get(proxyObj, 'a')); // 输出: 1
// Reflect.get 也会触发代理的 get 拦截器，但提供了更明确的上下文和参数传递。
console.log(Reflect.get(proxyObj, 'b')); // 触发代理的 get 方法，输出: Not Found
// 配合Proxy 来用
// 使用 Reflect 配合 Proxy 可以提供更精确的控制和更灵活的操作，