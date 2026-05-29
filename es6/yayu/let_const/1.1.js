showName()
console.log(myname)

var myname = 'zhangsan'
function showName() {
  console.log('函数showName被执行')
}

// v8 引擎是这样
// https://juejin.cn/post/7438053675518738459
// var myname
// function showName() {
//   console.log('函数showName被执行')
// }
// showName()
// console.log(myname)
// myname = 'zhangsan'

// ![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/de40f2912ef7448987f557e79ebb095c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Im-6ZuF5rOV5ouJ5ouJ:q75.awebp?rk3s=f64ab15b&x-expires=1747547982&x-signature=HtK1E7am0TR01F7bbxBVfG7jq2U%3D)
// v8引擎一读取到这段代码就会创建执行上下文对象并放入调用栈中，然后再执行
// 变量环境 词法环境还有可执行代码。
// ![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/aa4ae8ad7f7e4e29a3364e3cc0d9d200~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Im-6ZuF5rOV5ouJ5ouJ:q75.awebp?rk3s=f64ab15b&x-expires=1747547982&x-signature=GGUyhn8FEK9fZSuQDhQ7vmwMEHY%3D)

// 函数的词法作用域信息指的是：函数在定义时所在的作用域（即函数“诞生”时的环境），这个信息决定了函数在调用时如何解析其内部访问的外部变量。
