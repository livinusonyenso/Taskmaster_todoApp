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

// export const deleteTodo = async (id) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${getAuthToken()}`, // Add token
//       },
//     });
//     console.log("Delete response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Delete Todo Error:", error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// export const deleteTodo = async (_id) => {
//   try {
//     let todos = JSON.parse(localStorage.getItem("todos")) || [];

//     // Ensure `_id` is defined before filtering
//     if (!_id) {
//       console.error("Invalid todo ID:", _id);
//       return;
//     }

//     // Remove the todo with the given _id
//     const updatedTodos = todos.filter(todo => todo._id !== _id);

//     // Save updated todos to local storage
//     localStorage.setItem("todos", JSON.stringify(updatedTodos));

//     console.log("Todo deleted successfully");
//   } catch (error) {
//     console.error("Delete Todo Error:", error);
//   }
// };

export const deleteTodo = async (_id) => {
  try {
    console.log("Deleting todo with ID:", _id);

    if (!_id) {
      console.error("Invalid todo ID:", _id);
      return;
    }

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Remove only the selected todo
    const updatedTodos = todos.filter(todo => todo._id !== _id);

    // Save the updated todos list back to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    console.log("Todo deleted successfully");

    return updatedTodos; // ✅ Return updated list
  } catch (error) {
    console.error("Delete Todo Error:", error);
  }
};
