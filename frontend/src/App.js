import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register"; // Fix incorrect import
import Login from "./components/Login"; // Fix incorrect import
import ProtectedRoute from "./components/ProtectedRoute";
import TodoList from "./components/TodoList";

function App() {
  return (
    <AuthProvider>
      {/* Wrap everything inside BrowserRouter */}
      <Router>  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
