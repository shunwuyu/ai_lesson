import { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(inputValue)
    setInputValue('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  )
}