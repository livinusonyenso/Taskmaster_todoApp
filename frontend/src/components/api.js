import axios from "axios";

const API_URL = "https://taskmaster-todoapp-1.onrender.com/api/todos"; // Backend URL


const getAuthToken = () => localStorage.getItem("token");

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data; // ✅ Returns todos from the database
  } catch (error) {
    console.error("Fetch Todos Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data; // ✅ Returns the new todo
  } catch (error) {
    console.error("Create Todo Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data; // ✅ Returns the updated todo
  } catch (error) {
    console.error("Update Todo Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
  } catch (error) {
    // console.error("Delete Todo Error:", error.response?.data || error.message);
    throw error;
  }
};
