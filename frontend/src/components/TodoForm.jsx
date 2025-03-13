import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoForm = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [date, setDate] = useState(todo ? todo.date : "");
  const [time, setTime] = useState(todo ? todo.time : "");
  const [priority, setPriority] = useState(todo ? todo.priority : "medium");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDate(todo.date);
      setTime(todo.time);
      setPriority(todo.priority);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      _id: todo ? todo._id : Date.now(), // Use `_id`
      title,
      description,
      date,
      time,
      priority,
    };

    let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    if (todo) {
      // Update existing todo
      storedTodos = storedTodos.map((t) => (t._id === todo._id ? todoData : t));
      toast.success("✅ Todo updated successfully!");
    } else {
      // Add new todo
      storedTodos.push(todoData);
      toast.success("🎉 Todo added successfully!");
    }

    localStorage.setItem("todos", JSON.stringify(storedTodos));

    onSubmit(storedTodos); // Update UI with new todos

    // Reset form fields
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setPriority("medium");
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl border border-gray-200 backdrop-blur-lg bg-opacity-90">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {todo ? "✏️ Update" : "➕ Add"} Todo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a todo title..."
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description..."
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none resize-none transition duration-200"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Due Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Due Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-200"
            >
              <option value="low">Low 🔵</option>
              <option value="medium">Medium 🟡</option>
              <option value="high">High 🔴</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-lg text-lg font-bold hover:opacity-90 transition duration-200 shadow-md"
          >
            {todo ? "✅ Update" : "🚀 Add"} Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
