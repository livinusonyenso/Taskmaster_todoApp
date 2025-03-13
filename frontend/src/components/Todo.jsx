// Todo.js
import React from "react";
import TodoItem from "./TodoItem";

const Todo = ({ todos, deleteTodo, setEditTodo, handleSnoozeReminder, handleDismissReminder }) => {
  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet. Start adding some! 🎉</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
  key={todo._id}
  todo={todo}
  onDelete={() => deleteTodo(todo._id)} // ✅ Pass correct delete function
  onEdit={setEditTodo}
  onSnoozeReminder={handleSnoozeReminder}
  onDismissReminder={handleDismissReminder}
/>
        ))
      )}
    </div>
  );
};

export default Todo;