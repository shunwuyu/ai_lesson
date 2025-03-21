# 深拷贝与浅拷贝

- 浅拷贝：创建新对象，复制原对象的属性值。对于基本类型，复制其值；对于引用类型，复制其引用地址。
- 深拷贝：递归复制所有层级的属性，创建与原对象结构相同但完全独立的新对象。

要点

- 独立性：浅拷贝在修改嵌套对象时会影响原对象，深拷贝完全独立。
- 实现方式：
    - 浅拷贝：Object.assign()、扩展运算符、Array.slice()
    - 深拷贝：JSON.parse(JSON.stringify())、递归函数
    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce894a1f1b5c32~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)
    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce893a54f6c13d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

- JSON.parse(JSON.stringify()) 缺点
    - 无法处理循环引用：会抛出"Converting circular structure to JSON"错误
    - 丢失特殊对象类型 
        函数、RegExp、Map、Set、WeakMap、WeakSet会丢失
        Date对象会被转为字符串
        Symbol类型的键和值会被完全忽略
    - 丢失原型链
        返回的对象是普通对象，失去原型链上的方法
        5.js
    -  丢失undefined值：属性值为undefined的属性会被忽略
        6.js
    -  NaN、Infinity和-Infinity会被转为null
        7.js
    - 性能问题：对于大型对象，序列化和解析过程可能非常耗时
    - 精度问题：可能导致超出IEEE 754标准的大数值精度丢失
    8.js
- 手写深拷贝


- 性能与复杂度
    深拷贝性能开销更大，处理循环引用和特殊对象类型更复杂

- 事件总线
