import { useState } from 'react'


function App() {
  const userInput = '1111<script>console.log("111")</script>';
    console.log('/////')
  return (
    <div 
      // 显式插入HTML，会绕过转义（有XSS风险）
      dangerouslySetInnerHTML={{ __html: userInput }}
    />
  )
}

export default App
