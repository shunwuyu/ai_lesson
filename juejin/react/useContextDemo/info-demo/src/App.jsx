import {
  createContext
} from 'react';
import Page from './components/Page'

export const UserContext = createContext(null);
function App() {
  const user = { name: 'Andrew' }

  return (
    <UserContext.Provider value={user}>
      <Page />
    </UserContext.Provider>
  )
}

export default App
