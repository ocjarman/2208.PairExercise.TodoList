import { createSlice } from "@reduxjs/toolkit";

// Set the initial state
const initialState = {
  todos: []
};

// Set actions and settings specific to this state
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return {
          ...todo,
          ...action.payload
        }
      })
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id
      })
    }
  }
});

// Export everything needed to interact with it
export const { setTodos, updateTodo, createTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;