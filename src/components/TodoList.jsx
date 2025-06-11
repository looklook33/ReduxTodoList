import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, fetchTodos } from "../redux/actions";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

    const generateId = () => {
     return parseInt(Date.now() * Math.random());
   };

  const handleAdd = () => {
    const id = generateId().toString();
    const newTodo = { id, task, date, description, completed: false };
    dispatch(createTodo(newTodo));
    setTask("");
    setDate("");
    setDescription("");
  };

  return (
    <>
      <div className="input-container">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Discription..."
        />
        <button onClick={handleAdd}>+</button>
      </div>
      <div>
        <h2>To Do List</h2>
        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <li key={todo.id} onClick={() => navigate(`/todos/${todo.id}`)}>
                {todo.task} - {todo.completed ? "COMPLETED✔️" : "NOT COMPLTED❌"}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
