import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import './styles/app.styl'

const TODO_KEY = 'react-todos-v1'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(TODO_KEY)
    return saved ? JSON.parse(saved) : []
  })

  const addTodo = (text) => {
    if (text.trim() === '') return
    const newTodos = [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]
    setTodos(newTodos)
    // localStorage.setItem(TODO_KEY, JSON.stringify(newTodos))
  }

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
    // localStorage.setItem(TODO_KEY, JSON.stringify(newTodos))
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    // localStorage.setItem(TODO_KEY, JSON.stringify(newTodos))
  }

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
    // localStorage.setItem(TODO_KEY, JSON.stringify(newTodos))
  }

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.length - activeCount

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoStats
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}


// ========== useEffect 方案A：依赖 todos，todos 变化时自动同步 localStorage ==========
// useEffect(() => {
//   localStorage.setItem(TODO_KEY, JSON.stringify(todos))
// }, [todos])

// ========== useEffect 方案B：不依赖 todos，仅在组件挂载时执行一次 ==========
// useEffect(() => {
//   localStorage.setItem(TODO_KEY, JSON.stringify(todos))
// }, [])
// 注意：todos 更新后 localStorage 不会同步，页面刷新后数据会丢失
