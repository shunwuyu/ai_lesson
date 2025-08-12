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
