import React, { useState, useEffect } from "react";
import { deleteTodo } from "./api";
import { ClipLoader } from "react-spinners";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [status, setStatus] = useState("In Progress");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      if (todo.time) {
        const currentTime = new Date();
        const todoTime = new Date(`${todo.date} ${todo.time}`);
        setStatus(todoTime < currentTime ? "Completed" : "In Progress");
      }
    };
    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todo.date, todo.time]);

  const formatTime = (time) => {
    if (!time) return "No Time Set";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteTodo(todo._id);
      onDelete();
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105">
      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{todo.title}</h2>
        <p className="text-gray-600 text-base">{todo.description}</p>
      </div>

      {/* 🗓️ Date & Time Section */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          📅 <strong>Date:</strong> {todo.date ? todo.date : "No Date Set"}  
        </p>
        <p className="text-sm text-gray-500 mt-1">
          ⏰ <strong>Time:</strong> {formatTime(todo.time)}
        </p>
      </div>

      {/* Priority Display */}
      {
        todo.priority && (
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Priority:</label>
            {todo.priority === "High" && (
              <span className="px-4 py-2 rounded-md text-white font-medium bg-red-500">
                {todo.priority}
              </span>
            )}
            {todo.priority === "Medium" && (
              <span className="px-4 py-2 rounded-md text-white font-medium bg-yellow-500">
                {todo.priority}
              </span>
            )}
            {todo.priority === "Low" && (
              <span className="px-4 py-2 rounded-md text-white font-medium bg-green-500">
                {todo.priority}
              </span>
            )}
            {!["High", "Medium", "Low"].includes(todo.priority) && (
              <span className="px-4 py-2 rounded-md text-white font-medium bg-gray-500">
                {todo.priority}
              </span>
            )}
          </div>
        )
      }

      {/* Status Display */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Status:</label>
        <span className={`px-4 py-2 rounded-md text-white font-medium transition-all ${status === "In Progress" ? "bg-blue-500" : "bg-green-500"}`}>
          {status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            setLoadingEdit(true);
            onEdit(todo);
            setTimeout(() => setLoadingEdit(false), 1000);
          }}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center flex-1"
          disabled={loadingEdit}
        >
          {loadingEdit ? <ClipLoader size={18} color="#fff" /> : "✏️ Edit"}
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