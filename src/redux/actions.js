export const SET_TODOS = "SET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const UPDATE_TODO = "UPDATE_TODO"
export const TOGGLE_THEME = "TOGGLE_THEME";


export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const editeTodo = (todo) =>({
  type: UPDATE_TODO,
  payload:todo
})

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

// Async action creators

export const fetchTodos = () => async (dispatch) => {
  const res = await fetch("http://localhost:3001/todos");
  const data = await res.json();
  dispatch(setTodos(data));
};

export const createTodo = (todo) => async (dispatch) => {
  const res = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  dispatch(addTodo(data));
};

export const deleteTodo = (id) => async (dispatch) => {
  await fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" });
  dispatch(removeTodo(id));
};

export const updateTodo = (id, todo) => async (dispatch) => {
  const res = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  dispatch(editeTodo(data));
};