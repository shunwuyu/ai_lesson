// components/TodoList.tsx
import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem.tsx';
import { Todo } from '../types/index.ts';

const TodoList: React.FC = () => {
  const { state } = useTodo();

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {state.todos.map((todo:Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;