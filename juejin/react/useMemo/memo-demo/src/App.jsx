import React, { useCallback } from 'react';
// function Child({ onClick }) {
//   console.log('Child render')
//   return (
//     <button
//       className="px-3 py-1 bg-blue-500 text-white"
//       onClick={onClick}
//     >
//       点我
//     </button>
//   )
// }

const Child = React.memo(function Child({ onClick }) {
  console.log('Child render')
  return (
    <button
      className="px-3 py-1 bg-blue-500 text-white"
      onClick={onClick}
    >
      点我
    </button>
  )
})

function App() {
  const [count, setCount] = React.useState(0)

  // const handleClick = () => {
  //   console.log('click')
  // }
  const handleClick = useCallback(() => {
    console.log('click')
  }, [])

  return (
    <div className="p-4 space-y-4">
      <Child onClick={handleClick} />

      <button
        className="px-3 py-1 bg-green-500 text-white"
        onClick={() => setCount(count + 1)}
      >
        count +1
        {count}
      </button>
    </div>
  )
}

export default App
