export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <li className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
        <button onClick={onDelete}>Delete</button>
      </li>
    )
  }
  