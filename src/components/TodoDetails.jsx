import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTodo, updateTodo } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function TodoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) =>
    state.todos.find((t) => Number(t.id) === Number(id))
  );
  // console.log(todo)

  const [editable, setEditable] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  // console.log(editedTodo)

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const handleUpdate = () => {
    dispatch(updateTodo(todo.id, editedTodo));
    setEditable(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
    navigate("/");
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h2>Todo Details</h2>
      <p>
        <strong>Task:</strong>{" "}
        {editable ? (
          <input
            value={editedTodo.task}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, task: e.target.value })
            }
          />
        ) : (
          todo.task
        )}
      </p>

      <p>
        <strong>Completed:</strong> {todo.completed ? "YES" : "NO"}
        <button
          onClick={() => {
            dispatch(
              updateTodo(todo.id, { ...todo, completed: !todo.completed })
            );
          }}
        >
          Update Complete
        </button>
      </p>
      <p>
        <strong>Date:</strong>
        {editable ? (
          <input
            type="date"
            value={editedTodo.date}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, date: e.target.value })
            }
          />
        ) : (
          todo.date
        )}
      </p>
      <p>
        <strong>Description:</strong>
        {editable ? (
          <textarea
            value={editedTodo.description}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, description: e.target.value })
            }
          />
        ) : (
          todo.description
        )}
      </p>

      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={handleDelete}>Delete</button>
      {editable ? (
        <button onClick={handleUpdate}>Save</button>
      ) : (
        <button onClick={() => setEditable(true)}>Edit</button>
      )}
    </div>
  );
}
