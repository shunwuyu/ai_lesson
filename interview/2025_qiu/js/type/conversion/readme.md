# 类型转换

- 显式转换 Explicit Conversion
    开发者主动用函数或语法转换类型。
    ```js
    String(123) // "123"
    Number("123") // 123
    Boolean(0) // false
    ```
- 隐式转换（Implicit Conversion / Type Coercion）
    JS 在需要时自动帮你转换。
    ```js
    "5" + 1 // "51"（数字转成字符串，再拼接）
    "5" - 1 // 4（字符串转成数字，再运算）
    ```

- 显式转换
    1. 转字符串
    1.js
    2. 转数字
    2.js
    3. 转布尔值
    3.js

- 隐式转换核心规则
JS 的隐式转换主要出现在：
1. 运算符（+、-、*、/、== 等）
2. if / while 条件判断
3. 对象与原始值比较

- 加号 +
    - 加号优先进行字符串拼接：
    ```js
    1 + "2" // "12"
    true + "2" // "true2"
    ```

    - 但如果两边都是数字：
    ```js
    1 + 2 // 3
    ```
    特殊：
    ```js
    在 JavaScript 的 + 运算中，如果至少有一个操作数是字符串，
    那么另一个操作数也会被转换成字符串，然后进行字符串拼接。
    对象到字符串的转换： 当一个对象（包括数组 [] 和普通对象 {}）
    需要转换为字符串时，JavaScript 会调用它的 toString() 方法。
    空数组 [] 调用 toString() 的结果是空字符串 ""
    {} 的 toString() 方法会返回 "[object Object]"
    [] + {} // "[object Object]"
    {} 被解析器当成了一个空的代码块（block statement），
    而不是一个空对象字面量。
    + []：+ 是一个一元加号操作符 (Unary Plus Operator)，
    它作用于紧跟在它后面的 []
    一元加号 + 会尝试将操作数（这里是 []）转换为一个数字。 0
    {} + [] // 0 （这是因为 `{}` 被解析成空代码块）

    ```

- 其他运算符（- * / %）
    "5" - 2 // 3
    "5" * 2 // 10
    "5" / 2 // 2.5

    如果无法转成数字：
    "abc" - 2 // NaN

- 比较运算 ==
    面试高频陷阱：== 会进行复杂的类型转换，=== 不会。

    不同类型 → 尝试转成数字
    null 和 undefined 只和彼此相等
    NaN 不等于任何值（包括自己）

    ```js
    0 == false // true
    先将布尔值转换为数字。
    新的比较： "0" == 0
    最终比较： 0 == 0
    "0" == false // true
    null == undefined // true
    <!-- 
    其中一个操作数是布尔值（Boolean） 时，它会立即将这个布尔值转换为数字（Number），
    布尔值先转换：false -> 0。现在变成 [] == 0。
    [] 调用 valueOf() 通常返回对象本身（还是数组），不适用。“”
    现在变成 "" == 0。
    字符串转换为数字：Number("") -> 0
    0 == 0 -> true。 -->

    [] == false // true
    [] == ![] // true（因为 `![]` 先变成 false）

    ```

    处理 undefined 和 null 的特殊情况。
    如果一边是布尔值，优先将布尔值转换为数字
    如果一边是字符串，另一边是数字，将字符串转换为数字。
    如果一边是对象，另一边是原始类型，尝试将对象转换为原始值（通常是字符串或数字

- 对象和原始值比较
    调用 valueOf() 或 toString()
    [1, 2] == "1,2" // true


- 题目
    不会进行类型转换
    两边的类型是相同的
    比较的是引用地址 → false
    [] == [] // false
    [] == ![]       // true
    null 的行为是特殊的
    null 在 == 比较中有特殊规则：它只等于 undefined 和 null
    null == undefined 返回 true。
    null == null 返回 true。
    null 与任何其他类型的值进行 == 比较，结果都是 false
    null == 0 false    


    if ([] && {}) {
        console.log('Hello');
    }

    输出 Hello
    因为 [] 和 {} 都是 truthy 值。



    var a = {
  valueOf() {
    return 1;
  },
  toString() {
    return "2";
  }
};
对象参与 + 运算时，先调用 valueOf() → 1 + 1 = 2
console.log(a + 1); // ? 2