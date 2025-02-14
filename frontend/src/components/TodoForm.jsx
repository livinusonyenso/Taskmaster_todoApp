import React, { useState } from "react";
import { createTodo, updateTodo } from "./api";

const TodoForm = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { title, description };

    if (todo) {
      await updateTodo(todo._id, todoData);
    } else {
      await createTodo(todoData);
    }
    
    onSubmit();
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {todo ? "Update" : "Add"} Todo
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-gray-600 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a todo title"
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              rows="3"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            {todo ? "Update" : "Add"} Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
