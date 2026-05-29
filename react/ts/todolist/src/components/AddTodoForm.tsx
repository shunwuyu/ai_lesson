// components/AddTodoForm.tsx
import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const AddTodoForm: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const { dispatch } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: { text: input } });
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem' }}>
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;