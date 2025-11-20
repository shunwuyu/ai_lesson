[source](https://time.geekbang.org/column/article/129596)


## JS 内存机制

如果你想成为行业专家，并打造高性能前端应用，那么你就必须要搞清楚 JavaScript 的内存机制了。

- 数据在内存中的存放
- JavaScript 处理垃圾回收
- V8 执行代码


## JavaScript 中的数据是如何存储在内存中的
- JavaScript 并不需要直接去管理内存
  C++ 负责内存的分配和释放使用 new / delete（或 malloc / free）手动分配和释放堆内存。
  JavaScript 是一种高级语言，具有自动内存管理机制（垃圾回收，Garbage Collection, GC）。开发者不需要手动分配或释放内存。

- 1.js 2.js
  仅仅改变了 a 中 name 的属性值，但是最终 a 和 b 打印出来的值都是{name:"极客邦"}。这就和我们预期的不一致了，因为我们想改变的仅仅是 a 的内容，但 b 的内容也同时被改变了。

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
  在声明变量之前需要先定义变量类型。我们把这种在使用之前就需要确认其变量数据类型的称为静态语言。
    - c = a
    把 int 型的变量 a 赋值给了 bool 型的变量 c，这段代码也是可以编译执行的，因为在赋值过程中，C 编译器会把 int 型的变量悄悄转换为 bool 型的变量，我们通常把这种偷偷转换的操作称为隐式类型转换。

    而支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。在这点上，C 和 JavaScript 都是弱类型语言。

  相反地，我们把在运行过程中需要检查数据类型的语言称为动态语言。比如我们所讲的 JavaScript 就是动态语言，因为在声明变量之前并不需要确认其数据类型。
- JS 是动态弱类型语言
  ![](https://static001.geekbang.org/resource/image/36/f0/36f0f5bdce0a6d8c36cbb8a76931cff0.png?wh=1142*815)

- 弱类型，意味着你不需要告诉 JavaScript 引擎这个或那个变量是什么数据类型，JavaScript 引擎在运行代码的时候自己会计算出来。

- 动态，意味着你可以使用同一个变量保存不同类型的数据。
```
var bar
bar = 12 
bar = "极客时间"
bar = true
bar = null
bar = {name:"极客时间"}
```
我们声明了一个 bar 变量，然后可以使用各种类型的数据值赋予给该变量。

- 怎么看它的类型 typeof 
```
var bar
console.log(typeof bar)  //undefined
bar = 12 
console.log(typeof bar) //number
bar = "极客时间"
console.log(typeof bar)//string
bar = true
console.log(typeof bar) //boolean
bar = null // null 在 JavaScript 中被设计为表示“空对象引用”，因此 typeof null 错误地返回 "object"，这是历史遗留 bug。
console.log(typeof bar) //object 
bar = {name:"极客时间"}
console.log(typeof bar) //object
```

- JavaScript 中的数据类型一种有 8 种
  ![](https://static001.geekbang.org/resource/image/85/15/85b87602eac65356c9171bbd023f5715.png?wh=1142*648)

  - 使用 typeof 检测 Null 类型时，返回的是 Object。这是当初 JavaScript 语言的一个 Bug，一直保留至今，之所以一直没修改过来，主要是为了兼容老的代码。
  - Object 类型比较特殊，它是由上述 7 种类型组成的一个包含了 key-value 对的数据类型。如下所示：
    ```
    let myObj = {
        name:'极客时间',
        update:function(){....}
        }
    ```

    Object 是由 key-value 组成的，其中的 vaule 可以是任何类型，包括函数

    我们把前面的 7 种数据类型称为原始类型
    把最后一个对象类型称为引用类型
    之所以把它们区分为两种不同的类型，是因为它们在内存中存放的位置不一样。

## 内存空间

![](https://static001.geekbang.org/resource/image/62/57/6293f5315a5bafbd3ba00ee732bfbf57.png?wh=1142*1183)

在 JavaScript 的执行过程中， 主要有三种类型内存空间，分别是代码空间、栈空间和堆空间。
- 代码空间主要是存储可执行代码的

### 栈空间和堆空间
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
- 怎么画调用栈？
当执行到第 3 行代码时，其调用栈的状态
![](https://static001.geekbang.org/resource/image/94/fe/9411221e463a86d043a3461d49c9f1fe.png?wh=1142*716)

当执行到第 3 行时，变量 a 和变量 b 的值都被保存在执行上下文中，而执行上下文又被压入到栈中，所以你也可以认为变量 a 和变量 b 的值都是存放在栈中的。

接下来继续执行第 4 行代码，由于 JavaScript 引擎判断右边的值是一个引用类型，这时候处理的情况就不一样了，JavaScript 引擎并不是直接将该对象存放到变量环境中，而是将它分配到堆空间里面，分配后该对象会有一个在“堆”中的地址，然后再将该数据的地址写进 c 的变量值，最终分配好内存的示意图如下所示：

![](https://static001.geekbang.org/resource/image/22/bc/22100df5c75fb51037d7a929777c57bc.png?wh=1142*551)

对象类型是存放在堆空间的，在栈空间中只是保留了对象的引用地址，当 JavaScript 需要访问该数据的时候，是通过栈中的引用地址来访问的，相当于多了一道转手流程。

- 为什么一定要分“堆”和“栈”两个存储空间呢？所有数据直接存放在“栈”中不就可以了吗？
这是因为 JavaScript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率


比如文中的 foo 函数执行结束了，JavaScript 引擎需要离开当前的执行上下文，只需要将指针下移到上个执行上下文的地址就可以了，foo 函数执行上下文栈区空间全部回收，具体过程你可以参考下图：

![](https://static001.geekbang.org/resource/image/d7/7b/d7153d003a72dbd0a9ca84b59ac3857b.png?wh=1142*532)

所以通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。

## 变量 c 赋值给变量 d 是怎么执行的
原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。

![](https://static001.geekbang.org/resource/image/51/f5/51127624a725a18a0e12e0f5a7aadbf5.png?wh=1142*560)

