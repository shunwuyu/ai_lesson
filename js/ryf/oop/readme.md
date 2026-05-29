# Javascript 面向对象编程

## 封装

Javascript是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象（简单数据都用包装类）。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有class（类）。

- 如果我们要把"属性"（property）和"方法"（method），封装成一个对象，甚至要从原型对象生成一个实例对象，我们应该怎么做呢？

一、 生成实例对象的原始模式

把猫看成一个对象，它有"名字"和"颜色"两个属性。

var Cat = {
　　　　name : '',

　　　　color : ''

}

这个原型对象的规格（schema），生成两个实例对象。

```
var cat1 = {}; // 创建一个空对象

　　　　cat1.name = "大毛"; // 按照原型对象的属性赋值

　　　　cat1.color = "黄色";

　　var cat2 = {};

　　　　cat2.name = "二毛";

　　　　cat2.color = "黑色";
```

这就是最简单的封装了, 把两个属性封装在一个对象里面
这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。 套了个模子。

二、原始模式的改进

我们可以写一个函数，解决代码重复的问题。
```
function Cat(name,color) {

　　　　return {

　　　　　　name:name,

　　　　　　color:color

　　　　}

}
```
var cat1 = Cat("大毛","黄色");

　　var cat2 = Cat("二毛","黑色");

cat1和cat2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

三、 构造函数模式

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

猫的原型对象现在可以这样写，

```
function Cat(name,color){

　　　　this.name=name;

　　　　this.color=color;

　　}
```

　var cat1 = new Cat("大毛","黄色");

　　var cat2 = new Cat("二毛","黑色");

　　alert(cat1.name); // 大毛

　　alert(cat1.color); // 黄色

cat1和cat2会自动含有一个constructor属性，指向它们的构造函数

　alert(cat1.constructor == Cat); //true

　　alert(cat2.constructor == Cat); //true

Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系。

cat1 instanceof Cat
cat2 instanceof Cat

- 构造函数模式的问题
构造函数方法很好用，但是存在一个浪费内存的问题。
我们现在为Cat对象添加一个不变的属性type（种类），再添加一个方法eat（吃）。那么，原型对象Cat就变成了下面这样：

function Cat(name,color){

　　　　this.name = name;

　　　　this.color = color;

　　　　this.type = "猫科动物";

　　　　this.eat = function(){alert("吃老鼠");};

　　}

var cat1 = new Cat("大毛","黄色");

　　var cat2 = new Cat ("二毛","黑色");


alert(cat1.type); //
　cat1.eat(); // 吃老鼠

表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。

console.log(cat1.eat == cat2.eat);

- Prototype模式

Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

function Cat(name,color){

　　　　this.name = name;

　　　　this.color = color;

　　}

　　Cat.prototype.type = "猫科动物";

　　Cat.prototype.eat = function(){alert("吃老鼠")};

var cat1 = new Cat("大毛","黄色");

　　var cat2 = new Cat("二毛","黑色");

　　alert(cat1.type); // 猫科动物

　　cat1.eat(); // 吃老鼠

实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。

- Prototype模式的验证方法
为了配合prototype属性，Javascript定义了一些辅助方法，帮助我们使用它。

  - isPrototypeOf()
  alert(Cat.prototype.isPrototypeOf(cat1)); //true

　　alert(Cat.prototype.isPrototypeOf(cat2)); //true

  - hasOwnProperty()
  每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。

  　alert(cat1.hasOwnProperty("name")); // true
  alert(cat1.hasOwnProperty("type")); // false

  - in运算符
  alert("name" in cat1);
  alert("type" in cat1);

  in运算符还可以用来遍历某个对象的所有属性。
  for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }

  for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }

## 构造函数的继承
现在有一个"动物"对象的构造函数。

```
function Animal(){
  this.species = "动物";
}
function Cat(name,color){
  this.name = name;
　this.color = color;
}
```

才能使"猫"继承"动物"呢

- 构造函数绑定
第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：
```
function Cat(name,color){

　　　　Animal.apply(this, arguments);

　　　　this.name = name;

　　　　this.color = color;

　　}

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```
二、 prototype模式
如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。

Cat.prototype = new Animal();

Cat.prototype.constructor = Cat;

var cat1 = new Cat("大毛","黄色");

alert(cat1.species); // 动物
代码的第一行，我们将Cat的prototype对象指向一个Animal的实例。
Cat.prototype = new Animal();
它相当于完全删除了prototype 对象原先的值，然后赋予一个新值。但是，第二行又是什么意思呢？
Cat.prototype.constructor = Cat;
原来，任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。

Cat.prototype.constructor == Animal

每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。

　alert(cat1.constructor == Cat.prototype.constructor); 

在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！

alert(cat1.constructor == Animal); 

这显然会导致继承链的紊乱（cat1明明是用构造函数Cat生成的），因此我们必须手动纠正，将Cat.prototype对象的constructor值改为Cat。这就是第二行的意思。

这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了prototype对象，

　　o.prototype = {};

那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。

　　o.prototype.constructor = o;

- 直接继承prototype

第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

function Animal(){ }

　　Animal.prototype.species = "动物";

将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。

```
Cat.prototype = Animal.prototype;

Cat.prototype.constructor = Cat;

var cat1 = new Cat("大毛","黄色");

alert(cat1.species); // 动物
```
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

　Cat.prototype.constructor = Cat;

这一句实际上把Animal.prototype对象的constructor属性也改掉了！

　alert(Animal.prototype.constructor); // Cat

-  利用空对象作为中介
由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。

```
　var F = function(){};

　　F.prototype = Animal.prototype;

　　Cat.prototype = new F();

　　Cat.prototype.constructor = Cat;
```

F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。

　alert(Animal.prototype.constructor); // Animal

我们将上面的方法，封装成一个函数，便于使用。

function extend(Child, Parent) {

　　　　var F = function(){};

　　　　F.prototype = Parent.prototype;

　　　　Child.prototype = new F();

　　　　Child.prototype.constructor = Child;

　　　　Child.uber = Parent.prototype;

　　}


extend(Cat,Animal);

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物


Child.uber = Parent.prototype;

意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。


- 五、 拷贝继承

上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。

首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
然后，再写一个函数，实现属性拷贝的目的。
function Animal(){}

　　Animal.prototype.species = "动物";

function extend2(Child, Parent) {

　　　　var p = Parent.prototype;

　　　　var c = Child.prototype;

　　　　for (var i in p) {

　　　　　　c[i] = p[i];

　　　　　　}

　　　　c.uber = p;

　　}

　extend2(Cat, Animal);

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物


