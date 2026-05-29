# MVVM 设计模式

- 先看前端痛点
  1.html
  问题在哪？
  - 数据和 DOM 强耦合
  - 改一个逻辑要改一堆 DOM
  - 页面一复杂，人直接疯掉
  数据驱动不了视图，只能人肉驱动 DOM

## MVVM

MVVM 拆开看，其实就三层
Model.     数据（state）
View.      页面（DOM / 模板）
ViewModel. 数据和视图的“中间人”

View 不直接操作 Model，所有东西都通过 ViewModel。
有时候婚姻介绍也是挺好的。

- Model（数据）
  {
    count: 0
  }
  就是普通 JS 数据
  不关心页面长啥样

- View（视图）
  <div>
    <span>{{ count }}</span>
    <button @click="add">+1</button>
  </div>

  不写 JS 逻辑
  只关心「我展示什么」

- ViewModel（核心）
  它干三件事：
  - 把 Model 变成“可响应”的
  - 把数据丢给 View 用
  - 监听 View 的操作，反过来改 Model

  2.html

- 最小 MVVM Demo
  3.html
  目标效果
  数据变了 → 页面自动更新
  不操作 DOM

- 框架里的mvvm 
  - vue 标准的mvvm
  - React 更偏向 MVVM + 函数式 UI，不是严格意义的 MVVM。
  ```
  function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}

  ```
  state → Model
  JSX → View
  组件本身 → ViewModel

- MVVM 的核心是什么？
  数据驱动视图，双向（或单向）数据绑定

- MVVM 和 MVC 区别？
  MVC	MVVM
操作 DOM 多	几乎不操作 DOM
Controller 很重	ViewModel 解耦
不适合复杂前端	天然适合复杂 UI

- 响应式原理？
  Vue2：Object.defineProperty
  Vue3：Proxy

- 为什么 MVVM 能提高开发效率？
  - 少操作 DOM
  - 逻辑和视图解耦
  - 更好维护、更好测试

MVVM 本质不是新概念，而是一句话：
“别再手动改 DOM 了，让数据说了算。”

1.png

这张图展示了MVVM工作流程：Model（数据）变化通知ViewModel，ViewModel更新View；用户操作View时，通过事件监听和数据修改，触发ViewModel更新Model。双向数据绑定实现View与Model的自动同步，实现数据与视图的解耦与高效联动。