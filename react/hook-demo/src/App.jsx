import { useState, createContext } from 'react'
import AppHook from './hook/app-hook'
import AppHeader from './components/app-header'

export const AppContext = createContext({
    theme:'light'
})

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <AppContext.Provider value={{theme, setTheme}}>
        <div className="container">
          <AppHeader/>
          <AppHook />  
        </div>
    </AppContext.Provider>
  )
}

export default App
