// App.tsx
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList.tsx';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Todo List</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;