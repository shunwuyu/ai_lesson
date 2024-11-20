## 变量提升
- 变量提升 申明提升 赋值不提升
- 函数提升 申明和赋值都提升

为什么呢？

- js 执行机制
  ![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/de40f2912ef7448987f557e79ebb095c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Im-6ZuF5rOV5ouJ5ouJ:q75.awebp?rk3s=f64ab15b&x-expires=1732427963&x-signature=Lv0sp1yQejUWKnROKl6yluKibkQ%3D)

  一段js代码交给v8引擎，它会先读取它，然后对他进行预编译，编译完之后才会执行

  - 


  预编译为执行做准备 

  - 编译的时候会做点什么事情呢？
    ![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/aa4ae8ad7f7e4e29a3364e3cc0d9d200~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Im-6ZuF5rOV5ouJ5ouJ:q75.awebp?rk3s=f64ab15b&x-expires=1732427963&x-signature=WBEtVIY7YtI8PJ4xKo2eRMfgPSs%3D)
    - 创建执行上下文 并放入执行栈中
      执行上下文由三部分组成：变量环境 词法环境还有可执行代码

      变量环境：主要用来储存var定义的变量和函数的声明
      词法环境：主要用来储存let和const定义的变量和函数的词法作用域信息
      调用栈：v8 引擎用来管理函数之间的调用关系的一种结构

  1.编译总是发生在执行前一刻（短， 相比于其他语言）

  2.全局和函数体的编译会生成执行上下文，存入调用栈

  3.当一个函数执行完毕后，他的执行上下文就会被销毁

  1, 2, 3.js 讲完

- 执行栈 调用栈
  v8 引擎用来管理函数之间的调用关系的一种结构
  4.js