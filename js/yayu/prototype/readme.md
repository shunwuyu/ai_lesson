[source](https://github.com/mqyqingfeng/Blog/issues/2)

- 如何造人？
  1.js  构造函数 

- 孔圣人是韩国的， 我们造了韩国人。日本， 王阳明， 明治维新 
  prototype 原型式的， 不是血缘关系
  2.js 

- prototype 属性到底指向的是什么呢？
  函数的 prototype 属性指向了一个对象
  这个对象正是调用该构造函数而创建的实例的原型。
  也就是这个例子中的 person1 和 person2 的原型。

- 原型式继承
  每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

- person 和 Person.prototype 关系？
  这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

- 既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？
  constrcutor
  