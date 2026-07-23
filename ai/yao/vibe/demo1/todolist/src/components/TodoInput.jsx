import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'

export default function TodoInput() {
  const [text, setText] = useState('')
  const { dispatch } = useTodoContext()

  const handleSubmit = () => {
    if (!text.trim()) return
    dispatch({ type: 'ADD_TODO', payload: { text } })
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="添加新任务..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        添加
      </button>
    </div>
  )
}
