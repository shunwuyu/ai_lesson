# Vue3的8种和Vue2的12种组件通信

- 1 用 props 传数据给子组件有两种方法
  - 选项式
  - 组合式

- 2 $emit
  调用父组件的自定义事件 子-》父通信

- 3 父组件获取子组件的属性或者调用子组件的方法
  expose / ref

- 4 attrs
  attrs：包含父作用域里除 class 和 style 除外的非 props 属性集合

- 5. v-model 双向绑定

- 6. provide / inject
  provide：可以让我们指定想要提供给后代组件的数据或
  inject：在任何后代组件中接收想要添加在这个组件上的数据，不管组件嵌套多深都可以直接拿来用