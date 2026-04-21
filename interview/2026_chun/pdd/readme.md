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