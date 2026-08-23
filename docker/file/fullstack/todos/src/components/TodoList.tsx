import React, { useEffect } from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoList: React.FC = () => {
  const { todos, fetchTodos, addTodo } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = () => {
    const title = prompt('Enter todo title:');
    if (title) addTodo(title);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;