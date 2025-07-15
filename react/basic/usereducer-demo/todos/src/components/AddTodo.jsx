// AddTodo.jsx
import React, { useState } from 'react';
import { useTodoContext } from '../TodoContext';

export default function AddTodo() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
