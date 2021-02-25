import axios from 'axios';

import {
  _createTodo,
  setTodos,
} from '../actions/actions';

// THUNK CREATORS

export const createTodo = (todo, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/todos', todo);
    dispatch(_createTodo(created));
    history.push('/');
  };
};

export const fetchTodos = () => {
  return async (dispatch) => {
    const { data: todos } = await axios.get('/api/todos');
    dispatch(setTodos(todos));
  };
};
