import React, { useRef } from "react";

export default function Todo({
  todo,
  handleCheckbox,
  handleDelete,
  handleEdit,
}) {
  const editNameRef = useRef();
  const editDateRef = useRef();

  function handleCheckboxToggle() {
    handleCheckbox(todo.id);
  }

  function handleEditButton() {
    const newName = editNameRef.current.value;
    const newDate = editDateRef.current.value;
    handleEdit(todo.id, newName, newDate);
  }

  function handleDeleteButton() {
    handleDelete(todo.id);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleCheckboxToggle}
        ></input>
      </label>
      <label>
        {" "}
        <input ref={editNameRef} type="text" defaultValue={todo.name}></input>
      </label>
      <label>
        {" "}
        <input
          ref={editDateRef}
          type="date"
          defaultValue={todo.deadline}
        ></input>
      </label>
      <button onClick={handleEditButton}>Edit</button>
      <button onClick={handleDeleteButton}>Delete</button>
    </div>
  );
}
