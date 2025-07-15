import {
   useState,
   useReducer
} from 'react'
import './App.css'


const initialState = { count: 0 };
// 纯函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  // useReducer 更适合多个子值或复杂逻辑的状态管理
  // state：当前状态
  // dispatch(action)：发送一个“动作”对象
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}

export default App
