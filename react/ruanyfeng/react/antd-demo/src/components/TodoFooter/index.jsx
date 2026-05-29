// src/components/TodoFooter/index.jsx
import React from 'react';
import { Typography } from 'antd';
import './styles.css';

const { Text } = Typography;

const TodoFooter = ({ remaining, total }) => (
  <footer className="todo-footer">
    <Text>{`${remaining} of ${total} items left`}</Text>
  </footer>
);

export default TodoFooter;