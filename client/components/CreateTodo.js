import React, { Component } from 'react';
import { createTodo } from '../store/effects/effects';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      assignee: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createTodo({ ...this.state });
  }

  render() {
    const { assignee, taskName } = this.state;
    const { handleSubmit } = this;

    return (
      <form id='todo-form' onSubmit={handleSubmit}>
        <label htmlFor='taskName'>Task Name:</label>
        <input name='taskName' value={taskName} />

        <label htmlFor='assignee'>Assign To:</label>
        <input name='assignee' value={assignee} />

        <button type='submit'>Submit</button>
        <Link to='/'>Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history))
});

export default connect(null, mapDispatchToProps)(CreateTodo);
