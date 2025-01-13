import { useState } from 'react';
import TodoInput from './components/TodoInput/';
import TodoList from './components/TodoList/';
import TodoFooter from './components/TodoFooter';

function App() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="home">
      <h1>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoFooter remaining={todos.filter((t) => !t.completed).length} total={todos.length} />
    </main>
  )
}

export default App
