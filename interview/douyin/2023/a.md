---
theme: smartblue
highlight: a11y-dark
---
> 假如您也和我一样，在准备春招。欢迎加我微信`shunwuyu`，这里有几十位一心去大厂的友友可以相互鼓励，分享信息，模拟面试，共读源码，齐刷算法，手撕面经。来吧，友友们！

## 前言


![b4b4ce51dc593e74ab7858bec067349.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6341b03586b940b1a5fb89dc136a8e09~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1280&h=1706&s=201784&e=jpg&b=e8e2d3)

气温骤降，不知道帮主在北京会冷不？

帮主这一趟北上`字节`实习，大大的为我帮（**IT帮**，学校社团）涨了脸。就连一向对你冷淡的`如烟`妹子，也担心这北方的面食帮主能否适应。我这百度一面，被吓的不轻（[面试：百度一面，吓尿了 - 掘金 (juejin.cn)](https://juejin.cn/post/7335337310547017768)），想要来京陪伴，可能没有那么快。`如烟`也在加快春招面试步伐，狠刷各家面经，叮嘱我把帮主的字节面经好好记录，好在帮里传扬。

# 记帮主成功的字节面试

好， 不贫了。我院IT帮帮主年前就成功拿下了字节offer,让协会里的我辈们甚是羡慕。帮主能去字节也在情理之中，他有着超强的学习力和专注的执行力。写这篇文章，记录下字节的面试题，也分享下他的成功经验。

##  良好的学习数据，赢得多家大厂的青睐

我和帮主并非985/双一流，要想去大厂，只能靠漂亮的学习数据，向面试官证明我们的实力。当然也得感谢字节并不是特别看中学校出身，只要简历漂亮，也给面。就喜欢字节这种宁愿错面一千，也不放过一个人才的风格。一起来努力准备春招吧，我坚信只要实力到位，就能去字节。帮主可能会是字节最后一批**上市前拿期权**的同学了，到时`如烟`还不得以身相许？

### 掘金LV5

我们在和`ChatGPT`聊骚的时候，帮主就在用它辅助写技术文章了。往届学长跟我们分享过大厂比较看重技术写作者，善于总结、乐于分享。但想要达到大佬学长们LV5级，至少得大半年吧。帮主非常善于提出js高质量问题，借助AIGC的力量，文章写的又快又好。仅花了一个半月时间，就在掘金升到了LV5级。

这项数据在面试中帮了大忙，帮我内推`百度`的学长也说他leader之所以拿到简历就面我，也是因为几个关键数据，其中写作等级比较高就是其中之一。

掘金LV5级，肯定写了几十篇文章，而且需要蛮多社区同学给我们点赞，文章质量和深度应该可以。面试官基于这点，会觉得我们的基础不错，是个`大厂的苗子`。面试官也喜欢追着我们文章里的技术点提问，所以建议大家也把文章写起来，把握AIGC面试红利。面试官的理解还停留在之前的对技术写作者的考查，而我们已经利用AIGC的方式，两个多月就轻松达到了要求。

**我们面大厂， 因为大厂青睐技术写作者，我们用好AIGC工具,不断提升提问题的能力，并通过文章分享给网友**。

### leetcode 200+

大厂算法要求都比较高，建议leetcode 刷到200+。刷的时候可以囫囵吞枣，快一点，积累题量。面试前，重点刷常考题。推荐 [动态规划终极绝杀！ LeetCode：72.编辑距离_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1qv4y1q78f/?spm_id_from=333.337.search-card.all.click&vd_source=3d50341f547faf8df242a214b04f2d86)

## 口才佳， 模拟面试

帮主口才极佳，在面试前， 组织过我们模拟面试，他当面试官。在这个过程中，他会考虑会面试官会怎么出题，想听怎么样的回答，以及会在什么点上不停的追问。然后再反向，调整自己的面试，并在面试中把握主动。


## 时机

帮主时机选择比较好，春招竞争还是比较大的，多少人竞争一个岗位，听学长说字节的竞争比例大概是200：1，跟公务员差不多（工资是公务员的n倍）。春招要先笔试，再面试，还要在众多候选人里不断那啥。面试官心态也不会急于成交，想看看后面还有没有更好的（好渣啊）。帮主的年前面试简单很多，一不要笔试，二是竞争的人不多（在过年或觉得没准备好），三是今年事今年闭，结果出来的比较快。要是我也提前半个月面试，说不定百度也可能在年前拿下了。

以上是我对帮主拿下字节的关键点分析，欢迎各位留言区一起讨论，补充。接下来，列出帮主的面试真题，一起学习。


## 字节面试题

### 自我介绍

大家可以查看[面试：百度一面，吓尿了 - 掘金 (juejin.cn)](https://juejin.cn/post/7335337310547017768#heading-2),里面介绍了敖丙大佬自我介绍公式：**我是谁+从哪里来+我做过什么+有什么成绩+为什么能胜任。**

### 实现Sum函数链式调用计算多数之和

- 原型链

    最直接的写法就是利用原型链+add方法返回this来实现，total和作为对象的属性来访问的返回

```js

function Sum(initialValue=0) {
    this.total = initialValue;
}
Sum.prototype.add = function(num) {
    this.total += num
    return this;
}

const result = new Sum(1) 
result.add(2).add(3);
console.log(result.total)
```

- 闭包

```js
function sum(...args) {
  // 初始总和值
  let currentSum = args.reduce((acc, val) => acc + val, 0);

  // 定义 sumof 函数
  function sumof(...nextArgs) {
    // 将当前总和值与新传入的参数相加
    currentSum += nextArgs.reduce((acc, val) => acc + val, 0);
    // 返回 sumof，以支持链式调用
    return sumof;
  }

  // 添加 sumof 方法，用于获取最终总和值
  sumof.sumof = function () {
    return currentSum;
  };

  // 返回 sumof 函数，以支持初始调用 sum(1, 2)
  return sumof;
}

// 示例使用
const result = sum(1, 2)(3).sumof();
console.log(result); // 输出：6
```

闭包+递归，避开原型链实现链式调用，再增加了一个sumof.sumof方法专门返回和。es6 展开运算符和reduce用的挺好的， 大家可以仔细玩下。

- 闭包 + 隐式转换

```js

function sum(initialValue = 0) {
    // 初始值
    let total= initialValue;
    // 闭包函数，一直对自由变量sum做累加
    function add(number) {
      total += number;
      // 返回函数本身，实现链式
      return add;
    }
    // 当add 触发隐式转换时，valueOf就会执行，返回自由变量，拿到累加和
    add.valueOf = function() {
      return total;
    };
    // 返回add 形成闭包， 外部可以调用
    return add;
  }
  
  const result = sum(1)(2)(3)(4); // 输出10
  console.log(+result); // 输出10 +触发隐式类型转换
```

`闭包`加`递归`完美实现函数链式调用，再冷不防来个value, 直接隐式类型转换就拿到和了。比在add 上添加静态属性或给sum加数量参数，高级的多。

result是函数，在JS中函数就是对象。`+result`会触发隐式类型转换，想将result转化为原始值(primitive),就会调用valueOf方法。正是利用这个机制，在valueOf方法里返回闭包中的自由变量。

### 编写函数，每次返回下一个质数（Prime number）

> 质数（也称为素数）是一个大于1的自然数，其特征是除了1和它本身以外，不能被其他任何自然数整除。换句话说，一个质数只有两个正因数：1和该质数本身。
> 2是最小的质数，因为它只能被1和2整除。3、5、7、11、13、17、19等都是质数，因为它们各自只能被1和自身整除。

这也是一道大厂的热门题,考查闭包（下一个，自由变量）和质数判断函数的封装。

```js
function isPrime(num) { 
    // 除了1和本身， 都不能整除 
    for (let i = 2; i < num; i++) { 
        if (num % i === 0) { return false; } 
    } 
    // 返回true  排除1
    return num > 1; 
} 
function getPrime() { 
    let currentNumber = 2; 
    // 起始数字 
    return function () { 
        while (true) { 
            if (isPrime(currentNumber)) { 
                const prime = currentNumber; 
                // 闭包自增
                currentNumber++; 
                return prime; 
            } 
            currentNumber++; 
        } 
    }; 
}  

const getNextPrime = getPrime(); 
console.log(getNextPrime()); // 输出：2 console.log(getNextPrime()); // 输出：3 console.log(getNextPrime()); // 输出：5
console.log(getNextPrime()); // 输出：7
console.log(getNextPrime()); // 输出：9
....
```

### 列表转树

经典考题，列表转树，在多种业务开发场景中有这个需求。新手业务经验少，可能没遇到过；或者只是有幸刷到这道题，除代码处，没啥业务感觉。所以将编程答题跟业务经验表达，边coding边聊是个不错的想法!

可以提及以下业务列表：
-  文件目录结构展示
-   组织架构管理与展示
-   多级菜单生成
-   地区行政划分展示
-   评论回复层级构建

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d66294913ef54a14acdbd49eadb49fa0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=372&h=390&s=32699&e=png&b=fefefe)

可组装成树的列表（数组）一般有以下几个要求

- `id` 当前节点id
- `parentId` 当前节点的父节点id
- `children`  组成树时加上

初始数组：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b8e83042746405f9692e869a0789db9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=378&h=1410&s=222637&e=png&b=1f1f1f)

树状对象：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ad7b55e8d9149b7a1df7eb554369af3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=962&h=1120&s=308232&e=png&b=1e1e1e)

#### 遍历数组，逐一找到子节点添加到父节点中

 ```js
 function listToTreeSimple(data) {
  const res = [];
  data.forEach((item) => {
     // 当到当前节点的父节点
    const parent = data.find((node) => node.id === item.parentId);
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      // * 根节点
      res.push(item);
    }
  });
  return res;
}
 ```

两重循环开销比较大， 我们使用哈希表来优化一下：

```
function listToTree(data) {
  // * 先生成parent建立父子关系
  const obj = {};
  data.forEach((item) => {
    obj[item.id] = item;
  });
  // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
  // console.log(obj, "obj")
  const parentList = [];
  data.forEach((item) => {
    const parent = obj[item.parentId];
    if (parent) {
      // * 当前项有父节点
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      // * 当前项没有父节点 -> 顶层
      parentList.push(item);
    }
  });
  return parentList;
}
```
性能提升是很显著的，我们可以向面试官提出`cosole.time()`与`console.timeEnd()`这对好用的性能调试工具。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbc219c5e9664de28666c0996644a115~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1142&h=654&s=379660&e=png&b=1e1e1e)

#### 递归法

这道考题主要想考查的就是递归的编程能力。

```js
function listToTree(list, parentId) {
  const tree = [];
  
  // 遍历列表
  for (let i = 0; i < list.length; i++) {
    if (list[i].parent_id === parentId) {
      // 创建一个节点对象
      const node = {
        id: list[i].id,
        name: list[i].name,
        children: listToTree(list, list[i].id) // 递归调用，查找当前节点的子节点
      };
      
      // 将节点添加到树中
      tree.push(node);
    }
  }
  
  return tree;
}

// 示例数据
const list = [
  { id: 1, name: 'Node 1', parent_id: null },
  { id: 2, name: 'Node 2', parent_id: 1 },
  { id: 3, name: 'Node 3', parent_id: 1 },
  { id: 4, name: 'Node 4', parent_id: 2 },
  { id: 5, name: 'Node 5', parent_id: 2 },
  { id: 6, name: 'Node 6', parent_id: 3 },
  { id: 7, name: 'Node 7', parent_id: 3 },
  { id: 8, name: 'Node 8', parent_id: 4 }
];

// 调用函数进行转换
const tree = listToTree(list, null);

// 输出结果
console.log(JSON.stringify(tree, null, 2));
```

面试官一上来，就三道编程题，字节还是烦难面的，需要有两把刷子。接下来面试官主要围绕项目来提了些问题

### 项目

#### 针对全栈项目问了前后端登录流程
- JWT JSON Web Tokens
    
  Authorization: Bearer JWT  取代cookie
  
  axios 请求拦截中设置HTTP Header Authorization 字段
  
  ```js
  ...
  instance.interceptors.request.use(config => {
      
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  })
  
  ```
  
  - token生成和校验
  
  安装jsonwebtoken
  
  ```js
  npm install jsonwebtoken
  ```
  生成token
  ```js
  const jwt = require('jsonwebtoken'); 
  // 定义 secret key，用于签名 token 
  const secretKey = 'your-secret-key'; 
  // 在生产环境中应存储于安全位置 比如放到.env中
  // 用户信息
  const user = { id: 1, username: 'exampleUser' }; 
  // 生成 token 
  function generateToken(user) { 
  const payload = { 
      ...user, 
      exp: Math.floor(Date.now() / 1000) + (60 * 60) 
  }; // 设置过期时间（这里为一小时后） 
  return jwt.sign(payload, secretKey); 
  } // 使用 
  const token = generateToken(user); 
  console.log(token);
  ```
  验证token
  
  ```js
  // 验证 token 
  function verifyToken(token) { 
      return new Promise((resolve, reject) => { 
          jwt.verify(token, secretKey, (err, decoded) => { 
              if (err) { return reject(err); } 
              resolve(decoded); // 解码后的用户信息 
          }); 
      }); 
  } 
  
  ```
 
 - **Vue.js前端登录流程**
 
     描述用户输入账号密码后，Vue前端如何通过HTTP请求（如axios）向后端发起登录请求，并携带必要的认证信息
 
     登录成功后，如何接收并存储后端返回的JWT（通常存储在浏览器的localStorage或sessionStorage中）
 
 - 前端路由守卫

 ```js
 // 在Vue应用的初始化文件（如 main.js）中配置Vue Router 
 import Vue from 'vue'; 
 import VueRouter from 'vue-router'; 
 import jwt_decode from 'jwt-decode'; // 用于解码JWT 
 import store from './store'; // 假设你有一个Vuex store来管理登录状态等信息 
 const routes = [ /* 这里是你的路由配置 */ ];
 const router = new VueRouter({ routes, }); 
 // 全局前置导航守卫 
 router.beforeEach((to, from, next) => { 
 const token = localStorage.getItem('token'); 
 // 假设JWT存储在本地存储中 
 let decodedToken; 
 if (token) { 
     try { 
         decodedToken = jwt_decode(token); // 检查token是否过期或其他自定义逻辑 
         if (decodedToken.exp * 1000 < Date.now()) { 
             store.dispatch('logout'); 
             // 如果过期，触发登出操作并清除状态 
         } else { 
         // 如果token有效，则继续导航并可能将用户信息存入store 
         store.commit('setUser', decodedToken); 
         } 
     } catch (err) { 
     // JWT格式错误或无法解码，处理错误情况 
     store.dispatch('logout');
 } } // 根据用户的登录状态决定跳转路径 
 if (to.meta.requiresAuth && !decodedToken) { 
 // 若目标路由需要认证且用户未登录 
 next({ name: 'Login' }); 
 // 重定向到登录页 
 } else { next(); 
 // 否则正常进行路由切换 
 } 
 }); 
 ```
 
 - 相比于cookie， JWT的优点

 **特性**     | **JWT（JSON Web Tokens）**                                                       | **Cookie**                                          |
| ---------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| **自包含性**   | JWT包含了所有必要的用户信息，并且可以携带权限数据。服务器无需查询数据库即可验证和理解令牌内容。                              | Cookie通常只存储会话ID，服务器需要根据会话ID查询数据库来获取用户状态。            |
| **无状态性**   | 服务端无须保存任何会话状态，减轻了服务器负担，有利于横向扩展。                                                | 服务端需要维护会话存储，如Session，增加了服务器开销和复杂度。                  |
| **跨域支持**   | JWT可以通过Authorization头发送，不受同源策略限制，因此适用于微服务架构或多个子域名的场景。                          | Cookie受到同源策略约束，进行跨域请求时需处理CORS问题。                    |
| **安全性**    | 可以通过HTTPS传输，并对JWT内容进行签名（Signature）或加密（Encryption），保护数据安全。虽然JWT默认不加密，但可以根据需求设置。 | Cookie可通过HTTPOnly、Secure等属性增强安全性，但仍然有被截获的风险。        |
| **大小限制**   | JWT相对较小，适合于移动设备等带宽受限环境，但也需要注意payload大小不宜过大。                                    | Cookie的大小有限制，过大会影响性能。                               |
| **生命周期控制** | JWT中包含过期时间(exp)，可以精确控制 token 的有效时间。                                            | Cookie的有效时间可以通过Expires或Max-Age属性控制，但不如JWT中的exp字段直观。 |
| **可扩展性**   | JWT标准定义清晰，易于与其他系统集成，同时支持自定义claim进行扩展。                                          | Cookie的扩展性较低，主要用于简单的会话管理。
 
#### 项目亮点

帮主介绍了以下几点，大家可以根据这些技术点，去看在相应链接。

- 路由切换时，添加了transition效果。可以参照 [vue 路由切换动画（滑入，滑出效果） - 掘金 (juejin.cn)](https://juejin.cn/post/6937163931962048542?searchId=20240221200558586EBDD8BB0A6A46A6AB)
- 使用了hooks 函数式编程。
 
  [useTitle](https://juejin.cn/post/7308277343243141172?searchId=20240221200829E4E32FF53F90FA4A30AD#heading-5)等
- 性能优化和难点安排了虚拟列表

  [虚拟列表](https://juejin.cn/post/7211437215334989884?searchId=202402212016449F3C4E486AFDA4469E91)

- AIGC 安装了chatbot

     [chatgpt-vue/src/libs/gpt.ts at master · lianginx/chatgpt-vue (github.com)](https://github.com/lianginx/chatgpt-vue/blob/master/src/libs/gpt.ts)


## 总结

一面到这里就结束了，面试官挺满意的。当天下午就通知一面过了。如果您觉得文章还不错，欢迎点赞收藏，下编记录帮主成功的字节二面。
 
欢迎加微信`shunwuyu`, 一起加油24年春招！
  
## 参考资料

- [vue3 自定义hooks 大集合 你要的自定义hooks 都在这，快来看吧！ - 掘金 (juejin.cn)](https://juejin.cn/post/7308277343243141172?searchId=20240221200829E4E32FF53F90FA4A30AD#heading-5)
- [大厂面试官：你做过什么有亮点的项目吗？ - 掘金 (juejin.cn)](https://juejin.cn/post/7211437215334989884?searchId=202402212016449F3C4E486AFDA4469E91#heading-3)
- [chatgpt-vue/src/libs/gpt.ts at master · lianginx/chatgpt-vue (github.com)](https://github.com/lianginx/chatgpt-vue/blob/master/src/libs/gpt.ts)