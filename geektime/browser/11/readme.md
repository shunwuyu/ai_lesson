![](https://time.geekbang.org/column/article/128427)

- 1.js 执行结果

- 在对象内部的方法中使用对象内部的属性？
  - 这是OOP的普遍需求
  - 基于这个需求，JavaScript 又搞出来另外一套 this 机制。
  - 作用域链和 this 是两套不同的系统，它们之间基本没太多联系。
    调用的时候决定的

## JavaScript 中的 this 是什么

- 执行上下文

![](https://static001.geekbang.org/resource/image/b3/8d/b398610fd8060b381d33afc9b86f988d.png?wh=1142*615)

- 变量环境
变量和函数声明如何存储与访问的问题。
var 函数声明（function declarations）
变量提升（hoisting）
- 词法环境（Lexical Environment）
代码在静态结构中如何查找变量（作用域链）的问题。
记录了函数定义时所处的词法作用域，决定了函数内部如何查找外部变量（即闭包的基础）
是实现 词法作用域（Lexical Scoping） 的核心机制，确保函数能正确访问其外层作用域中的变量。

- outer（外层环境引用）
不同执行上下文之间如何形成作用域链的问题。
  每个执行上下文都包含一个指向其外层执行上下文的引用（outer），从而构建出“作用域链”。
  实现了从内向外逐级查找变量的能力，比如嵌套函数访问外层变量。

- this
  函数调用时，动态绑定对象上下文的问题。
  它决定了函数运行时“属于谁”，即当前执行环境的主体对象。
  解决了在面向对象或事件驱动场景中，函数执行时“我指的是谁” 的问题（如事件处理、方法调用等）。

- 每个执行上下文中都有一个 this
  执行上下文主要分为——全局执行上下文、函数执行上下文
  this全局执行上下文中的 this、函数中的 this

## 全局执行上下文中的 this
2.html 

全局执行上下文中的 this 是指向 window 对象的。这也是 this 和作用域链的唯一交点，作用域链的最底端包含了 window 对象，全局执行上下文中的 this 也是指向 window 对象。

执行环境的主体对象是全局 window 

## 函数执行上下文中的 this
```
function foo(){
  console.log(this)
}
foo()
```
默认情况下调用一个函数，其执行上下文中的 this 也是指向 window 对象的。

this 能指向其他对象呢？
- 通过函数的 call 方法设置
let bar = {
  myName : "极客邦",
  test1 : 1
}
function foo(){
  this.myName = "极客时间"
}
foo.call(bar)
console.log(bar) // 极客时间
console.log(myName) // 未定义
// 也可以用 apply 

- 通过对象调用方法设置
要改变函数执行上下文中的 this 指向，除了通过函数的 call 方法来实现外，还可以通过对象调用的方式，

```
var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this)
  }
}
myObj.showThis()
```
使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的。

var myObj = {
  name : "极客时间",
  showThis: function(){
    this.name = "极客邦"
    console.log(this)
  }
}
var foo = myObj.showThis
foo()

this 又指向了全局 window 对象。

在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

- 通过构造函数中设置

function CreateObj(){
  this.name = "极客时间"
}
var myObj = new CreateObj()


当执行 new CreateObj() 的时候，JavaScript 引擎做了如下四件事：首先创建了一个空对象 tempObj；接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当 CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了 tempObj 对象；最后返回 tempObj 对象。


  var tempObj = {}
  CreateObj.call(tempObj)
  return tempObj

## this 的设计缺陷以及应对方案
this 并不是一个很好的设计，因为它的很多使用方法都冲击人的直觉，在使用过程中存在着非常多的坑。下面咱们就来一起看看那些 this 设计缺陷。

1. 嵌套函数中的 this 不会从外层函数中继承

```
var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

函数 bar 中的 this 指向的是全局 window 对象，而函数 showThis 中的 this 指向的是 myObj 对象。

你可以通过一个小技巧来解决这个问题，
在 showThis 函数中声明一个变量 self 用来保存 this，

```
var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this)
    var self = this
    function bar(){
      self.name = "极客邦"
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```

这个方法的的本质是把 this 体系转换为了作用域的体系。

- 你也可以使用 ES6 中的箭头函数来解决这个问题

var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this)
    var bar = ()=>{
      this.name = "极客邦"
      console.log(this)
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)

这是因为 ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。


- 普通函数中的 this 默认指向全局对象 window

不过这个设计也是一种缺陷，因为在实际工作中，我们并不希望函数执行上下文中的 this 默认指向全局对象，因为这样会打破数据的边界，造成一些误操作。

严格模式”来解决

undefined


