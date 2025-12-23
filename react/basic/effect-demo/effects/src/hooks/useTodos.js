// hooks/useTodos.js
import { useState, useEffect } from 'react'

const TODO_KEY = 'react-todos-v1'

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(TODO_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    if (text.trim() === '') return
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.length - activeCount

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount
  }
}