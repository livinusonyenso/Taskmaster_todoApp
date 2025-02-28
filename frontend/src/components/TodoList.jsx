import React, { useEffect, useState ,useContext} from "react";
import { fetchTodos } from "./api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import AuthContext from "../context/AuthContext";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const { user,logout } = useContext(AuthContext);

 

  const loadTodos = async () => {
    const data = await fetchTodos(user);
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  },[]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      <button onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700" >logout</button>
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