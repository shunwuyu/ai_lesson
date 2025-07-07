import { useState, useEffect } from 'react'

const STORAGE_KEY = 'todos'

function loadFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export default function useTodos() {
  const [todos, setTodos] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(todos)
  }, [todos])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}