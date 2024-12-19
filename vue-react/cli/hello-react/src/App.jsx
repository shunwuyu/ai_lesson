// App.js

import React from 'react';
import Counter from './components/Counter'; // 根据你的项目结构调整路径
import Repos from './components/Repos';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Counter App</h1>
        <Counter />
        <Repos />
      </header>
    </div>
  );
}

export default App;