[source](https://time.geekbang.org/column/article/127495)

## 作用域链

- 语言的底层机制
    - V8 引擎
    - 调用栈
    - 执行上下文（函数）
    - 作用域
        - 变量环境、词法环境（栈）

- 什么是作用域（scope）？
    作用域就是变量与函数的可访问范围(查找规则)，即作用域控制着变量和函数的可见性和生命周期
1.js 打印结果是？
![](https://static001.geekbang.org/resource/image/87/f7/87d8bbc2bb62b03131802fba074146f7.png?wh=1142*675)
全局执行上下文和 foo 函数的执行上下文中都包含变量 myName，那 bar 函数里面 myName 的值到底该选择哪个呢？
- 如果按照调用栈顺序
    - 先查找栈顶是否存在 myName 变量，但是这里没有，所以接着往下查找 foo 函数中的变量。
    - 在 foo 函数中查找到了 myName 变量，这时候就使用 foo 函数中的 myName。极客邦
    不是， 按作用域链查找。
- 作用域链？
    
    - 每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。
        - 当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量
        - 在当前的变量环境中没有查找到，JavaScript 引擎会继续在 outer 所指向的执行上下文中查找。
        ![](https://static001.geekbang.org/resource/image/20/a7/20a832656434264db47c93e657e346a7.png?wh=1142*797)

    我们把这个查找的链条就称为作用域链。

- foo 函数调用的 bar 函数，那为什么 bar 函数的外部引用是全局执行上下文，而不是 foo 函数的执行上下文？
     在 JavaScript 执行过程中，其作用域链是由词法作用域决定的。
    - 词法作用域 
    词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。
    ![](https://static001.geekbang.org/resource/image/21/39/216433d2d0c64149a731d84ba1a07739.png?wh=1142*864)

    ，词法作用域就是根据代码的位置来决定的，其中 main 函数包含了 bar 函数，bar 函数中包含了 foo 函数，因为 JavaScript 作用域链是由词法作用域决定的，所以整个词法作用域链的顺序是：foo 函数作用域—>bar 函数作用域—>main 函数作用域—> 全局作用域。

    词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。

- 块级作用域中的变量查找
    2.js
    ![](https://static001.geekbang.org/resource/image/25/a7/25053af5ae30c8be991fa14631cde0a7.png?wh=1142*634)

    现在是执行到 bar 函数的 if 语块之内，需要打印出来变量 test，那么就需要查找到 test 变量的值，其查找过程我已经在上图中使用序号 1、2、3、4、5 标记出来了。

    outer 指向全局

    作用域链和词法作用域一样的

## 无处不在的闭包
3.js
return innerBar 调用栈的情况
![](https://static001.geekbang.org/resource/image/d5/ef/d5587b76427a56c5f0b0571e4264b7ef.png?wh=1142*660)

innerBar 是一个对象，包含了 getName 和 setName 的两个方法

这两个方法都是在 foo 函数内部定义的，并且这两个方法内部都使用了 myName 和 test1 两个变量。

根据词法作用域的规则，内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变量，

当 innerBar 对象返回给全局变量 bar 时，虽然 foo 函数已经执行结束，但是 getName 和 setName 函数依然可以使用 foo 函数中的变量 myName 和 test1。

所以当 foo 函数执行完成之后，其整个调用栈的状态如下图所示：

![](https://static001.geekbang.org/resource/image/ee/3f/ee7c1ca481875ad4bdeb4383bd1f883f.png?wh=1142*607)

- 丛图中看到了什么？
foo 函数执行完成之后，其执行上下文从栈顶弹出了
但是由于返回的 setName 和 getName 方法中使用了 foo 函数内部的变量 myName 和 test1，所以这两个变量依然保存在内存中。

setName 和 getName 方法背的一个专属背包，无论在哪里调用了 setName 和 getName 方法，它们都会背着这个 foo 函数的专属背包。

专属背包，是因为除了 setName 和 getName 函数之外，其他任何地方都是无法访问该背包的，我们就可以把这个背包称为 foo 函数的闭包。

## 定义
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

- 怎么使用？
bar.setName 方法中的myName = "极客邦"这句代码时，JavaScript 引擎会沿着“当前执行上下文–>foo 函数闭包–> 全局执行上下文”的顺序来查找 myName 变量，你可以参考下面的调用栈状态图：
![](https://static001.geekbang.org/resource/image/50/46/50e4ba60fc7e420e83b35b95e379b246.png?wh=1142*845)

setName 的执行上下文中没有 myName 变量，foo 函数的闭包中包含了变量 myName，所以调用 setName 时，会修改 foo 闭包中的 myName 变量的值。

当调用 bar.getName 的时候，所访问的变量 myName 也是位于 foo 函数闭包中的。
断点
![](https://static001.geekbang.org/resource/image/40/a8/40b8840480a5df4f43ad5f4e7907e3a8.png?wh=1142*694)

从“Local–>Closure(foo)–>Global”就是一个完整的作用域链。

你以后也可以通过 Scope 来查看实际代码作用域链的情况，这样调试代码也会比较方便。

- 闭包是怎么回收的
闭包使用不正确，会很容易造成内存泄漏的，怎么回收？

通常，如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。

如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存。

如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。

首先，介绍了什么是作用域链，我们把通过作用域查找变量的链条称为作用域链；作用域链是通过词法作用域来确定的，而词法作用域反映了代码的结构。其次，介绍了在块级作用域中是如何通过作用域链来查找变量的。最后，又基于作用域链和词法环境介绍了到底什么是闭包。

- 作业
4.js