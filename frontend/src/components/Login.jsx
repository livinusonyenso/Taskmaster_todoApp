import { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners"
import BackgroundAnimation from "./BackgroundAnimation";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    // console.log("Sending Login Request:", { email, password });
    try {
      const res = await axios.post("https://taskmaster-todoapp-1.onrender.com/api/auth/login", {
        email,
        password,
      });
      console.log("Login Response:", res.data);

      const token = res.data.token;
      localStorage.setItem("token", token);
      setUser(token); // Update context

      navigate("/todos"); // Redirect to todos page
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.msg || "Login failed. Try again.");
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       <BackgroundAnimation />
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}

        </button>
      </form>
        {/* Registration encouragement message */}
        <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
