// Counter.tsx
import useCounterStore from './store';

const App = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement} style={{ margin: '0 8px' }}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;