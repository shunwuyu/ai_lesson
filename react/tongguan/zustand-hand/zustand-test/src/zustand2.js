// 最简单的 store
// 保存状态
// 修改状态
// React 不知道 state 变了。问题
// 加入订阅机制
export function createStore() {
    let state = { count: 0 }
  
    const getState = () => state
  
    const setState = (newState) => {
      state = newState
    }
  
    return {
      getState,
      setState
    }
}

