import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim()) {
      this.props.addTodo(this.state.inputText);
      this.setState({ inputText: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleChange}
          className="todo-form__input"
          placeholder="Add a new todo"
        />
        <button type="submit" className="todo-form__button">Add</button>
      </form>
    );
  }
}

export default TodoForm;
