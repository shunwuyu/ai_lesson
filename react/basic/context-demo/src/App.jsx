import {
  useState
} from 'react';
import { ThemeContext } from "./ThemeContext";
import Page from './components/Page';

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
      <button onClick={() => setTheme("dark")}>切换主题</button>
    </ThemeContext.Provider>
  );
}

export default App;