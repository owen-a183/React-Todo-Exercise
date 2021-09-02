import TodoList from "./TodoList";
// import TodoForm from "./TodoForm";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos.1312sadas2";

//Todo: Implement redux
//Todo: Implement axios
//Todo: consume api https://cdc-web-frontend.herokuapp.com/todos

function App() {
  const [sortsName, setSortsName] = useState(true);
  const [sortsDeadline, setSortsDeadline] = useState(true);
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const todoDateRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    const date = todoDateRef.current.value;
    if (name === "" || date === "") return null;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          complete: false,
          deadline: date,
        },
      ];
    });
    todoNameRef.current.value = null;
    todoDateRef.current.value = null;
    console.log(todos);
  }

  function handleCheckbox(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
    console.log(todos);
  }

  function handleDeleteCompleted() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
    console.log(todos);
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    console.log(todos);
  }

  function handleEdit(id, newName, newDate) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.name = newName;
    todo.deadline = newDate;
    setTodos(newTodos);
    console.log(todos);
  }

  function handleSortName() {
    const newTodos = [...todos];
    let prevSorts = sortsName;
    prevSorts
      ? newTodos.sort((a, b) => a.name.localeCompare(b.name))
      : newTodos.sort((b, a) => a.name.localeCompare(b.name));
    setSortsName(!prevSorts);
    setTodos(newTodos);
  }

  function handleSortDeadline() {
    const newTodos = [...todos];
    let prevSorts2 = sortsDeadline;
    prevSorts2
      ? newTodos.sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        )
      : newTodos.sort(
          (b, a) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
    setSortsDeadline(!prevSorts2);
    setTodos(newTodos);
  }

  return (
    <div>
      <div>
        <h1>
          Todo Application ({todos.filter((todo) => !todo.complete).length}{" "}
          items left)
        </h1>

        <br />
        <input ref={todoNameRef} type="text" placeholder="Add new todo"></input>
        <input ref={todoDateRef} type="date"></input>
        <button onClick={handleAddTodo}>Add</button>
        <button onClick={handleDeleteCompleted}>Delete completed</button>
      </div>
      <br />
      <div>
        <button onClick={handleSortName}>Sort by name</button>
        <button onClick={handleSortDeadline}>Sort by deadline</button>
      </div>
      <TodoList
        todos={todos}
        handleCheckbox={handleCheckbox}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
