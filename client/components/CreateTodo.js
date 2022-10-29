import React, { useState } from "react";
import { createTodo } from "../store/todosSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const dispatch = useDispatch("");
  const navigate = useNavigate();

  //adding a todo to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: created } = await axios.post("/api/todos", {
      taskName,
      assignee,
    });
    dispatch(createTodo(created));
    navigate("/");
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleAssignee = (event) => {
    setAssignee(event.target.value);
  };

  return (
    <form id="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="taskName">Task Name:</label>
      <input name="taskName" value={taskName} onChange={handleTaskName} />

      <label htmlFor="assignee">Assign To:</label>
      <input name="assignee" value={assignee} onChange={handleAssignee} />

      <button type="submit">Submit</button>
      <Link to="/">Cancel</Link>
    </form>
  );
};

export default CreateTodo;
