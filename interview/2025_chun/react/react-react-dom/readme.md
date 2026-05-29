# react 和react-dom 是什么关系？

- React  是一个用于构建用户界面的JavaScript库，专注于提供高效且声明式的解决方案来创建组件化的UI层。它引入了虚拟DOM的概念，使得开发者可以更关注于应用的状态和逻辑，而不是直接操作DOM。
    UI = f(state)
    JSX
    React虚拟DOM是一种内存中的轻量级DOM副本，通过对比变化（Diff算法）高效更新实际DOM，减少直接操作DOM的性能损耗。


- ReactDOM 则是 React 的一个配套库，专门负责将React组件渲染到真实DOM中。它包含了具体的实现细节，通过使用React中定义的虚拟DOM结构，ReactDOM能够在浏览器环境中有效地更新真实的DOM节点，从而反映React应用的状态变化。简单来说，ReactDOM提供了必要的工具让React组件能够呈现在网页上，并与用户的交互产生反应。

在早期版本的React中，这些功能都包含在一个单一的库中。
随着React的发展，为了更清晰地分离关注点以及提高模块化程度，React和ReactDOM被分成了两个独立的包。

这种分离允许React本身可以在非浏览器环境（比如移动应用开发中的React Native）中同样得到有效利用，而无需携带针对浏览器的特定代码。

可以给面试官的印象
- 展示了对React和ReactDOM基本概念的理解
- 对其历史背景和发展趋势的认识

