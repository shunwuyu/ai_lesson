// components/TodoInput.tsx
import { useState } from 'react'

interface Props {
  onAdd: (title: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>添加</button>
    </div>
  )
}
