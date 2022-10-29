import React, { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../store/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSelectedTodo } from "../store/selectSlice";

//having trouble getting my useSelector to work. is the problem in my store or in my component or neither?
const EditToDo = () => {
  const selected = useSelector((state) => state.select.selectedToDo);
  console.log(selected, "line 9"); //returning undefined -- why?!
  // how do i get this so that I can console.log selected, and it be the object im referencing?

  //need this state for setting the selectedTodo
  const [selectedToDo, setSelectedTodo] = useState({});

  const dispatch = useDispatch("");
  const navigate = useNavigate();
  const params = useParams();

  //fetching singleToDo
  const fetchSingleTodo = async () => {
    //fetched the object we selected by id
    const { data: select } = await axios.get(`/api/todos/${params.id}`);

    //sets our selected state to current select object
    setSelectedTodo(select);

    //allowing this object to be updated
    dispatch(updateTodo(selectedToDo));
  };

  //this logs out selectedToDo object correctly
  console.log("selectedToDo", selectedToDo);

  //fetching single item when its clicked on
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

  return (
    <div>
      <p>
        {selectedToDo.id}
        {selectedToDo.taskName}
        {selectedToDo.assignee}
      </p>
      <button onClick={handleDelete}>delete item {params.id}</button>
    </div>
  );
};

export default EditToDo;
