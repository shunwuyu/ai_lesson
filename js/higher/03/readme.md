[source](https://juejin.cn/book/7226969813581889575/section/7231458326247112737?utm_source=post_pay_page)

- js 有几种数据类型？
    Undefined、Null、Boolean、String、Symbol、Numeric 和 Object

- 何为undefined 类型？
    undefined 类型在编程中通常表示一个变量已被声明但未被赋值。
    变量提升
- null 类型表示一个空值或不存在的对象，是一个可以赋值给变量的特殊值。
    1.js
- Symbol 
    Symbol 类型在 JavaScript 中用于创建唯一的标识符，常用于对象属性的键以确保不会与其它属性发生命名冲突。
    2.js
- Numeric
    - number
        Number 类型在 JavaScript 中用于表示整数和浮点数，是存储数值数据的基本数据类型。
    - bigInt
        BigInt 类型在 JavaScript 中用于表示任意大小的整数，适用于需要高精度的大数字运算。

        Number 类型在 JavaScript 中有精度限制，对于非常大的数字可能会导致精度丢失，而 BigInt 类型可以处理任意大小的整数，确保了大数字的精确表示和计算。
        3.js
- Object
    简单数据(Primitive)类型之外, 都是Object
    - function  可执行的对象    不是独立的类型 
        4.js 
        函数是对象的原因在于函数具有对象的特性，可以拥有属性和方法。这种设计使得函数不仅可以用作执行代码的块，还可以用来存储数据和行为，从而提供了更多的灵活性和功能

    - array     可遍历的对象  5.js
    - let now = new Date();
        console.log(now); // 输出当前日期和时间，例如: 2023-10-05T12:34:56.789Z
- 一般人说8 种， 高手说7 种
    Numberic = Number + BigInt

- 怎么理解 Primitive 
    用字面量一眼能看出其值的
    null、undefined、100、"中国"、false
    虽然 Object 有的可以用 JSON 结构来表示，但是稍微复杂一点，比如函数、原型链、循环引用等这些特性是无法表述的

    区分Primitive和对象的方式是值与引用。
    Primitive拷贝的方式传递
    Object 类型是传递引用的
    6.js

- 有图有真相
    ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb8376732aba4a5784095066cb86fa6c~tplv-k3u1fbpfcp-jj-mark:2079:0:0:0:q75.awebp)


- 区分数组和对象呢？
    型判断逻辑，提升大家编写更安全、更健壮代码的能力 手写

- 那么要区分那些呢？
    需要做类型判断的是未定义 undefined、空 null、字符串 string、数字 number 或 bigint、布尔 boolean、符号 symbol、数组 Array、函数 Function、正则 RegExp，除此之外，都可归类为普通对象。

- typeof 
    typeof 却不是函数，而是一个操作符， 8.js
    typeof 返回值一定是这 8 种字符串之

    - Primitive 除了null 外都能判断 9.js
        null 用 typeof 判断不出来，这是 Primitive 类型中唯一一种 typeof 不支持 的

    - 为什么这句代码有问题
        if ("object" === typeof variable) {}
        null 不包含

    - 理解图片
    ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cafa665352064c34aa57bae148564069~tplv-k3u1fbpfcp-jj-mark:2079:0:0:0:q75.awebp)

    - 如何判断数组？
    10.js

    - 简单数据类型为何可以 对象式访问？
        let a = 1.234
        a.toFixed(2)?

        除了 null 和 undefined 外，其余的 Primitive 类型都可以封装成 Object：

        11.js

    - isString 判断

    new Number(3) + new Number(4) // 7
    new String("a") + new String("b") // "ab"
    function isString(str) {
        return "string" === typeof str || Object.prototype.toString.call(str) === "[object String]";
    }






