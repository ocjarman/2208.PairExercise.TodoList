const SET_TODO = 'SET_TODO';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TODO:
      return action.todo;
    default:
      return state;
  }
};
