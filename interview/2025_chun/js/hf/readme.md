# 高阶函数

高阶函数是接收函数作为参数或返回函数的函数，常用于函数式编程、逻辑复用和回调处理。

- watchEffect / effect 中高阶函数
- es6 数组 map, reduce, filter 高阶函数
- 在 Axios 中，使用高阶函数为不同 HTTP 方法动态生成请求方法，提高了代码复用性，避免手写多个重复函数。
    ['post', 'put', 'patch'].forEach(method => {
  Axios.prototype[method] = function(url, data, config) {
    return this.request({ ...config, method, url, data });
  };
});
-  防抖 / 节流
- 函数柯里化
    function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...next) => curried(...args, ...next);
  };
}
- 中间件机制
    app.use(fn)
    每个中间件都是高阶函数：函数接收函数返回新函数。






