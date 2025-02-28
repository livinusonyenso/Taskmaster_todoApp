import axios from "axios";

const API_URL = "https://taskmaster-todoapp-1.onrender.com/api/todos"; // Replace with your backend URL
const getAuthToken = () => localStorage.getItem("token");

// const getAuthToken = () => {
//   const token = localStorage.getItem("token");
//   console.log("Using Token:", token); // Debugging
//   return token;
// };

export const fetchTodos = async () => {
  const response = await axios.get(API_URL,{
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Add token
    },
  });
  return response.data;
};

// export const createTodo = async (todo) => {
//   const response = await axios.post(API_URL, todo);
//   return response.data;
// };
export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create Todo Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update Todo Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add token
      },
    });
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete Todo Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};