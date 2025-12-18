export default function TodoStats({ total, active, completed, onClearCompleted }) {
  return (
    <div className="todo-stats">
      <p>Total: {total} | Active: {active} | Completed: {completed}</p>
      {completed > 0 && (
        <button onClick={onClearCompleted} className="clear-btn">
          Clear Completed
        </button>
      )}
    </div>
  )
}