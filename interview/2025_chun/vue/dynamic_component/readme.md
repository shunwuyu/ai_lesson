vue动态组件是一种允许在同一位置根据条件切换不同组件的机制，使用<component :is="componentName">语法实现。

- 可以根据变量动态切换组件
- 配合<keep-alive>可以保持组件状态
