import React, { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../store/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { setSelectedTodo } from "../store/selectSlice";

//having trouble getting my useSelector to work. is the problem in my store or in my component or neither?
const EditToDo = () => {
  //allows us to use 'selected' in the jsx
  const selected = useSelector((state) => state.select.selectedTodo);

  //questions:
  //would it have been better to reset my 'setTaskName' and 'setAssignee' and pull them in as props?
  //would it have been better to put these in state? or since we only need them for the update fxn it was fine?
  const [updatedTask, setUpdatedTask] = useState("");
  const [updatedAssignee, setUpdatedAssignee] = useState("");

  const dispatch = useDispatch("");
  const navigate = useNavigate();
  const params = useParams();

  //fetching singleToDo
  const fetchSingleTodo = async () => {
    //fetched the object we selected by id
    const { data: select } = await axios.get(`/api/todos/${params.id}`);
    //allowing this object to be updated
    dispatch(setSelectedTodo(select));
  };

  //fetching single item when its clicked on - i need this here right? to load the single item once when clicked
  useEffect(() => {
    fetchSingleTodo();
  }, []);

  //DELETE ITEM
  const handleDelete = async (event) => {
    event.preventDefault();
    const { data: deleted } = await axios.delete(`/api/todos/${params.id}`, {
      //dont need anything here bc no info needs to be passed in?
    });
    dispatch(deleteTodo(deleted));
    navigate("/");
  };

  //UPDATE ITEM
  const handleUpdate = async (event) => {
    event.preventDefault();
    const { data: updated } = await axios.put(`/api/todos/${params.id}`, {
      taskName: updatedTask,
      assignee: updatedAssignee,
    });
    dispatch(updateTodo(updated));
    navigate("/");
  };

  const editTaskName = (event) => {
    setUpdatedTask(event.target.value);
  };

  const editAssignee = (event) => {
    setUpdatedAssignee(event.target.value);
  };

  return (
    <div>
      {selected.taskName ? (
        <form id="todo-form" onSubmit={handleUpdate}>
          <label htmlFor="taskName">Task Name: </label>
          <input
            name="taskName"
            placeholder={selected.taskName}
            onChange={editTaskName}
          />

          <label htmlFor="assignee">Assign To:</label>
          <input
            name="assignee"
            placeholder={selected.assignee}
            onChange={editAssignee}
          />

          <button type="submit">Submit</button>
          <Link to="/">Cancel</Link>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleDelete}>delete this task</button>
    </div>
  );
};

export default EditToDo;
