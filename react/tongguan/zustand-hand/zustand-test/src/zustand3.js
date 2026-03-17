// 加入订阅机制
// 发布订阅模式
// state变化
// ↓
// 通知所有组件
// ↓
// 组件重新渲染
// 问题 支持函数更新 state 
// 真实开发中我们常这样写：
// set(state => newState) react 基于最新状态更新
export function createStore() {
    let state = { count: 0 }
    // Set 集合，不会重复 多次调用 subscribe 不会重复订阅
    // listeners = 所有订阅者
    const listeners = new Set()
    // 获取状态
    const getState = () => state
    // 修改状态
    const setState = (newState) => {
      state = newState
      listeners.forEach(listener => listener())
    }
    // 订阅
    const subscribe = (listener) => {
      listeners.add(listener)
      // 取消订阅 
      return () => listeners.delete(listener)
    }
  
    return {
      getState,
      setState,
      subscribe
    }
}