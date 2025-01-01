https://juejin.cn/post/6844904104402092039?searchId=202412151925420B2D0177B0D546C4500C

- es6 之前JS 有几种数据类型？
  Undefined、Null、Boolean、Number、String、Object

- 基本类型之间的转换
  - 转Boolean
    - 原始值
      1.js
      +0， -0 2.js
      NaN 3.js
  - 转数字
    使用 Number 函数将类型转换成数字类型
    如果提供了值，则返回由 ToNumber(value) 计算出的数值（不是一个 Number 对象）；否则返回 +0。
    4.js
    - 如何对部分数字 字符串转换呢？ 5.js 
    -  ['1', '2', '3'].map(parseInt) 6.js

  - 转字符串 
    返回由 `ToString(value)` 计算得出的字符串值（不是一个字符串对象）。如果未提供 `value`，则返回空字符串 `""`。
    7.js

- 原始值转对象
  原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象。

  8.js 

  - 包装类的概念 9.js

--------------------

- 对象转Boolean
  所有对象(包括数组和函数)都转换为 true。
  10.js

- 对象转数字/字符串
  对象到字符串和对象到数字的转换都是通过调用待转换对象的一个方法来完成的
  而 JavaScript 对象有两个不同的方法来执行转换，一个是 toString，一个是 valueOf。注意这个跟上面所说的 ToString 和 ToNumber 是不同的，这两个方法是真实暴露出来的方法。
  - toString 11.js
    - 各种toString  12.js
  - valueOf
    valueOf，表示对象的原始值
    默认的 valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。 13.js

  - 对象接着转字符串和数字
    Object 转换规则
    1. primValue = ToPrimitive(input, String)
    2. 返回ToString(primValue).

    ToPrimitive 方法，其实就是输入一个值，然后返回一个一定是基本类型的值。
    ToPrimitive(input[, PreferredType])
    第一个参数是 input，表示要处理的输入值。
    第二个参数是 PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。
    如果是 ToPrimitive(obj, Number)，处理步骤如下：14.js
    1. 如果 obj 为 基本类型，直接返回
    2. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
    3. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
    4. 否则，JavaScript 抛出一个类型错误异常。

    如果是 ToPrimitive(obj, String)，处理步骤如下： 15.js

    如果 obj为 基本类型，直接返回
    否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
    否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
    否则，JavaScript 抛出一个类型错误异常。

- JSON.stringify
  JSON.stringify() 方法可以将一个 JavaScript 值转换为一个 JSON 字符串，实现上也是调用了 toString 方法，也算是一种类型转换的方法。
  1.处理基本类型时，与使用toString基本相同，结果都是字符串，除了 undefined

## JavaScript深入之头疼的类型转换下
 
- 为什么console.log(1 + "1")可以运行？ 
  JavaScript **自动**的将数据类型进行了转换， 隐式类型转换
- 为什么不是 11？ 而是 2呢？
  +运算符既可以用于数字加法，也能用于字符串拼接，那在这个例子中，是将数字 1 转成字符串 '1'，进行拼接运算？还是将字符串 '1' 转成数字 1，进行加法运算呢？
  如果有一个操作数是字符串（String），另一个操作数会被转换为字符串，然后两者进行字符串拼接。

- 二元操作符
  现在 + 运算符又变成了二元操作符，毕竟它也是加减乘除中的加号
  02/2.js

## == 
  "==" 用于比较两个值是否相等，当要比较的两个值类型不一样的时候，就会发生类型的转换。
  - 如果x与y是同一类型：
    03/1.js

  
- console.log([] != [])