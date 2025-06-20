[source](https://juejin.cn/post/6844903616231260174)

- 如何简化以下代码？
    1.js

- 与普通函数比较
1.没有 this
箭头函数没有 this，所以需要通过查找作用域链来确定 this 的值。
这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this。

    - button 

- 因为箭头函数没有 this，所以也不能用 call()、apply()、bind() 这些方法改变 this 的指向，可以看一个例子：
    2.js

    箭头函数不绑定 this，this.value 仍指向全局对象的 value，即 1。

- 没有 arguments
    3.js

- 不能通过 new 关键字调用
JavaScript 函数有两个内部方法：[[Call]] 和 [[Construct]]。

当通过 new 调用函数时，执行 [[Construct]] 方法，创建一个实例对象，然后再执行函数体，将 this 绑定到实例上。

当直接调用的时候，执行 [[Call]] 方法，直接执行函数体。

箭头函数并没有 [[Construct]] 方法，不能被用作构造函数，如果通过 new 的方式调用，会报错。

4.js


-  没有原型
    5.js

- 没有 super
    6.js

An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

我们先来看看 method 的定义：

A method is a function which is a property of an object.

