import { useState } from 'react'


function App() {
  const userInput = '<script>alert("恶意攻击")</script>';

  return (
    <>
    {/* JSX 自动转义防 XSS */}
      <div>{userInput}</div>
    </>
  )
}

export default App
