![](https://time.geekbang.org/column/article/129596)

- JS 执行机制
- 浏览器多进程多线程架构
- JavaScript 的内存机制

## JavaScript 的内存机制
JavaScript 中的数据是如何存储在内存中的。
- JavaScript 并不需要直接去管理内存。
  // 动态分配一个 int 类型的内存
  int *p = (int *)malloc(sizeof(int));
  直接操作内存可精细控制资源，提升性能与效率。
  不直接操作内存的好处避免内存错误，提升安全性与开发效率。
- 但需要了解数据在内存中的存储方式的。

- 1.js 2.js
  2.js 预期不一致 a 和 b 打印出来的值都是{name:"极客邦"}
  想改变的仅仅是 a 的内容，但 b 的内容也同时被改变了。

  得从JavaScript 是什么类型的语言说起。

- JavaScript 是什么类型的语言

```c
int main()
{
   int a = 1;
   char* b = "极客时间";
   bool c = true;
   return 0;
}
```

我们把这种在使用之前就需要确认其变量数据类型的称为静态语言。
相反地，我们把在运行过程中需要检查数据类型的语言称为动态语言（JS）。

```
int main()
{
   int a = 1;
   char* b = "极客时间";
   bool c = true;
   c = a;
   return 0;
}
```

这段代码也是可以编译执行的，因为在赋值过程中，C 编译器会把 int 型的变量悄悄转换为 bool 型的变量，我们通常把这种偷偷转换的操作称为隐式类型转换。而支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。

```
  let a = 1;
  let  c = true;
   c = a
```

![](https://static001.geekbang.org/resource/image/36/f0/36f0f5bdce0a6d8c36cbb8a76931cff0.png?wh=1142*815)

## JavaScript 的数据类型
JavaScript 是一种弱类型的、动态的语言。
- 弱类型，意味着你不需要告诉 JavaScript 引擎这个或那个变量是什么数据类型，JavaScript 引擎在运行代码的时候自己会计算出来。
- 动态，意味着你可以使用同一个变量保存不同类型的数据。

```js
var bar
bar = 12 
bar = "极客时间"
bar = true
bar = null
bar = {name:"极客时间"}
```
如果你想要查看一个变量到底是什么类型 , 怎么办？
typeof 

```
var bar
console.log(typeof bar)  //undefined
bar = 12 
console.log(typeof bar) //number
bar = "极客时间"
console.log(typeof bar)//string
bar = true
console.log(typeof bar) //boolean
bar = null
console.log(typeof bar) //object js 
bar = {name:"极客时间"}
console.log(typeof bar) //object
```

- JavaScript 中的数据类型一种有 8 种
  ![](https://static001.geekbang.org/resource/image/85/15/85b87602eac65356c9171bbd023f5715.png?wh=1142*648)

  - 第一点，使用 typeof 检测 Null 类型时，返回的是 Object。这是当初 JavaScript 语言的一个 Bug，一直保留至今，之所以一直没修改过来，主要是为了兼容老的代码。

  - 第二点，Object 类型比较特殊，它是由上述 7 种类型组成的一个包含了 key-value 对的数据类型。如下所示：

  let myObj = {
        name:'极客时间',
        update:function(){....}
        }

  Object 是由 key-value 组成的，其中的 vaule 可以是任何类型，包括函数，这也就意味着你可以通过 Object 来存储函数，Object 中的函数又称为方法

  - 第三点，我们把前面的 7 种数据类型称为原始类型，把最后一个对象类型称为引用类型，之所以把它们区分为两种不同的类型，是因为它们在内存中存放的位置不一样。


## 内存空间
![](https://static001.geekbang.org/resource/image/62/57/6293f5315a5bafbd3ba00ee732bfbf57.png?wh=1142*1183)

在 JavaScript 的执行过程中， 主要有三种类型内存空间，分别是代码空间、栈空间和堆空间。

- 栈空间和堆空间
栈空间就是我们之前反复提及的调用栈，是用来存储执行上下文的。

```
function foo(){
    var a = "极客时间"
    var b = a
    var c = {name:"极客时间"}
    var d = c
}
foo()
```

当执行一段代码时，需要先编译，并创建执行上下文，然后再按照顺序执行代码。
当执行到第 3 行代码时，其调用栈的状态，
![](https://static001.geekbang.org/resource/image/94/fe/9411221e463a86d043a3461d49c9f1fe.png?wh=1142*716)

当执行到第 3 行时，变量 a 和变量 b 的值都被保存在执行上下文中，而执行上下文又被压入到栈中，所以你也可以认为变量 a 和变量 b 的值都是存放在栈中的。

由于 JavaScript 引擎判断右边的值是一个引用类型，这时候处理的情况就不一样了，JavaScript 引擎并不是直接将该对象存放到变量环境中，而是将它分配到堆空间里面，分配后该对象会有一个在“堆”中的地址，然后再将该数据的地址写进 c 的变量值

![](https://static001.geekbang.org/resource/image/22/bc/22100df5c75fb51037d7a929777c57bc.png?wh=1142*551)

对象类型是存放在堆空间的，在栈空间中只是保留了对象的引用地址，当 JavaScript 需要访问该数据的时候，是通过栈中的引用地址来访问的，相当于多了一道转手流程。

原始类型的数据值都是直接保存在“栈”中的，引用类型的值是存放在“堆”中的。不过你也许会好奇，为什么一定要分“堆”和“栈”两个存储空间呢？所有数据直接存放在“栈”中不就可以了吗？

答案是不可以的。这是因为 JavaScript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。比如文中的 foo 函数执行结束了，JavaScript 引擎需要离开当前的执行上下文，只需要将指针下移到上个执行上下文的地址就可以了，foo 函数执行上下文栈区空间全部回收。

![](https://static001.geekbang.org/resource/image/d7/7b/d7153d003a72dbd0a9ca84b59ac3857b.png?wh=1142*532)

通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。

而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。

它最后一步将变量 c 赋值给变量 d 是怎么执行的？

原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。

![](https://static001.geekbang.org/resource/image/51/f5/51127624a725a18a0e12e0f5a7aadbf5.png?wh=1142*560)

## 闭包的内存模型
```js
function foo() {
    var myName = "极客时间"
    let test1 = 1
    const test2 = 2
    var innerBar = { 
        setName:function(newName){
            myName = newName
        },
        getName:function(){
            console.log(test1)
            return myName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("极客邦")
bar.getName()
console.log(bar.getName())
```
由于变量 myName、test1、test2 都是原始类型数据，所以在执行 foo 函数的时候，它们会被压入到调用栈中；当 foo 函数执行结束之后，调用栈中 foo 函数的执行上下文会被销毁，其内部变量 myName、test1、test2 也应该一同被销毁。

我们介绍了当 foo 函数的执行上下文销毁时，由于 foo 函数产生了闭包，所以变量 myName 和 test1 并没有被销毁，而是保存在内存中，那么应该如何解释这个现象呢？

要解释这个现象，我们就得站在内存模型的角度来分析这段代码的执行流程。

- 当 JavaScript 引擎执行到 foo 函数时，首先会编译，并创建一个空执行上下文。
- 在编译过程中，遇到内部函数 setName，JavaScript 引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了 foo 函数中的 myName 变量，由于是内部函数引用了外部函数的变量，所以 JavaScript 引擎判断这是一个闭包，于是在堆空间创建换一个“closure(foo)”的对象（这是一个内部对象，JavaScript 是无法访问的），用来保存 myName 变量。

- 接着继续扫描到 getName 方法时，发现该函数内部还引用变量 test1，于是 JavaScript 引擎又将 test1 添加到“closure(foo)”对象中。这时候堆中的“closure(foo)”对象中就包含了 myName 和 test1 两个变量了。

- 由于 test2 并没有被内部函数引用，所以 test2 依然保存在调用栈中。

![](https://static001.geekbang.org/resource/image/f9/db/f9dd29ff5371c247e10546393c904edb.png?wh=1142*564)

当执行到 foo 函数时，闭包就产生了；当 foo 函数执行结束之后，返回的 getName 和 setName 方法都引用“closure(foo)”对象，所以即使 foo 函数退出了，“ closure(foo)”依然被其内部的 getName 和 setName 方法引用。所以在下次调用bar.setName或者bar.getName时，创建的执行上下文中就包含了“closure(foo)”。

产生闭包的核心有两步：第一步是需要预扫描内部函数；第二步是把内部函数引用的外部变量保存到堆中。

你可以分析下它是如何将对象 jack 拷贝给 jack2，然后在完成拷贝操作时两个 jack 还互不影响的呢。