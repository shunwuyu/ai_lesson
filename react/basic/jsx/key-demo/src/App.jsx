import { useState, useEffect } from 'react'
import './App.css'

// function App() {
//   const [todos, setTodos] = useState([
//     {
//       id: 1,
//       title: '标题一'
//     },
//     {
//       id: 2,
//       title: '标题二'
//     },
//     {
//       id: 3,
//       title: '标题三'
//     },
//   ])
//   // 为什么没有全部重新渲染？
//   // 它默认使用数组索引作为 key
//   // 只有第一个 <li> 的内容发生变化，而其他 <li> 未被重新创建。
//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setTodos(
//   //       prev => prev.map(todo => {
//   //         if (todo.id === 1) return {
//   //           ...todo,
//   //           title: '标题一改'
//   //         }
//   //         return todo
//   //       })
//   //     )
//   //   }, 6000)
//   // }, [])
//   // 全部更新， 按索引比， 都变了
//   useEffect(() => {
//     setTimeout(() => {
//       setTodos([
//          {
//         id: 1,
//         title: '标题四'
//         },
//         {
//         id: 1,
//         title: '标题一'
//         },
//         {
//           id: 2,
//           title: '标题二'
//         },
//         {
//           id: 3,
//           title: '标题三'
//         }
//       ])
//     }, 6000)
//   }, [])

//   return (
//     <>
//       <ul>
//         {todos.map(todo => (
//           <li >{todo.title}</li>
//         ))}
//       </ul>
//     </>
//   )
// }

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '标题一'
    },
    {
      id: 2,
      title: '标题二'
    },
    {
      id: 3,
      title: '标题三'
    },
  ])
    // 第一个新增，原来的第一个移动了位置
    useEffect(() => {
    setTimeout(() => {
      setTodos([
         {
        id: 1,
        title: '标题四'
        },
        {
        id: 1,
        title: '标题一'
        },
        {
          id: 2,
          title: '标题二'
        },
        {
          id: 3,
          title: '标题三'
        }
      ])
    }, 6000)
  }, [])



  return (
    <>
      <ul>
         {todos.map(todo => (
           <li key={todo.id}>{todo.title}</li>
         ))}
       </ul>
    </>
  )
}

export default App
