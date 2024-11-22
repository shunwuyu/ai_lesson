https://juejin.cn/book/7226969813581889575/section/7231515210341679136

- 函数有哪些种？
  es6 之前， 函数只有函数声明和函数表达式两种写法
  function func() {}
  var func = function() {}
  es6 之后， 新增了箭头函数, 异步函数async , 生成器函数 4.js
  const func = () => {}
  const asyncFunc = async () => {}

- 什么是函数
  函数（function）是一种特殊的对象， 可以复用的过程 1.js
  greet 对象， 有个[[Call]]内部方法，不是直接可访问的。

- Object.assign(a, b)
  1.js
  操作（Operation），叫做 Call(F,V[,argumentsList] )
  Call(F(函数对象),V(上下文对象)[,argumentsList] )
  Call(assign, Object, a, b)

- 函数对象的内部[[Construct]]
  这个函数可以作为一个构造函数来创建对象

  2.js

- 对于一般的函数来说，它作为对象，也是被特定构造函数来创建出来的，哪个构造函数呢？自然是 Function

- 函数会创建新的上下文

- 函数作为一个特殊的对象，也有自己独特的属性：
  name； 5.js
length；
prototype。

