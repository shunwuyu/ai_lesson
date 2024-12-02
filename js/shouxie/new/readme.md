[source](https://juejin.cn/post/6946022649768181774#heading-30)

new 运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例。

- 区别是？
  ```js
  // 自定义对象
  function Student(name, age) {
    this.name = name;
    this.age = age;
}

Student.prototype.study = function() {
    console.log(this.name + ' is studying.');
};

var student1 = new Student('Alice', 20);
student1.study(); // 输出: Alice is studying.
  ```
  ```js 内置对象
  var date = new Date();
  console.log(date); // 输出当前日期和时间

  var array = new Array(1, 2, 3);
  console.log(array); // 输出: [1, 2, 3]
  ```

- call 
- arguments
  arguments 对象是一个类数组对象，它包含了函数调用时传入的所有参数
  arguments 对象在每个函数内部都是可用的，即使函数没有显式地声明参数列表，arguments 仍然存在。
  3.js

- 因为它没有血缘关系 new的过程
  - new 会产生一个新对象；
  - 新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型；
  
  1.js

  - 构造函数可能会显示返回；
  2.js
