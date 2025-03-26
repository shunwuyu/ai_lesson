bind call apply 有啥区别 js/bind_call_apply

- 相同点
bind、call、apply 都可以改变函数内部 this 的指向，都是 Function 原型上的方法。
- 场景  
    - apply: Math.max.apply(null, array) 求数组最大值
    - call: 继承时调用父类构造函数 给例子
    - bind 事件
- 区别
    call和apply立即调用函数，区别在于参数传递方式；bind返回新函数，允许以后调用时设置this及预设参数。
- 手写 bind
    4.js

