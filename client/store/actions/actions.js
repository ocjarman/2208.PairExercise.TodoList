import types from '../constants/constants'

// ACTION CREATORS

export const _createTodo = (todo) => {
  return {
    type: types.CREATE_TODO,
    todo
  };
};

export const setTodos = (todos) => {
  return {
    type: types.SET_TODOS,
    todos
  };
};
