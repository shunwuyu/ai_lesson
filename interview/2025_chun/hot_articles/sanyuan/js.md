[(建议收藏)原生JS灵魂之问, 请问你能接得住几个？(上)](https://juejin.cn/post/6844903974378668039)


## JS数据类型

- 7 种原始值
    boolean null undefined number string symbol bigint
- 引用数据类型 Object(**普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function**)

- js-demo
    - 1.js 说出下面运行的结果
    - 2.js null是对象吗？为什么
    null不是对象
     虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

     0x00000000
    - '1'.toString()为什么可以调用？
        基本包装类型
        而基本包装类型恰恰属于基本数据类型，包括Boolean, Number和String。
        - 做了那几件事情？
        ```
            // 第一步: 创建Object类实例
            // 为什么不是String ?
            // 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
            var s = new Object('1');
            // 第二步: 调用实例方法。
            s.toString();
            //第三步: 执行完方法立即销毁这个实例。
            s = null;
        ```

## JS数据类型之问——检测篇

1. typeof 是否能正确判断类型
    - 对于原始类型来说，除了 null 都可以调用typeof显示正确的类型。
        typeof Symbol() // symbol
    - 对于引用数据类型，除了函数之外，都会显示"object"
        typeof console.log

    - 采用typeof判断对象数据类型是不合适的，采用instanceof会更好，instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true
        2.js
- instanceof能否判断基本数据类型
    能
    3.js

- 能不能手动实现一下instanceof的功能
    ```js
    // Object.getPrototypeOf
    function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

    console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String));//true
    ```

-  Object.is和===的区别
    - ===（严格相等）
        比较两个值是否类型和值都相等。
        是最常用的比较操作符。
        语义简单，执行快。
        NaN === NaN 为 false，+0 === -0 为 true。
    - Object.js
        ES6 引入的更精确的相等比较方法。
        用于判断两个值是否绝对一致，连 NaN 和 +0/-0 都能区分。
        用于极端或边界值判断更安全。
        NaN === NaN 为true false

        === 用于大多数比较，Object.is 用于判断更精确，比如 NaN 和 +0/-0 场景。

## JS数据类型转换篇

- [] == ![]结果是什么？为什么
    == 中，左右两边都需要转换为数字然后进行比较。
    []转换为数字为0
    ![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true,
    因此![]为false，进而在转换成数字，变为0。
    0 == 0 ， 结果为true
    
- JS中类型转换有哪几种
    - 只有三种
        1. 转换成数字
        2. 转换成布尔值
        3. 转换成字符串
        ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/20/16de9512eaf1158a~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

- == 和 ===有什么区别？
    ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等

    ==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下：

    - 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
    - 判断的是否是null和undefined，是的话就返回true
        null == undefined
    - 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
    - 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
    - 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较
        toPrimitive

- 对象转原始类型是根据什么流程运行的
    - 对象转原始类型，会调用内置的[ToPrimitive]函数，
    1. 如果Symbol.toPrimitive()方法，优先调用再返回
    2. 调用valueOf()，如果转换为原始类型，则返回
    3. 调用toString()，如果转换为原始类型，则返回
    4. 如果都没有返回原始类型，会报错

    4.js

- 如何让if(a == 1 && a == 2)条件成立
    ```
    var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2);
    ```

## JS如何实现继承
    - 构造函数继承 这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。
    ```
    function Parent1(){
        this.name = 'parent1';
    }
    function Child1(){
        Parent1.call(this);
        this.type = 'child1'
    }
    console.log(new Child1);

    ```
    - 借助原型链
    ```
      function Parent2() {
    this.name = 'parent2';
    this.play = [1, 2, 3]
  }
  function Child2() {
    this.type = 'child2';
  }
  Child2.prototype = new Parent2();

  console.log(new Child2());

    ```

    缺点
      var s1 = new Child2();
  var s2 = new Child2();
  s1.play.push(4);
  console.log(s1.play, s2.play);

    两个实例使用的是同一个原型对象。

    - 前两种组合
    ```
      function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  function Child3() {
    Parent3.call(this);
    this.type = 'child3';
  }
  Child3.prototype = new Parent3();
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play, s4.play);

    ```
    寄生组合继承。

## 谈谈你对原型链的理解

- 原型对象和构造函数有何关系

    在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。

    当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。


    2.能不能描述一下原型链？

    JavaScript对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。

    对象的 hasOwnProperty() 来检查对象自身中是否含有该属性

    使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

    