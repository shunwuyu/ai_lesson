import { useState, useEffect, memo } from 'react'
import './App.css'
import User from './User'
// Memo
function Demo() {
  useEffect(() => {
    console.log('Demo component mounted')
  }, [])
  useEffect(() => {
    return () => {
      console.log('-------------')
    }
  }, [])
  return <div>Demo</div>
}

// const MemoDemo = memo(Demo)

function App() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    console.log('App component updated')
  }, [show])
  return (
    <>
     <button onClick={() => setShow((prev) => !prev)}>
      {show ? 'Hide' : 'Show'}
     </button>
     {show && <Demo />}
     {/* {show && <MemoDemo />} */}
     {show && <User />}
    </>
  )
}

export default App
