// src/components/TodoInput/index.jsx
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './styles.css';

const TodoInput = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="新增待办事项"
        style={{ width: 'calc(100% - 80px)' }}
      />
      <Button type="primary" htmlType="submit">添加</Button>
    </form>
  );
};

export default TodoInput;