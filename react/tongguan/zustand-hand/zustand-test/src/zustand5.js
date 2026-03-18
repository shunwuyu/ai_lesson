// 支持函数更新
// 支持 state 合并
export function createStore() {
  let state = { count: 0 }
  // Set 集合，不会重复 多次调用 subscribe 不会重复订阅
  // listeners = 所有订阅者
  const listeners = new Set()
  // 获取状态
  const getState = () => state
  // 修改状态
  const setState = (partial) => {

    const nextState =
      typeof partial === "function"
        ? partial(state)
        : partial
  
    state =
      typeof nextState !== "object"
        ? nextState
        : Object.assign({}, state, nextState)
  
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