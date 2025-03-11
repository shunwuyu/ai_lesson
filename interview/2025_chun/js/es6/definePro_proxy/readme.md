https://github.com/mqyqingfeng/Blog/issues/107

- var obj = {value: 1}
  我们该怎么知道 obj 发生了改变呢
  数据绑定关键在于监听数据的变化

## definePropety
Object.defineProperty 主要用于精确控制对象属性的定义与配置，包括其值、可写性、可枚举性及可配置性。

es5 在一个对象上定义一个新属性，或者修改一个对象的现有属性 并返回这个对象。
Object.defineProperty(obj, prop, descriptor)
obj: 要在其上定义属性的对象。
prop:  要定义或修改的属性的名称。（缺点 对象上的属性要一个个定义）
descriptor: 将被定义或修改的属性的描述符。

- 为什么需要？
虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。

- props 解释下
1.js  num 

- 解释下description 
函数的第三个参数 descriptor 所表示的属性描述符有两种形式：数据描述符和存取描述符。

- 描述符
  - configurable
  当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
  2.js 重新配置 或 delete configure
  writable 值
  - enumerable
  当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
  3.js
  enumerable 决定了对象的属性是否会在循环中（如 for...in 或 Object.keys）被枚举出来
  
- 存取描述符同时具有以下可选键值：
  - get
  - set

- watch API


## proxy
defineProperty 只能重定义属性的读取（get）和设置（set）行为
到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。 一次性代理整个对象。

var proxy = new Proxy(target, handler);

new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
5.js
