import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, toggleTheme } from "./redux/actions";
import TodoList from "./components/TodoList";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoDetails from "./components/TodoDetails";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={`app-container ${theme}`}>
      <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todos/:id" element={<TodoDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
