// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This should include the Tailwind CSS import
import TodoList from './TodoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <TodoList />
  // </React.StrictMode>
);