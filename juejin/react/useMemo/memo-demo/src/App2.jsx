import React from 'react'
// bad
// function App() {
//   const [keyword, setKeyword] = React.useState('') // 有关
//   const [count, setCount] = React.useState(0) // 无关

//   const list = ['apple', 'banana', 'orange', 'pear']

//   const filteredList = list.filter(item => {
//     console.log('filter 执行')
//     return item.includes(keyword)
//   })

//   return (
//     <div className="p-4 space-y-4">
//       <input
//         className="border p-2"
//         value={keyword}
//         onChange={e => setKeyword(e.target.value)}
//       />

//       <button
//         className="px-3 py-1 bg-blue-500 text-white"
//         onClick={() => setCount(count + 1)}
//       >
//         count +1
//       </button>

//       <ul>
//         {filteredList.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }
// good example
// function App() {
//   const [keyword, setKeyword] = React.useState('')
//   const [count, setCount] = React.useState(0)

//   const list = ['apple', 'banana', 'orange', 'pear']

//   const filteredList = React.useMemo(() => {
//     console.log('filter 执行')
//     return list.filter(item => item.includes(keyword))
//   }, [keyword])

//   return (
//     <div className="p-4 space-y-4">
//       <input
//         className="border p-2"
//         value={keyword}
//         onChange={e => setKeyword(e.target.value)}
//       />

//       <button
//         className="px-3 py-1 bg-blue-500 text-white"
//         onClick={() => setCount(count + 1)}
//       >
//         count +1 {count}
//       </button>

//       <ul>
//         {filteredList.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

function slowSum(n) {
  console.log('计算中...')
  let sum = 0
  for (let i = 0; i < n * 10000000; i++) {
    sum += i
  }
  return sum
}
// 昂贵的计算
function App() {
  const [num, setNum] = React.useState(10)
  const [theme, setTheme] = React.useState(false)

  const result = React.useMemo(() => {
    return slowSum(num)
  }, [num])

  return (
    <div className={`p-6 ${theme ? 'bg-gray-800 text-white' : ''}`}>
      <p>结果：{result}</p>

      <button
        className="mr-2 px-3 py-1 bg-green-500 text-white"
        onClick={() => setNum(num + 1)}
      >
        改数字
      </button>

      <button
        className="px-3 py-1 bg-blue-500 text-white"
        onClick={() => setTheme(!theme)}
      >
        切主题
      </button>
    </div>
  )
}


export default App