// components/TodoItem.tsx
import React from 'react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/index.ts';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodo();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });
  };

  return (
    <li style={{ marginBottom: '0.5rem' }}>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          marginRight: '0.5rem',
        }}
        onClick={handleToggle}
      >
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;