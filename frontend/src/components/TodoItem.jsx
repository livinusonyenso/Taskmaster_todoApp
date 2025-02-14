import React, { useState } from "react";
import { deleteTodo } from "./api";
import { ClipLoader } from "react-spinners"; // Import Spinner

const TodoItem = ({ todo, onDelete, onEdit, onUpdateStatus }) => {
  const [status, setStatus] = useState(todo.status || "Pending");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

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

  const handleStatusChange = async (newStatus) => {
    setLoadingStatus(true);
    setStatus(newStatus);
    await onUpdateStatus(todo._id, newStatus);
    setLoadingStatus(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6  mt-10 border border-gray-200 transition-transform transform hover:scale-105 ">
      {/* Title & Description */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
      </div>

      {/* Status Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-gray-600 font-medium">Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loadingStatus}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {loadingStatus && <ClipLoader size={18} color="#4CAF50" />}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            setLoadingEdit(true);
            onEdit(todo);
            setTimeout(() => setLoadingEdit(false), 1000);
          }}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
          disabled={loadingEdit}
        >
          {loadingEdit ? <ClipLoader size={18} color="#fff" /> : "✏️ Edit"}
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all flex items-center justify-center"
          disabled={loadingDelete}
        >
          {loadingDelete ? <ClipLoader size={18} color="#fff" /> : "🗑️ Delete"}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
