// App.tsx
import React, { useState } from 'react';
import useCounterStore from './store/counterStore';
import useTodoStore, { Todo } from './store/todoStore';

const App = () => {
  // Counter 状态
  const { count, increment, decrement, reset } = useCounterStore();

  // Todo 状态
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      {/* Counter */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Count: {count}</h2>
        <button onClick={increment}>+1</button>
        <button onClick={decrement} style={{ margin: '0 8px' }}>-1</button>
        <button onClick={reset}>Reset</button>
      </section>

      {/* Todos */}
      <section>
        <h2>Todos ({todos.length})</h2>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    marginLeft: '8px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : 'inherit',
                  }}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => removeTodo(todo.id)}
                style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;