import React from "react";
import Todo from "./Todo.js";

export default function TodoList({
  todos,
  handleCheckbox,
  handleDelete,
  handleEdit,
}) {
  return todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handleCheckbox={handleCheckbox}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  });
}
