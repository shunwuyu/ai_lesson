- https://juejin.cn/post/6844903496253177863?searchId=20241121105423CBAFBDF0BACE5CE4C5FA

- this 永远指向最后调用它的那个对象
  1.html
  window.a

- 2.html
  函数 fn 是对象 a 调用的，所以打印的值就是 a 中的 name 的值

- 调用方式
  - 普通函数  this -> window
  - 对象的方法 this -> 对象

- 改变this 的指向
  使用 ES6 的箭头函数
  在函数内部使用 _this = this
  使用 apply、call、bind
  new 实例化一个对象