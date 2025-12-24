- 抛出问题
  UserInfo 要用到user, 中间组件 并不关心 user， 只是“搬运 props”，
  层级一多，代码难维护。

## useContext
useContext 用来解决“跨组件层级共享数据，避免 props 层层传递”的问题
把数据“挂在组件树上”，需要的组件自己去“拿”

- Context：数据容器
- Provider：数据提供者
- useContext：数据消费者

它的好处：
- 不需要 props
- 不管中间隔多少层
- 想用就用

useContext 让“数据流动”从显式传递，变成按需订阅

## 主题切换demo

## useRef 
- 我要拿 DOM，怎么办? useRef
