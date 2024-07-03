import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: this.props.todo.text,
    };
  }

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleEditSave = () => {
    this.props.editTodo(this.props.index, this.state.editText);
    this.setState({ isEditing: false });
  };

  render() {
    const { todo, toggleTodo, deleteTodo, index } = this.props;
    const { isEditing, editText } = this.state;

    return (
      <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={this.handleEditChange}
              className="todo-item__edit-input"
            />
            <button onClick={this.handleEditSave} className="todo-item__save-btn">Save</button>
          </>
        ) : (
          <>
            <span onClick={() => toggleTodo(index)} className="todo-item__text">
              {todo.text}
            </span>
            <button onClick={() => this.setState({ isEditing: true })} className="todo-item__edit-btn">Edit</button>
            <button onClick={() => deleteTodo(index)} className="todo-item__delete-btn">Delete</button>
          </>
        )}
      </li>
    );
  }
}

export default TodoItem;
