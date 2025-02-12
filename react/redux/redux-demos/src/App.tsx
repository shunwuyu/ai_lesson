// src/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './store/counterSlice';
import { RootState } from './store';
import TodoList from './TodoList';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Counter</h1>
      <div className="flex space-x-2">
        <button onClick={() => dispatch(decrement())} className="bg-red-500 text-white p-2 rounded">-</button>
        <span className="text-xl">{count}</span>
        <button onClick={() => dispatch(increment())} className="bg-green-500 text-white p-2 rounded">+</button>
        <button onClick={() => dispatch(incrementByAmount(5))} className="bg-blue-500 text-white p-2 rounded">+5</button>
      </div>
      <TodoList />
    </div>
  );
}

export default App;