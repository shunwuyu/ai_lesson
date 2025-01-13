import { useState } from 'react'
import MyList from './components/MyList.jsx'
function App() {
  const [showList, setShowList] = useState(true)
  const toggle = () => {
    console.log('////')
    setShowList(!showList)
  }
  return (
    <>
      { showList && <MyList /> }
      <button onClick={toggle}>切换</button>
    </>
  )
}

export default App
