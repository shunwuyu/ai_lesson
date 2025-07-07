import { 
    useState,
    useEffect
  } from 'react'
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import useTodos from './hooks/useTodos'
import './App.css'
  
  function App() {
    // const [todos, setTodos] = useState([])
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  
    return (
      <div className="app">
        <TodoHeader />
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    )
  }
  
  export default App
  