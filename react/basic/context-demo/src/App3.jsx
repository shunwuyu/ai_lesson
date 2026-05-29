import { ThemeContext } from "./ThemeContext";
import Page from './components/Page';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

export default App;