import { useStore } from '../store';

// components/Counter.tsx
export function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  console.log('Counter 渲染了');

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}