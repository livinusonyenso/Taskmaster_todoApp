import React, { useState } from "react";
import { createTodo, updateTodo } from "./api";

const TodoForm = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo) {
      await updateTodo(todo._id, { title });
    } else {
      await createTodo({ title });
    }
    onSubmit();
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a todo"
        className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {todo ? "Update" : "Add"} Todo
      </button>
    </form>
  );
};

export default TodoForm;