// App.jsx
import { ThemeProvider } from './ThemeContext'
import Page from './Page'
import './theme.css'

function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}

export default App
