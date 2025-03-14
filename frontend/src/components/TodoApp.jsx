import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  // ✅ Fetch todos from the API when the component loads
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromAPI = await fetchTodos();
        setTodos(todosFromAPI);
      } catch (error) {
        toast.error("Failed to load todos");
      }
    };

    loadTodos();
  }, []);

  // ✅ Handle adding a new todo
  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos([...todos, createdTodo]); // Add to the list
      toast.success("Todo added!");
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  // ✅ Handle updating a todo
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const result = await updateTodo(updatedTodo._id, updatedTodo);
      setTodos(todos.map((t) => (t._id === result._id ? result : t)));
      setEditTodo(null);
      toast.success("Todo updated!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  // ✅ Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // ✅ Remove from UI
      toast.success("Todo deleted!");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold">📝 Todo List</h1>
      <TodoForm todo={editTodo} onSubmit={editTodo ? handleUpdateTodo : handleAddTodo} />
      <Todo todos={todos} deleteTodo={handleDeleteTodo} setEditTodo={setEditTodo} />
    </div>
  );
};

export default TodoList;
