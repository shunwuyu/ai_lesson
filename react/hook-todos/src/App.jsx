// App.jsx
import React from 'react';
import { useMouse } from './hooks/useMouse';

function App() {
  const { x, y } = useMouse();

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <h1>当前鼠标位置：</h1>
      <p>X: {x}</p>
      <p>Y: {y}</p>
    </div>
  );
}

export default App;