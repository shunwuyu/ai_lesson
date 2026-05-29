// src/components/TodoItem/index.jsx
import React from 'react';
import { Checkbox, Button } from 'antd';
import './styles.css';

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className="todo-item">
    <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)}>
      {todo.text}
    </Checkbox>
    <Button type="link" onClick={() => onDelete(todo.id)}>删除</Button>
  </li>
);

export default TodoItem;