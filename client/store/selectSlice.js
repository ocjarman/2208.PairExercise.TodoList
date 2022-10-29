import { createSlice } from "@reduxjs/toolkit";

// Set the initial state
const initialState = {
  selectedTodo: {},
};

// Set actions and settings specific to this state
export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      //changed 'todo' to 'selectedTodo'
      state.selectedTodo = action.payload;
    },
  },
});

// Export everything needed to interact with it
export const { setSelectedTodo } = selectSlice.actions;

export default selectSlice.reducer;
