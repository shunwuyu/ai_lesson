import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TodoStore from './store/todoStore.ts';

const App: React.FC = observer(() => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4">Todo List</h1>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && TodoStore.addTodo(inputValue)  && setInputValue('')}
          className="w-full p-2 mb-4 border rounded"
        />
        <ul>
          {TodoStore.todos.map(todo => (
            <li key={todo.id} className={`flex items-center justify-between p-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              <span onClick={() => TodoStore.toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => TodoStore.removeTodo(todo.id)} className="text-red-500">X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default App;