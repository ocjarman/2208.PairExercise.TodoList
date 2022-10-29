import React, { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Todos from "./Todos";
import CreateTodo from "./CreateTodo";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/todosSlice";
import axios from "axios";
import EditToDo from "./EditToDo";

const App = () => {
  const todos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();

  //setting todos in main app via database
  const fetchTodos = async () => {
    const { data: todos } = await axios.get("/api/todos");
    dispatch(setTodos(todos));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="main">
      <h1>
        <Link to="/">Todos ({todos.length})</Link>
      </h1>
      <Link to="/todos/create">Create A New Todo</Link>
      <Routes>
        <Route path="/todos/create" element={<CreateTodo />} />
        <Route path="/todos/:id" element={<EditToDo />} />
        <Route path="/" element={<Todos />} />
      </Routes>
    </div>
  );
};

export default App;
