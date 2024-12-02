import { createContext, useState, Dispatch, SetStateAction } from 'react'
import AppHook from './app-hook'
import AppHeader from './components/app-header'
type AppContextValue = {
    theme: string,
    setTheme?: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppContextValue>({
    theme: 'light'
})

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <AppContext.Provider value={{theme, setTheme}}>
        <AppHeader name="旅梦开发团"/>
        <AppHook />      
    </AppContext.Provider>
  )
}

export default App
