import { 
  useState,
  useEffect
} from 'react'
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

import './App.css'

const STORAGE_KEY = 'todos'

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function App() {
  // const [todos, setTodos] = useState([])
  const [todos, setTodos] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(todos)
  }, [todos])

  const handleAddTodo = (text) => {
    setTodos([
      ...todos, { 
      id: Date.now(), 
      text, 
      is_completed: false 
    }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <TodoHeader />
      <TodoInput onAdd={handleAddTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
