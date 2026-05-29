# 响应式系统

- Vue 2 的响应式机制是基于 Object.defineProperty() 这个 API 实现的，本质是对数据的读写进行拦截。
  1.html
- vue 3 的响应式机制是基于 Proxy 这个 API 实现的
  2.html
- 两者区别
  在 Proxy 普及之前，我们是没有办法完整的监听一个 JavaScript 对象的变化，只能使用 Object.defineProperty() 去实现一部分功能。
  - Proxy 可以直接监听对象而非属性，这意味着我们可以直接监听一个对象的变化，而不需要对对象的每个属性都进行监听。
  3.html
  Proxy（简洁强大）4.html
  - Proxy 可以监听数组的变化，而 Object.defineProperty() 只能监听对象属性的变化。
  5.html
  6.html
- 总结
  - Object.defineProperty 只能劫持已有属性，无法监听新增/删除属性；
  - 对数组支持差
  - Proxy 可以代理整个对象（包括数组），支持动态属性、Symbol 键、in、delete 等操作；
  - 性能更好（懒初始化，不需要遍历所有属性）。
  - Proxy 有兼容性问题
    Vue 3 不支持 IE11 
    若需支持 IE，只能用 Vue 2 或降级方案。


- const obj = {
  a: { b: { c: 1 } }
};
  怎么代理？ defineproperty 递归遍历 + 立即代理所有层级
  proxy 懒代理（Lazy Proxy）：访问时才代理子对象
  7.html
  