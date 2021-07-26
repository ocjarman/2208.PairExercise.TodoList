import React, { Component } from 'react';
import { createTodo } from '../store/todos';
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

/*
NOTE: The second argument for both mapStateToProps and mapDispatchToProps is the _actual props_ passed down from the parent.

This is usually denoted as `ownProps`, and since CreateTodo is rendered by our Router component in `App.js`, `CreateTodo` receives all of the history, match, and location props.

We can therefore destructure the `history` prop from the 2nd argument of props.

Another way to have written this would be:

const mapDispatchToProps = (dispatch, ownProps) => ({
  createTodo: (todo) => dispatch(createTodo(todo, ownProps.history))
});

*/
const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history))
});

export default connect(null, mapDispatchToProps)(CreateTodo);
