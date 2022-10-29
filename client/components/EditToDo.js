import React, { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../store/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSelectedTodo, selectedTodo } from "../store/selectSlice";

//having trouble getting my useSelector to work. is the problem in my store or in my component or neither?
const EditToDo = () => {
  //allows us to use 'selected' in the jsx
  const selected = useSelector((state) => state.select.selectedTodo);

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

  const handleDelete = async (event) => {
    event.preventDefault();
    const { data: deleted } = await axios.delete(`/api/todos/${params.id}`, {
      //dont need anything here bc no info needs to be passed in?
    });
    dispatch(deleteTodo(deleted));
    navigate("/");
  };

  console.log(params);

  return (
    <div>
      <p>
        {selected.id}
        {selected.taskName}
        {selected.assignee}
      </p>
      <button onClick={handleDelete}>delete item {params.id}</button>
    </div>
  );
};

export default EditToDo;
