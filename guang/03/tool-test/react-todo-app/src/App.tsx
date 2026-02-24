import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  edited?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() === '') return;
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (editingId) {
        saveEdit();
      } else {
        addTodo();
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>✨ Todo List</h1>
      </header>

      <main className="main">
        <div className="input-section">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            ➕ Add
          </button>
        </div>

        <div className="filter-section">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')} 
            className={filter === 'active' ? 'active' : ''}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">No todos yet. Add one above! 🌟</li>
          ) : (
            filteredTodos.map((todo) => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                {editingId === todo.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="edit-input"
                    />
                    <div className="edit-actions">
                      <button onClick={saveEdit} className="save-btn">✓</button>
                      <button onClick={cancelEdit} className="cancel-btn">✕</button>
                    </div>
                  </div>
                ) : (
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <span 
                      className="todo-text" 
                      onDoubleClick={() => startEditing(todo)}
                    >
                      {todo.text}
                    </span>
                    <div className="todo-actions">
                      <button 
                        onClick={() => startEditing(todo)} 
                        className="edit-btn"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)} 
                        className="delete-btn"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>

        <div className="stats">
          <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
          <span>{completedCount} completed</span>
        </div>
      </main>

      <footer className="footer">
        <p>✨ Built with React & Vite | Todos saved automatically ✨</p>
      </footer>
    </div>
  );
}

export default App;
