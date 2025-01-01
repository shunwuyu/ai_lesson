import { useState } from 'react'

function App() {
  const [num, setNum] = useState(1);

  return (
    <div onClick={() => setNum(num + 1)}>{num}</div>
  )
}

export default App
