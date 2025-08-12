- Object.assign
    想象一下，你有两个小盒子：
    盒子 A 里有：钥匙、钱包
    盒子 B 里有：手机、充电宝
    现在你想把盒子 B 的东西，全部“复制”到盒子 A 里面去。

    那最后盒子 A 里就有：钥匙、钱包、手机、充电宝。

- 基本语法 —— 先学会怎么用
    Object.assign(目标对象, 源对象1, 源对象2, ...)
    - 目标对象：你要往哪个对象上“粘东西”
    - 源对象：你要从哪些对象“拿东西”
    返回值：返回目标对象本身（注意！是原目标对象，不是新对象）

- demo 1.js
    demo 2.js 
    可以复制多个源对象，顺序很重要！
    覆盖规则 —— 谁后谁说了算

- 浅拷贝 —— 最容易踩坑的地方
    什么是浅拷贝？
    只复制第一层属性
    如果属性是对象或数组，只复制“引用”，不复制“内容”

    4.j

- 如何实现“深拷贝”？—— 对比理解
    5.js

- 特殊值的处理 —— null 和 undefined
    6.js

-   实际应用场景
    给函数参数设置默认值
    快速创建对象副本（浅拷贝）
    7.js 8.js

- 常见误区和注意事项
    误区1：以为它会创建新对象
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };

    Object.assign(obj1, obj2); // obj1 被修改了！
    正确做法（想不改原对象）：
    const newObj = Object.assign({}, obj1, obj2);

    误区2：以为能深拷贝
    const obj = { user: { name: "Tom" } };
    const copy = Object.assign({}, obj);
    copy.user.name = "Jerry";
    console.log(obj.user.name); // Jerry —— 原对象也被改了！

    误区3：忘了 Symbol 属性也会被复制

    const s = Symbol('id');
    const source = { [s]: 123, a: 1 };

    const target = {};
    Object.assign(target, source);

    console.log(target[s]); // 123 —— Symbol 属性也被复制了！


- 赋值和拷贝
    基本类型赋值 —— “真·复制”
    10.js
    对象赋值 —— “只是换个名字，还是同一个东西”
    11.js

- 在 JavaScript 中，基本类型赋值是“复印”，互不影响；对象赋值是“贴标签”，改一个，另一个也跟着变，因为它们指向的是同一个东西。
    这就是为什么我们需要“拷贝
    你想真正地“复印”一个对象，而不是只贴个新标签。

    而“深拷贝”就是要做到：里里外外都完全独立，彻底复印，而不是共享里面的嵌套对象。

    等你理解了“赋值”的这个坑，再学深拷贝就水到渠成了！
    
- 浅拷贝
    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce894a1f1b5c32~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

    arr.slice 
    arr.concat

- 深拷贝
    ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce893a54f6c13d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象


- 乞丐版
JSON.parse(JSON.stringify());
这种写法非常简单，而且可以应对大部分的应用场景，但是它还是有很大缺陷的，比如拷贝其他引用类型、拷贝函数、循环引用等情况。

- 基础版本
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};

如果是深拷贝的话，考虑到我们要拷贝的对象是不知道有多少层深度的，我们可以用递归来解决问题，稍微改写上面的代码：

如果是原始类型，无需继续拷贝，直接返回
如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。

这是一个最基础版本的深拷贝，这段代码可以让你向面试官展示你可以用递归解决问题，但是显然，他还有非常多的缺陷，比如，还没有考虑数组。

- 考虑数组

- 循环引用
    解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

    需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：

    检查map中有无克隆过的对象
    有 - 直接返回
    没有 - 将当前对象作为key，克隆对象作为value进行存储
    继续克隆

