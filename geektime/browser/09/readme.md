# 作用域
- 说说JS里的一国两制？

正是由于 JavaScript 存在变量提升这种特性，从而导致了很多与直觉不符的代码，这也是 JavaScript 的一个重要设计缺陷。

- 怎么解决？
  - let、const 关键字
  - 块级作用域
  - 但是由于 JavaScript 需要保持向下兼容，所以变量提升在相当长一段时间内还会继续存在。

- JavaScript 中会存在变量提升？
  其他语言似乎都没有这个特性呢？

## 作用域 Scope

作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。

- 在 ES6 之前，ES 的作用域只有两种：全局作用域和函数作用域。
- 全局作用域
  在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期。
- 函数作用域
  在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁。
- 块级作用域
  其他语言则都普遍支持块级作用域。块级作用域就是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。
  ```js
  //if块
if(1){}

//while块
while(1){}

//函数块
function foo(){}
 
//for循环块
for(let i = 0; i<100; i++){}

//单独一个块
{}
  ```

  ```c++
  char* myname = "极客时间";
void showName() {
  printf("%s \n",myname); // 极客时间
  if(0){
    char* myname = "极客邦";
  }
}

int main(){
   showName();
   return 0;
}
  ```
  C 语言是支持块级作用域的，所以 if 块里面定义的变量是不能被 if 块外面的语句访问到的。

  和 Java、C/C++ 不同，ES6 之前是不支持块级作用域的，因为当初设计这门语言的时候，并没有想到 JavaScript 会火起来，所以只是按照最简单的方式来设计。没有了块级作用域，再把作用域内部的变量统一提升无疑是最快速、最简单的设计，不过这也直接导致了函数中的变量无论是在哪里声明的，在编译阶段都会被提取到执行上下文的变量环境中，所以这些变量在整个函数体内部的任何地方都是能被访问的，这也就是 JavaScript 中的变量提升。

  变量提升简化了编译器实现，避免块级作用域管理，使早期 JavaScript 引擎更轻量、解析更快。

## 变量提升所带来的问题
- 1. 变量容易在不被察觉的情况下被覆盖掉
```
var myname = "极客时间"
function showName(){
  console.log(myname);
  if(0){
   var myname = "极客邦"
  }
  console.log(myname); // undefined
}
showName()
```

![](https://static001.geekbang.org/resource/image/94/c9/944aaeaeb9ee50feea3c7d218acdd5c9.png?wh=1142*710)

先使用函数执行上下文里面的变量啦！”的确是这样，这是因为在函数执行过程中，JavaScript 会优先从当前的执行上下文中查找变量，由于变量提升，当前的执行上下文中就包含了变量 myname，而值是 undefined，所以获取到的 myname 的值就是 undefined。


这输出的结果和其他大部分支持块级作用域的语言都不一样，比如上面 C 语言输出的就是全局变量，

- 2. 本应销毁的变量没有被销毁
```
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i); 
}
foo()
```
如果你使用 C 语言或者其他的大部分语言实现类似代码，在 for 循环结束之后，i 就已经被销毁了，但是在 JavaScript 代码中，i 的值并未被销毁，所以最后打印出来的是 7。

这同样也是由变量提升而导致的，在创建执行上下文阶段，变量 i 就已经被提升了，所以当 for 循环结束之后，变量 i 并没有被销毁。

## ES6 是如何解决变量提升带来的缺陷

- ES6 引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域。

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量! 忽略
    console.log(x);  // 2
  }
  console.log(x);  // 2
}
```

有两个地方都定义了变量 x，第一个地方在函数块的顶部，第二个地方在 if 块的内部，由于 var 的作用范围是整个函数，所以在编译阶段，会生成如下的执行上下文：

![](https://static001.geekbang.org/resource/image/45/bf/4501368679083f3a8e1a9e4a8e316dbf.png?wh=1142*513)

- 改造过程

```
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```
符合我们的编程习惯了：作用域块内声明的变量不影响块外面的变量。


- JavaScript 是如何支持块级作用域的?

在同一段代码中，ES6 是如何做到既要支持变量提升的特性，又要支持块级作用域的呢？

站在执行上下文的角度

```
function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)
      console.log(b)
    }
    console.log(b) 
    console.log(c)
    console.log(d)
}   
foo()
```

- 第一步是编译并创建执行上下文，
![](https://static001.geekbang.org/resource/image/f9/67/f9f67f2f53437218baef9dc724bd4c67.png?wh=1142*647)

- 函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了
- 通过 let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中。
- 在函数的作用域块内部，通过 let 声明的变量并没有被存放到变量环境中。

- 第二步继续执行代码
  ![](https://static001.geekbang.org/resource/image/7e/fa/7e0f7bc362e0dea21d27dc5fb08d06fa.png?wh=1142*654)

  在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构。需要注意下，我这里所讲的变量是指通过 let 或者 const 声明的变量。

  再接下来，当执行到作用域块中的console.log(a)这行代码时，就需要在词法环境和变量环境中查找变量 a 的值了，具体查找方式是：沿着词法环境的栈顶向下查询，如果在词法环境中的某个块中查找到了，就直接返回给 JavaScript 引擎，如果没有查找到，那么继续在变量环境中查找。

  ![](https://static001.geekbang.org/resource/image/06/08/06c06a756632acb12aa97b3be57bb908.png?wh=1142*557)
  执行完后
  ![](https://static001.geekbang.org/resource/image/d4/28/d4f99640d62feba4202aa072f6369d28.png?wh=1142*722)


  块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。