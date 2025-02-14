import React, { useState } from "react";
import { deleteTodo } from "./api";

const TodoItem = ({ todo, onDelete, onEdit, onUpdateStatus }) => {
  const [status, setStatus] = useState(todo.status || "Pending");

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      console.log("Todo deleted successfully");
      onDelete();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(todo._id, newStatus);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 to-green-500 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-300">
        
        {/* Task Title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
        </div>
  
  <div className="flex">
  

       
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(todo)}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            ✏️ Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            🗑️ Delete
          </button>
        </div>
 {/* Progress Dropdown */}
 <div className="text-center mb-4">
          <label className="text-gray-600 font-medium mr-2">Status:</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        </div>

      </div>
    </div>
  );
};

export default TodoItem;
