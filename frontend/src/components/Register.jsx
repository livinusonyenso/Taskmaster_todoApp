import { useState } from "react";
import axios from "axios";

const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("https://taskmaster-todoapp-1.onrender.com/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setAuth(true);
      setSuccess("Registration successful! Redirecting...");
    } catch (err) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">Welcome to ISONG TodoMaster!</h2>
        <p className="text-gray-600 text-center mb-6">Create an account to manage your tasks efficiently.</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
