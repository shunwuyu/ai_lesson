// TodoList.jsx
import React from 'react';
import { useTodoContext } from '../TodoContext';

export default function TodoList() {
  const { todos, toggleTodo, removeTodo } = useTodoContext();

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
