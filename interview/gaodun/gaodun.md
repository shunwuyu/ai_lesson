# 高顿教育

- 常用的 CSS 选择器
    - 基础选择器
        - 标签选择器
        - ID 选择器
        - 类选择器
        - 通配符选择器  * 
    - 组合选择器
        - 后代选择器  元素内部的所有指定子元素，使用空格表示
        - 子选择器 选择直接子元素，使用 > 表示
        - 相邻兄弟选择器: 选择紧接在指定元素后的元素，使用 + 表示。
        - 通用兄弟选择器: 选择同一父元素下所有指定元素之后的兄弟元素，使用 ~ 表示。
    -  属性选择器
        - 存在属性选择器 选择具有指定属性的元素，使用 [] 表示
            [type] {
                 border: 1px solid black;
            }
        - 等于属性值选择器 选择指定属性值的元素
            [type="text"] {
             border: 1px solid blue;
            }
        - 包含属性值选择器: 选择属性值包含指定子串的元素，使用 *= 表示。
            [class*="button"] {
                background-color: yellow;
            }
        - 开头匹配属性值选择器: 选择属性值以指定字符串开头的元素，使用 ^= 表示。
            [class^="btn"] {
                font-weight: bold;
            }
        - 结尾匹配属性值选择器
            [class$="item"] {
                padding: 10px;
            }
    - 伪类选择器
        - 选择鼠标悬停的元素。 : 选择获取焦点的元素。 选择属于其父元素的第 n 个子元素 选择指定类型的第 n 个子元素 选择属于其父元素的第一个子元素
        : 选择属于其父元素的最后一个子元素 
            a:hover input:focus li:nth-child(2)  p:nth-of-type(1)  
            p:first-child  p:last-child
    - 伪元素选择器
        - ::before: 在元素内容前插入内容
        - ::after: 在元素内容后插入内容
    - 其他选择器
        div:not(.active)选择不匹配指定选择器的所有元素。
    - 组合使用以上选择器

- 选择器优先级
    权重（计分）/优先顺序（后面覆盖前面）
    - 计算方式
        - 内联样式   1000
        - id选择器   100
        - 类选择器   10
        - 标签选择器  1
    - 当多个规则应用于同一个元素时，优先级高的规则会覆盖优先级低的规则。如果优先级相同，后定义的规则会覆盖先定义的规则（即“层叠”原则）。
        css 层叠样式表  div.classname#idname 的优先级为 0, 1, 1, 1
    - 内联样式的优先级最高，因为它直接写在 HTML 中，会覆盖外部或内部样式表中的样式。
    - !important 可以强制某个样式规则的优先级提升到最高等级，甚至超过内联样式。但应谨慎使用，因为它会破坏正常的优先级体系，影响后续的样式维护和调试。
    - 解决冲突
        - 重构选择器：尝试简化选择器，使得代码更具可读性和维护性。
        - 减少使用 !important：尽量避免使用 !important，只有在无法通过其他方式解决时才使用它
        - CSS 架构：采用适当的 CSS 架构，比如 BEM（Block Element Modifier）命名法，来减少选择器冲突的发生。
- 你使用过的伪类和伪元素
    - 2024_qiu/201
- 说说em px rem vw vh % 的区别
    - px 绝对单位，指的是屏幕上的实际像素
        用于固定大小的元素, 但在响应式设计中不如相对单位灵活
    - em
        参考的是当前元素的字体大小  
        常用于相对于父元素字体大小的布局或文本大小。
    - rem
        参考的是根元素（<html>）的字体大小
        常用于全局一致的尺寸定义，方便控制整个页面的相对比例
        与em类似，但rem始终相对于根元素，不受父元素的影响，通常用于创建响应式设计
    - vw
        用于根据视口宽度动态调整元素大小。
        随着窗口大小的变化而变化，适合创建宽度响应式的设计
    - vh
        用于根据视口高度动态调整元素大小
         与vw类似，适合创建高度响应式的设计
    - %
        常用于布局，元素的尺寸根据其父元素的大小动态调整
        相对单位，便于响应式设计，但需要注意父元素的尺寸

    rem 提供了一致性、可预测性和更容易的全局控制，使得在响应式设计中使用更为简便，特别是在处理复杂的布局时。这些优点使得 rem 通常比 em 更加适合现代的CSS布局。

    vw 和 vh 的主要优点在于它们与视口尺寸直接挂钩，适合处理全屏布局、动态响应视口变化的设计，而不需要通过媒体查询来实现。相比之下，rem 更适合基于文本的相对大小调整，通常用于保持全局一致的布局比例。选择哪个单位主要取决于你要实现的具体效果和设计目标。

- transform  有哪些属性
    - 变基
    - translate  平移
    - scale 缩放
    - rotate 旋转
    - skew 倾斜
    - rotate 旋转
    - perspective 定义元素的透视效果
    - transform-origin   原点位置 

- 说说 for of  forEach 区别
    - 适用对象
        for...of: 可以遍历任何可迭代对象，如数组、字符串、Map、Set、NodeList 等。它使用的是可迭代协议。
        forEach: 只能用于数组和类数组对象（如 NodeList），不能用于其他可迭代对象如 Set、Map。
    - 访问索引
        for...of: 只能直接访问数组元素的值，不能直接访问索引
        forEach: 可以通过回调函数的第二个参数直接访问元素的索引
        如果要访问 索引怎么办？
    - 提前终止循环
        for...of: 可以使用 break、continue 和 return 语句来控制循环的执行。
        forEach: 不能提前终止循环，break 和 continue 无效。
        要提前退出，可以通过抛出异常来中断循环（不推荐）。
    - 上下文 (this 绑定)
        for...of: 没有自动的 this 绑定，循环中的 this 取决于外部作用域。
        forEach: 可以通过 thisArg 参数绑定回调中的 this，但也通常使用箭头函数来继承外部 this。

        const array = [1, 2, 3];
        array.forEach(function(value) {
        console.log(this); // 自定义的 this 值
        }, customThis);
    - 异步操作
        for...of: 可以与 async/await 搭配使用，允许在循环中处理异步操作
        const array = [1, 2, 3];
        for (const value of array) {
            await someAsyncFunction(value);
        }
        forEach: 不支持 async/await，即使在回调函数中使用 await，它也不会等待。
    7. 回调函数参数
        for...of: 只提供遍历的值。
        forEach: 提供三个参数：当前元素的值、索引和原数组。

- promise 与 async await 区别
    Promise 是用于处理异步操作的对象，而 async/await 是语法糖，可以让你以同步的方式编写和处理 Promise，使代码更易读。
    - async/await es8 引入
    - 链式风格和同步写法
    - 代码可读性
    - 错误处理
        Promise: 使用 catch() 方法捕获错误。错误处理代码可能分布在链式调用的不同部分。
        async/await: 使用 try/catch 块捕获错误。错误处理代码与异步操作一起集中到一起。
    - 调试
        后者更简单
    -  并发操作
        Promise: 可以使用 Promise.all() 或 Promise.race() 来处理多个并发异步操作。
        async/await: 同样可以 但别扭

    Promise 是基础的异步操作处理方式，适合链式调用和并发操作。
    async/await 是 Promise 的语法糖，提供了更简洁的代码风格和更容易管理的错误处理。

    https://juejin.cn/post/7069805387490263047
- 手写promise.all
    Promise.all: 等待所有 Promise 成功后返回所有结果，如果有一个失败则返回该失败。
Promise.race: 返回第一个完成的 Promise 的结果，不管是成功还是失败。
Promise.any: 返回第一个成功的 Promise 的结果，只有所有 Promise 都失败时才会返回失败。
Promise.allSettled: 等待所有 Promise 完成后返回每个 Promise 的结果，无论成功还是失败。

- JS 数据类型和区别
    - 原始数据类型（Primitive Types）
    Number String  Boolean  Undefined  Null Symbol  BigInt
    - 对象数据类型
        Object  Array Function Date  RegExp   Map   Set  WeakMap  WeakSet 
    
    原始数据类型 是不可变的，直接存储值，按值传递。
    对象数据类型 是可变的，存储复杂的数据结构，按引用传递。

    不可变: 原始值本身不可更改（例如字符串或数字），改变原始值会生成一个新的值。
    按值传递: 复制原始数据时，实际上是复制了值本身。

    对于原始数据类型，任何修改都会导致新内存空间的分配，旧的值保持不变。这也意味着原始数据类型是不可变的，改变原始值本质上是在创建新的值。


    // Vue 3 源码片段

export const provideKey = Symbol('provideKey');

// 在某个组件中使用 `provide` 提供数据
export default {
  setup() {
    provide(provideKey, 'Some value');
  }
}

// 在子组件中使用 `inject` 注入数据
export default {
  setup() {
    const injectedValue = inject(provideKey);
    console.log(injectedValue); // 输出: 'Some value'
  }
}

- 怎么判断用户登陆了 给出cookie token 不同方案
    - cookie
    - token  localStorage axios authorization
    - meta: needLogin : false    路由守卫

- 弹性布局
    - 父容器，子容器分别有什么操作
        父 要使一个容器成为 Flex 容器，需要为父容器设置 display: flex 或 display: inline-flex。Flex 容器中的子元素（Flex 项目）将自动成为 Flex 项目，遵循 Flexbox 布局规则。
        flex-direction row row-reverse column  column-reverse
        justify-content flex-start|center|space-between|space-around|flex-end
        单行  align-items stretch |flex-start|flex-end|center|baseline
        多行 align-content  flex-start: 各行从交叉轴的起点开始排列。
flex-end: 各行从交叉轴的终点开始排列。
center: 各行在交叉轴上居中排列。
space-between: 各行均匀分布，第一行和最后一行对齐交叉轴两端。
space-around: 各行均匀分布，每行两侧间隔相等。
stretch: 各行在交叉轴上拉伸填满。
        flex-wrap 定义子容器是否换行。 nowrap|wrap|wrap-reverse

        子容器的操作  order   flex-grow  flex-shrink flex-basis flex
        align-self
