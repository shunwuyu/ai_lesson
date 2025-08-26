import { useState } from 'react'
import './App.css'

function Demo() {
  const [color, setColor] = useState('red');
  
  // ❌ 危险！Hook 写在 if 里
  if (color === 'red') {
    var [count, setCount] = useState(0); // 问题根源
  }

  const [size, setSize] = useState('small');

  return (
    <div style={{ padding: 20 }}>
      <h3>颜色: {color}</h3>
      <h3>大小: {size}</h3>
      {/* ❌ 这里会报错：setCount is not defined */}
      {color === 'red' && (
        <div>
          <p>计数: ???</p>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      )}
      <button onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>
        切换颜色
      </button>
      <button onClick={() => setSize(size === 'small' ? 'large' : 'small')}>
        切换大小
      </button>
    </div>
  );
}

function App() {
  
  return (
    <>
      <Demo />     
    </>
  )
}

export default App
