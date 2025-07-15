// App.jsx

import React, { createContext, useState } from 'react';

// 创建多个 Context
const ThemeContext = createContext();
const TodosContext = createContext();
const UserContext = createContext();

function App() {
  // 状态1：主题
  const [theme, setTheme] = useState('light');

  // 状态2：待办事项
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
  ]);

  // 状态3：用户信息
  const [user, setUser] = useState({ name: 'Alice' });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Header />
            <Main />
            <Footer />
          </Layout>
        </UserContext.Provider>
      </TodosContext.Provider>
    </UserContext.Provider>
  );
}