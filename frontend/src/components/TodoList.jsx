import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setEditTodo(null)
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">📝 Todo App</h1>
      
      <TodoForm todo={editTodo} onSubmit={updateTodos} />

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet. Start adding some! 🎉</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm border"
            >
              <div>
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <p className="text-gray-600">{todo.description}</p>
                <p className="text-sm text-gray-500">📅 {todo.date} | 🔥 {todo.priority}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditTodo(todo)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
