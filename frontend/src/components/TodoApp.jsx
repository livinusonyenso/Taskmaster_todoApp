import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import ReminderNotifications from "./ReminderNotifications";
import Todo from "./Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setEditTodo(null);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo._id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <ToastContainer /> {/* ✅ Add ToastContainer here */}
      <h1 className="text-3xl font-bold">📝 Todo List</h1>
      <ReminderNotifications todos={todos} />
      <TodoForm todo={editTodo} onSubmit={updateTodos} />
      <Todo todos={todos} deleteTodo={deleteTodo} setEditTodo={setEditTodo} />
    </div>
  );
};

export default TodoList;
