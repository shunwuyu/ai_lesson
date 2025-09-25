// src/App.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from './store/todoSlice';

const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Redux TodoList</h1>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginTop: 10 }}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ marginLeft: 10 }}>
              Delete
            </button>
            <input
              placeholder="Edit text"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              style={{ marginLeft: 10 }}
            />
            <button
              onClick={() => {
                if (editText.trim()) {
                  dispatch(updateTodo({ id: todo.id, text: editText }));
                  setEditText('');
                }
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
