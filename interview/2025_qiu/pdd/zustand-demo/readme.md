# zustand 实现原理

Zustand 的实现其实很简单，本质是一个可订阅的全局 store。
它用 createStore 保存状态和订阅者，setState 更新时调用所有 listener 通知组件刷新。
