import { getTodos } from '../api/todos';
import { useEffect, useState } from 'react';

export default function Todos() {
  useEffect(() => {
    getTodos().then(todos => {
      console.log(todos);
    });
  }, []);
  return (
    <div>
      <h1>待办事项</h1>
    </div>
  );
}