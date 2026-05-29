## 是什么？
const element = <h1>Hello, world!</h1>;
1. JSX 
    JSX 是一种 JavaScript 语法扩展，允许在 JavaScript 代码中嵌入 HTML 结构，常用于 React 组件的定义，使得 UI 结构更直观易读。

    等同于 const element = React.createElement('h1', null, 'Hello, world!');
    1.js 运行错误 
2. 优势
    - 直观的结构：JSX 允许开发者在 JavaScript 代码中直接书写 HTML 结构，使得组件的结构一目了然，易于理解。
    - 支持 JS 表达式
    - 更好的开发体验
        组件化：通过定义组件，可以将 UI 逻辑和样式封装在一个函数里，便于重用和维护。
        动态内容：可以轻松地将 JavaScript 表达式嵌入到 JSX 中，例如 {user.name} 和 {user.bio}，使得动态内容的渲染变得简单。
        事件处理：在 JSX 中，可以直接在元素上添加事件处理器，例如 onClick，使得交互逻辑更清晰。


3. 顺序
- 表达式嵌入
- 条件渲染
- 列表渲染
- JSX 中必须有单一根节点
- 使用 Fragment 代替额外的 DOM

4. 事件

5. babel 转译
    npm install --save-dev @babel/core @babel/preset-react @babel/cli
    ./node_modules/.bin/babel 1.jsx -o 2.jsx


- 什么是 JSX？它最终会被编译成什么？JSX 中为什么只能有一个根节点？
    JSX是JavaScript的语法扩展，用于编写React组件，最终编译为JavaScript函数调用（React.createElement）。单根节点简化了组件结构和渲染逻辑。
    有利于性能优化

- 在 JSX 中，class、for 等 HTML 属性为什么不能直接使用？如何处理这些冲突？
    JSX中HTML属性如class和for因与JavaScript关键字冲突，需使用className和htmlFor替代。这是为了兼容JavaScript语法，避免解析错误。

- 你如何在 JSX 中动态渲染列表？为什么渲染列表时要加 key？key 的作用和注意事项有哪些？
    在JSX中动态渲染列表，可通过数组的map方法为每个元素创建组件，并赋予唯一key。key帮助React识别哪些项更改、添加或删除，从而高效更新DOM。注意事项：确保key在兄弟节点间唯一且稳定，避免使用索引作为key，以防数据顺序变化导致不必要的重渲染或状态问题。

