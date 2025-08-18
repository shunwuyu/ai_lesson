- 数组方法
背一堆 API 名字，基本没分
分维度组织回答 

- 是否修改原数组（纯函数 vs 非纯函数）
- ES6+ 新增方法 vs 传统方法
- 遍历类 / 查找类 / 转换类 / 拼接类 / 统计类

- 会修改原数组的方法， 非纯函数 → 开发要注意副作用
    push / pop / shift / unshift
    栈/队列操作
    shift/unshift 性能差（移动元素）

    splice（删除/插入/替换）
    array.splice(start, deleteCount, item1, item2, ...)
    ```
    const arr = [1, 2, 3, 4, 5];

    // 从索引 2 开始，删除 2 个元素
    const removed = arr.splice(2, 2);
    console.log(removed); // [3, 4]
    console.log(arr);     // [1, 2, 5] ← 原数组被修改！
    如果想不修改呢？
    const newArr = arr.slice(0, 2).concat(arr.slice(2)); // 或 [...arr]
    ```
    sort / reverse
    let arr = [3,1,2];
    arr.sort(); // ["1","2","3"] 注意默认字典序
    arr.sort((a,b)=>a-b); // [1,2,3]

    const numbers = [10, 1, 20, 3, 5];

    const sorted = numbers.sort();

    console.log(sorted); // ❌ [1, 10, 20, 3, 5] 字典

   - copyWithin / fill
   arr.fill(value, start, end)
   [1,2,3,4].fill(0,1,3); // 结果是 [1,0,0,4]

- 不会修改原数组的方法（纯函数，推荐多用）
    遍历类
    forEach 无返回，常用副作用
    map 返回新数组，纯函数
    查找类
    find / findIndex / findLast (ES2022)

    [1,2,3].find(x=>x>1); // 2 用于查找第一个符合条件的元素
    [1,2,3].findIndex(x=>x>1); // 1 用于查找第一个符合条件的元素下标

    过滤/判定
    filter 返回子集
    some / every（布尔）
    const users = [
    {name: 'Alice', role: 'user'},
    {name: 'Bob',   role: 'admin'}
    ];
    const hasAdmin = users.some(u => u.role === 'admin'); // true

    const people = [
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 18 },
    { name: 'Charlie', age: 25 }
    ];

    // 判断是否所有人都是成年人（年龄 >= 18）
    const allAdults = people.every(person => person.age >= 18);

    console.log(allAdults); // true

    - 拼接/裁剪
    concat
    slice

    - flat / flatMap
    [1,[2,3]].flat();

    - 迭代器类
        keys / values / entries

    - join / toString
        [1,2,3].join('-'); 
    - 归约
        reduce / reduceRight
        [1,2,3].reduce((a,b)=>a+b,0); // 6

- es6 + 
    Array.isArray 类型判断：
    构造 Array.from、Array.of
    查找：find、findIndex、findLast、findLastIndex


- 静态方法 vs 实例方法

静态：Array.isArray、Array.from、Array.of

实例：map / filter / reduce ...

- 时间复杂度角度

push/pop → O(1)，快

shift/unshift/splice → O(n)，慢
👉 面试加分：能解释性能影响。


