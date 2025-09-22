- 在移动端项目中采用了怎样的适配方案
  npm install postcss-px-to-viewport --save-dev
  postcss.config.js
- 自定义Hook usePrevious
  在实际开发中，我们有时候需要知道某个 state 的上一次的值，比如 count 从 2 变成 3 的时候，想在 useEffect 里知道它之前是多少。但 useEffect 拿到的是当前渲染的值，有没有什么办法能拿到‘前一次’的值呢？”
  “如果你来封装一个这样的功能，你会怎么设计？能不能写一个叫 usePrevious 的自定义 Hook 来实现这个能力？”
  我会这样设计：
  1. 定义一个 usePrevious 自定义 Hook，接收一个 state 作为参数。
  2. 在 Hook 内部，使用 useRef 来创建一个 ref 对象，用于存储上一次的 state 值。
  3. 在 useEffect 中，每次 state 变化时，将当前的 state 值赋值给 ref 对象的 current 属性。
  4. 最后，返回 ref 对象的 current 属性，即上一次的 state 值。

- Promise.finnaly
        「Promise.prototype.finally 是 ES2018 引入的 API，用于在 Promise 功或失败后都执行一次回调，它不会改变原有的状态和值，只做收尾工作。
    它的返回值会被忽略，但如果回调抛错会覆盖原状态。
    在实际项目中，我常用它来隐藏 loading 或释放资源，相比 then/catch 更简洁、语义化。」

    - 状态透传
    finally 不会改变原来的 resolve/reject 结果
    不管 finally 里做了什么 前面 Promise 的成功值或失败原因，都会像没被拦截一样，“直接穿过去”，传给后面的 .then 或 .catch。

    - 返回值忽略
    finally 回调的返回值会被丢弃
    - 异常处理
    如果 finally 内部抛错或返回 rejected Promise，会覆盖原状态
    finally抛错或返回rejected promise会覆盖原状态，原resolve值不再透传，后续进入catch
    - 链式调用
    支持链式写法，常用于资源清理

    ```js
    showLoading();
    fetchData()
      .then(render)
      .catch(showError)
      .finally(hideLoading); // 成功失败都要隐藏

    ```

    和 try/finally 类似
    try { await xxx } finally { cleanUp() } 的语义糖，尤其在链式调用里更简洁。

- diff 算法
  React 的 Diff 算法其实核心用最小的计算成本找到两棵树的差异，然后只更新真正变化的节点。
  真实的 DOM 树可能非常大，如果每次更新都做完整的树比对，复杂度是 O(n³)，页面就会卡。
  React 的做法很聪明，它基于两个现实前提来优化：

  - 同级比较：如果一个节点类型不一样，比如 <div> 变 <span>，直接整块替换，不做子树深比。
  - 列表用 key：列表渲染时用 key，React 只要用 key 就能快速找到元素的前后对应关系，移动或复用节点，而不是暴力删除重建。

  这样一来，算法复杂度就从 O(n³) 降到了 O(n)。

  所以 Diff 算法的核心思想就是：
  分层比较 + key 定位 + 最小化更新，
  让我们写的代码看起来像每次都重绘整棵树，但实际只动必要的那一点。

  React 18 之后配合 Fiber 架构，这套 Diff 算法还能被拆分成小任务，在浏览器空闲时分片执行，保证页面在大规模更新时依然流畅。
  - 简单diff 

    简单 diff 就是：新节点一个个来，去旧列表里找 key 一样的。找到了就看看是不是在后面，是就留着不动，不是就移到新位置；没找到就新建。用个 lastIndex 记录最右的位置，避免乱移动。最后把旧的里多余的删掉，尽量复用，少动 DOM。

    旧节点：A-B-C（索引 0-1-2）

  新节点：B-C-A

  lastIndex 初始为 0，记录已处理的新节点在旧列表中的最大索引

  流程：
  处理新节点 B（i=0）
  在旧节点中找到 B，其索引 j=1
  因 j (1) >= lastIndex (0) → 不移动
  更新 lastIndex = 1
  处理新节点 C（i=1）
  找到 C，旧索引 j=2
  j (2) >= lastIndex (1) → 不移动
  更新 lastIndex = 2
  处理新节点 A（i=2）
  找到 A，旧索引 j=0
  j (0) < lastIndex (2) → 需要移动
  将 A 移动到当前最后一个节点（C）之后，即移到末尾
  ✅ 结果：只移动 A 一次，B、C 复用不移动，高效。

  比如旧的 vnode 数组是 ABCD，新的 vnode 数组是 DABC，按照简单 diff 算法，A、B、C 都需要移动。

  那怎么优化这个算法呢？

  - 双端diff 
  比如 旧状态是 A B C D， 新状态变成 D C A B
  如果我们一个一个比对，会发现很多节点都换了位置。
  用双端 diff，我们让两个指针分别从两边往中间同时比：先头 vs 头、尾 vs 尾，如果不匹配，就尝试交叉匹配头 vs 尾、尾 vs 头。
  在这个例子里，我们会发现旧的尾 D 和新的头 D 匹上了，于是把 D 移动到最前；接着剩余的 C、A、B，旧的尾 C 会匹配新的头 C，也移动过来；剩下 A B 顺序一致，就复用，不动。
  所以整个过程只做了两个移动操作，大多数节点复用。

- 如何实现删除列表项的DOM操作？若时间绑在UL上又该如何？
  - 自身 remove（新），传统的removeChild 

- 什么是polyfill

  Polyfill 就是“兼容补丁”：当老浏览器不支持新特性（如 Promise、fetch、Array.includes），我们用一段 JS 代码去模拟这些功能，让旧环境也能正常运行。它的作用是保证新语法在旧浏览器上可用，避免因为缺失 API 而报错，提高兼容性和用户体验。

  - 以promise为例
  ```js
  // 简单模拟 Promise（仅示意）
  if (!window.Promise) {
    window.Promise = function(executor) {
      let onResolve;
      this.then = function(callback) {
        onResolve = callback;
        return this;
      };
      const resolve = (value) => {
        setTimeout(() => onResolve(value)); // 模拟异步
      };
      executor(resolve, null);
    };
  }
  ```
  - Babel 如何利用 Polyfill？
  Babel 本身只转译语法（如箭头函数 → 普通函数），但不补全 API。
  @babel/preset-env 配合 useBuiltIns: 'usage'
  → 自动根据你代码中使用的 API（如 Promise、Array.from）
  → 从 core-js 中按需引入对应的 polyfill。

    // 你写的代码
    new Promise((resolve) => resolve(1));

    // Babel + polyfill 后：自动加上 Promise 的兼容代码，并替换
    require('core-js/modules/es.promise');
    new Promise(...);

    Polyfill：用 JS 模拟新 API，让老浏览器支持；
    Babel：通过 @babel/preset-env + core-js，按需注入 polyfill，避免全量引入，提升性能

    ```
    npm install --save-dev @babel/core @babel/cli @babel/preset-env
    npm install core-js@3
    ```
    ```
    {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "modules": "commonjs"
      }
    ]
  ]
}
    ```
    ```js
    {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "modules": "commonjs"
      }
    ]
  ]
}
    ```
    ```
    "build": "babel src -d dist"
    ```
## 字符串

- 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
  - 双指针 + 容错一次
  我用两个指针从字符串两端往中间走，
  如果左右字符相同，就继续往里收缩；
  如果遇到不相同的情况，这就是关键点：
  我有一次删除机会，要么跳过左边这个字符，要么跳过右边那个字符，
  只要有一条路径剩下的子串是回文，就返回 true。
  整个过程最多遍历一次字符串，时间复杂度 O(n)。
  这种“两边夹击 + 允许一次容错”的写法又简洁又高效。”

- 设计一个支持以下两种操作的数据结构：
void addWord(word)
bool search(word)
search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
. 可以表示任何一个字母。

- ts 里面的any，unknown,never有什么区别

  any —— 万能类型，但不安全
  “any 就像给变量关掉了类型检查，你可以对它做任何操作，TypeScript 不会报错。安全性很低，基本相当于回到 JavaScript。”

  unknown —— 安全的 any

  “unknown 表示我们不知道变量类型，但不同于 any，你不能直接使用它，必须先做类型检查。它是类型安全的万能类型。”

  never —— 永远不会出现的类型
  never 表示永远不会有值的类型，通常用于：

  抛出异常的函数

  永远不会返回的函数

  类型穷尽检查（比如 switch-case 枚举检查）”

- ts的内置高级类型（pick,omit 有用过吗？）
  我平时用 Pick、Omit 很多，比如接口返回给前端只要部分字段，我用 Pick；去掉敏感信息或者不想传给子组件，我用 Omit。它们就像积木一样，在已有类型上快速组合、裁剪，既安全又高效。

- interface和type区别
  在 TypeScript 里，interface 和 type 都能用来描述对象的形状（结构类型），本质上很多场景可以互换。
  但是它们有一些关键区别
  - interface —— 面向对象、可扩展
    专门描述对象/类的结构
    可以被继承（extends）和声明合并（declaration merging）
    适合用在大型项目里做“可扩展 API”
    ```ts
    interface User {
  id: number;
  name: string;
}

// 继承
interface Admin extends User {
  role: string;
}

// 声明合并
interface User {
  age: number;
}

const u: User = { id: 1, name: 'Alice', age: 18 };

    ```
    type —— 灵活、组合能力强
    可以定义任何类型，不仅仅是对象
    支持联合类型、交叉类型、条件类型
    不支持重复声明（没有声明合并）

    ```ts
    type ID = number | string;   // 联合类型
    type Point = { x: number, y: number };
    type Circle = Point & { radius: number }; // 交叉类型

    const p: Circle = { x: 0, y: 0, radius: 10 };
    // 类型别名
    type NumberArray = number[];
    ```

    “interface 更像是面向对象的蓝图，可继承、可扩展，适合大型项目或库；
    type 更像万能积木，可以组合、做联合、做交叉，但不能声明合并，适合灵活定义各种类型。”