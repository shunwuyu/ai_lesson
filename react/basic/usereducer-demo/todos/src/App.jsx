// App.jsx
import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoContext } from './TodoContext';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default function App() {
  const todosHook = useTodos([]);

  return (
    <TodoContext.Provider value={todosHook}>
      <h1 className="text-xl">Todo App</h1>
      <AddTodo />
      <TodoList />
    </TodoContext.Provider>
  );
}
