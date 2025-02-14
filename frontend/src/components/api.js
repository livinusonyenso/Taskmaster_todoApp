import axios from "axios";

const API_URL = "https://taskmaster-todoapp-1.onrender.com/api/todos"; // Replace with your backend URL

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
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
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create Todo Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  console.log("Delete response:", response.data); 
  return response.data;
};