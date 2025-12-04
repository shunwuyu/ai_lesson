# 继承

```
// 动物
function Animal(){
  this.species = "动物";
}
//猫
function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
}
```

- 使"猫"继承"动物"?
- 构造函数绑定
```
function Cat(name,color){

　　　　Animal.apply(this, arguments);

　　　　this.name = name;

　　　　this.color = color;

　　}

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```
第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，

二、 prototype模式
如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。

Cat.prototype = new Animal();

　　Cat.prototype.constructor = Cat;

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
它相当于完全删除了prototype 对象原先的值，然后赋予一个新值。
第二行又是什么意思呢？
Cat.prototype.constructor = Cat;
任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。

alert(Cat.prototype.constructor == Animal); 

每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
因此我们必须手动纠正，将Cat.prototype对象的constructor值改为Cat。这就是第二行的意思。
1.html

如果替换了prototype对象,下一步必然是为新的prototype对象加上constructor属性。

- 继承prototype
由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

2.html
将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

Cat.prototype.constructor = Cat;
实际上把Animal.prototype对象的constructor属性也改掉了！
alert(Animal.prototype.constructor); 

- 利用空对象作为中介

  ```
  　var F = function(){};

　　F.prototype = Animal.prototype;

　　Cat.prototype = new F();

　　Cat.prototype.constructor = Cat;


  ```
  F是空对象，所以几乎不占内存。
  修改Cat的prototype对象，就不会影响到Animal的prototype对象。

- 拷贝继承
如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？

- 首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
function Animal(){}

　　Animal.prototype.species = "动物";

再写一个函数，实现属性拷贝的目的。

function extend2(Child, Parent) {

　　　　var p = Parent.prototype;

　　　　var c = Child.prototype;

　　　　for (var i in p) {

　　　　　　c[i] = p[i];

　　　　　　}

　　　　c.uber = p;

　　}

就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。



https://juejin.cn/post/6946022649768181774#heading-30
