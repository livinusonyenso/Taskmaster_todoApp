import React, { useState, useEffect } from "react";
import { deleteTodo } from "./api";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [status, setStatus] = useState("In Progress");
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    console.log("Todo Data:", todo); // ✅ Check what the backend is sending

    const updateStatus = () => {
      if (todo?.time && todo?.date) {
        const currentTime = new Date();
        const todoTime = new Date(`${todo.date}T${todo.time}`); // Ensure correct format
        setStatus(todoTime < currentTime ? "Completed" : "In Progress");
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update status every minute
    return () => clearInterval(interval);
  }, [todo?.date, todo?.time]);

  const handleDelete = async () => {
    if (!todo?._id) {
      toast.error("Todo ID is undefined! Cannot delete.");
      return;
    }
  
    console.log("🔍 Attempting to delete todo with ID:", todo._id); // ✅ Log ID before deleting
  
    setLoadingDelete(true);
    try {
      await deleteTodo(todo._id);
      onDelete(todo._id);
      toast.success("✅ Todo deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
      toast.error("❌ Failed to delete todo!");
    } finally {
      setLoadingDelete(false);
    }
  };
  
  
  

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105">
      {/* Title & Description */}
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{todo?.title || "Untitled Todo"}</h2>
        <p className="text-gray-600 text-base">{todo?.description || "No description available"}</p>
      </div>

      {/* Date & Time */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          📅 <strong>Date:</strong> {todo?.date || "No Date Set"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          ⏰ <strong>Time:</strong> {todo?.time || "No Time Set"}
        </p>
      </div>

      {/* Priority */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Priority:</label>
        <span
          className={`px-4 py-2 rounded-md text-white font-medium transition-all ${
            todo.priority === "high"
              ? "bg-red-500"
              : todo.priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} {/* Capitalize first letter */}
        </span>
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Status:</label>
        <span
          className={`px-4 py-2 rounded-md text-white font-medium transition-all ${
            status === "In Progress" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => onEdit(todo)}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center flex-1"
        >
          ✏️ Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all flex items-center justify-center flex-1"
          disabled={loadingDelete}
        >
          {loadingDelete ? <ClipLoader size={18} color="#fff" /> : "🗑️ Delete"}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
