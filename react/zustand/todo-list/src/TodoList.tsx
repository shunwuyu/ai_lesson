// src/TodoList.tsx
import React, { useState } from 'react';
import useTodoStore from './store';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow border p-2 rounded-l"
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2 rounded-r">Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
            </label>
            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;