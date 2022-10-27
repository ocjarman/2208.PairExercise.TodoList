import { configureStore } from "@reduxjs/toolkit";
import selectReducer from "./selectSlice";
import todosReducer from "./todosSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    select: selectReducer
  }
});