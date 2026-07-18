---
theme: smartblue
highlight: a11y-dark
---
> 假如您也和我一样，在准备春招。欢迎加我微信`shunwuyu`，这里有几十位一心去大厂的友友可以相互鼓励，分享信息，模拟面试，共读源码，齐刷算法，手撕面经。来吧，友友们！

## 前言

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8a0a09db96c4fde81681732344fcda7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1280&h=1706&s=2221720&e=png&b=e8e3d4)

今天是元宵，祝大家元宵快乐，吃的甜甜蜜蜜，过的热热闹闹。[记帮主成功的字节面试 - 掘金 (juejin.cn)](https://juejin.cn/post/7337918042254917658)记住了`IT帮`帮主成功的字节一面，还在家里被百度一面吓坏的我，梦里惊魂又坐起，给大家继续记录帮主的字节二面面经。`如烟`也约到了百度和小米的面试， 帮主每天电话陪伴模拟面试，金三银四工作爱情双丰收...

## 二面面试题

### 自我介绍

大家可以查看[面试：百度一面，吓尿了 - 掘金 (juejin.cn)](https://juejin.cn/post/7335337310547017768#heading-2 "https://juejin.cn/post/7335337310547017768#heading-2"),里面介绍了敖丙大佬自我介绍公式：**我是谁+从哪里来+我做过什么+有什么成绩+为什么能胜任。**

帮主说他也基本是这个套路，会刻意把对代码的热情、学习方式（引出怎么学习这道热题，早已准备好）、AI的兴趣（引出对LLM的理解，看待未来的方式）

### 根据项目中滚动到底部

帮助在项目中，首页列表使用到了滚动到底部加载更多功能。业务代码耦合在组件里，比如事件监听，page参数watch执行请求， 节流等。面试官问可不可以优化一下？

首先，滚动到底部加载更多功能确实挺复杂的。帮主在介绍项目的时候，也把它作为了项目的难点来表达。一面面试官没发难，二面这一上来就开火了。 大家在面大厂的时候，确实要提前准备好自己的项目亮点和难点。如果除了基本的全家桶、组件化外， 没啥细节，定是过不了的，因为面试官连刁难我们的点都找不到。下次我再开篇， 单独讲项目优化和整理，欢迎大家关注或加我微信`shunwuyu`, 一起为春招大厂努力。

说实话，这个问题不好回答。写项目的时候赶工，能写出来就不错了。vue 好学， 边看文档边就把代码写起来了。遇到滚动加载更多的时候，这个难点折腾了小一天才搞定。既然面试官把这个点捅了出来，面试时的求生欲望让帮主疯狂思考有没有大致思路？帮主项目功底深厚，半分钟后聊出来他会怎么优化这个功能

#### 封装复用

滚动到底部加载更多是大部分`List`组件（项目没有使用第三方UI组件）都需要的功能，事件监听、节流、page、请求、动态效果等都大致相同，封装好就不用每次重新写一堆屎山代码了，遵守`DRY`原则。

#### hooks

hooks 函数是Vue3的重大特性，在一面中，帮主也介绍到了自己使用到的一些hooks函数。用函数做封装，hooks 函数除了封装外，还可以将状态、生命周期、事件监听和移除等都封装到它的内部。因为之前项目里没有写过这么复杂的自定义hooks功能，帮主就大概的把思路讲了一下，再细讲容易出马脚。差不多就收，面试官还满意，双方沉默了几秒...

#### Better Scroll

最后， 帮主打破沉默，绝杀....

记得好像之前接触过`黄轶`老师的Better Scroll, 处理滚动，滚动加载事件如丝般顺滑，如果自己在公司项目中，应该会使用这个组件，或公司组件库中的相应组件。

我也打开黄轶老师的[better-scroll/packages at dev · ustbhuangyi/better-scroll (github.com)](https://github.com/ustbhuangyi/better-scroll/tree/dev/packages)项目，将自己项目的滚动列表换成了Better Scroll.

这样，下次介绍项目的时候就有亮点了，还可以细讲自己从耦合代码到封装，再到采用业内组件的思考和解决过程。

### 封装请求拦截

一面， 帮主介绍了JWT。二面面试官继续刁难，在axios请求拦截添加`Authorization`字段，要求手写实现用fetch 代替axios封装请求拦截器功能。

果然大厂考的都比较底层，对实习生代码动手能力要求太高了。 

首先， 面试官想看我们对JWT的理解程度，因为cookie的安全还有性能问题，我们选择JWT 方案，每次在HTTP请求头中使用`Authorization`字段带上token（服务器端返回token后存在localStorage里）, 就完成了前端部分功能。

其次，查看我们理解http, 手写promise(fetch就是promise实例)，不依赖axios API , 自己完成功能的能力。

```js
// 假设你有一个获取JWT Token的方法 
function getJwtToken() { 
    // 在这里获取实际的token，例如从localStorage或cookie中读取 
    return localStorage.getItem('jwtToken'); 
} 
// 封装fetch方法，使其自动添加JWT Token到Authorization header 
function fetchWithAuth(url, options = {}) { 
    const init = { 
        ...options, 
        headers: { 
            ...(options.headers || {}), 
        Authorization: getJwtToken() ? `Bearer ${getJwtToken()}` : '', 
        }, 
    }; 
    return fetch(url, init) 
        .then(async (response) => { 
            if (!response.ok) { 
                        // 可以根据需要处理错误状态码，比如401未授权时刷新token并重试等 
            if (response.status === 401 ) { 
               ....
            } else { 
               ....
            } 
        }
        return response.json(); // 如果预期响应是JSON格式的话 
        }) 
        .catch((error) => { 
            console.error('Error fetching data:', error); 
            throw error; });
    } 
    // 使用封装后的fetch方法发起请求 
    fetchWithAuth('/api/protected-resource') 
        .then(data => console.log(data)) 
        .catch(error => console.error('Error:', error));
```

果然，这道题后，面试官让我做道promise的题....

没有扎实的代码能力， 字节确实不好面啊。

### promise 功能函数

题目是这样的：实现一个函数， 传入一个promise数组，且每一项都是一个**函数，函数的返回值是promise实例**。 逐个调用函数，拿到每次的结果再调用下一个,最后拿到操作结果，并支持promise**链式调用**。

- 函数要支持promise链式调用
    简单，只需要返回promise实例就好
- 逐个调用
    promise的 all、react 等是并行执行。串行执行，并且持续执行我想到用reduce来做。
    
    
```js
function serialPromiseExecution(promiseArray) {
    return promiseArray.reduce((chain, currentPromiseFn) => {
      // 确保 currentPromiseFn 是一个返回 Promise 的函数
      if (typeof currentPromiseFn !== 'function') {
        throw new Error('All elements in the array must be functions that return a Promise');
      }
  
      // 使用上一个 Promise 的结果作为下一个 Promise 的输入（如果需要的话）
      return chain.then((previousResult) => 
        currentPromiseFn(previousResult)
          .catch((error) => { // 捕获并传播错误，保持整个链的稳定性
            throw error;
          })
      );
    }, Promise.resolve()); // 初始化为 resolved Promise，初始值为空
  }
  
```

这段代码有几个地方提醒下各位看官：

#### 设计reduce支持promise 串行

- 首先我们要理解reduce参数的意义。

```js
promiseArray.reduce((chain, currentPromiseFn) => {
}, Promise.resolve())

```

`chain` 是之前的处理， `currentPromiseFn`为当前项， `Promise.resolve()`为初始值。

- 串联执行的实现
```
return chain.then((previousResult) => 
...
```
初始值为 `Promise.resolve()`, 并且数组每项函数的运行结果都是promise实例（类型焚检测）chain.then 在promise A+规范中它的返回也是promise, 所以实现了reduce的promise 异步串式运行。

- 上次的结果会作为下次运行的输入

```
 currentPromiseFn(previousResult)
```


- 测试用例 

```js
    const promises = [
    () => Promise.resolve(1),
    (value) => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(value + 1)
            }, 2000)
        })
    },
    // (value) => Promise.resolve(value + 1),
    (value) => Promise.resolve(value + 2),
  ];
```

- 结果

```js
serialPromiseExecution(promises)
    .then(finalResult => console.log(finalResult)) // 输出：4
    .catch(err => console.error('Error in the promise chain:', err));
```
reduce 的最后结果依然是 `chain.then` 所以可以thenable

## 总结

到这里， 学院IT帮帮主的二面，也在他扎实的编程能力下，用时一个多小时，征服了面试官。第二天，帮主就顺利拿下了offer, 开启了打麻将，过肥年模式。帮主还是太低调了，拿下全国最好的互联网公司，怎么找也得安排下相亲啊，同意的点赞。

帮主的字节面试让我收藏以下几点：

- 时机取巧

年前就大量面试，积累面试经验，并试图拿下大厂虽少量但较急的部门实习offer。大的招聘是在`金三银四`，但是大厂有些部门在年前发展势头就凸显了，比如AI、新能源。这样的部门会在年前就发offer, 年后直接开工， 等不了春招的流程... 

如果是低年级同学， 一定收藏我的这篇建议， 早点行动。

- 扎实的编程能力

春招中的笔试加面试，这种流程会难很多。帮主的这次面试， 反映出字节该部门（为保密，不给出部门）急于招聘，也不在春招流程中，直接面试，这就是过年面大厂的优势。但是考察确实很有深度。两次面试都是中高难度编程、场景题狂轰滥炸，不是高手绝对搞不定。我从这份面试题里，明白了大厂对编程题的要求。再准备下算法相关，也去面。知道大厂要求，只要实力到位，准备充分，不是字节，就是百度....

## 参考资料

### 滚动加载更多

- [Vue3 实现滚动加载更多 - TeHub](https://tehub.com/a/c5ATL132Tn)

- [Vue3滚动加载（懒加载）_vue3 滚动加载-CSDN博客](https://blog.csdn.net/Cavin80/article/details/128935364)

- [better-scroll/packages at dev · ustbhuangyi/better-scroll (github.com)](https://github.com/ustbhuangyi/better-scroll/tree/dev/packages)
    


