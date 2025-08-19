import { useState, useEffect } from 'react'
import './App.css'



function App() {
  let controller = new AbortController();
  useEffect(() => {
    
    fetch('/api/banners',  
    {
      signal: controller.signal
      // signal: AbortSignal.timeout(1000)
    })
    .then(data => data.json())
    .then(data => {
      console.log(data);
    })
  }, [])

  const stop = () => {
    controller.abort(); // 取消请求
  }
  return (
    <>
      <button onClick={stop}>暂停</button>
    </>
  )
}

export default App
