import React, { useEffect, useState } from "react";
import { fetchTodos } from "./api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      <TodoForm todo={editTodo} onSubmit={loadTodos} />
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={loadTodos}
            onEdit={setEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;