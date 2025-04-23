import { useState } from "react";
import axios from "axios";
import { FiUser, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
  
      const token = res.data.token; // ✅ assign token to a variable
      localStorage.setItem("token", token); // ✅ store it
      console.log("Logged-in token:", token); // ✅ print it
  
      setMsg("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMsg("❌ Invalid Credentials");
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('')", // Replace with your background image URL
          // https://static.foxbusiness.com/foxbusiness.com/content/uploads/2021/06/Crime-Scene-Police.jpg
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-300 transform transition-all hover:scale-105">
        <div className="text-center mb-6">
          <img
            src="https://images.seeklogo.com/logo-png/61/1/gujarat-police-logo-png_seeklogo-611297.png"
            alt="AI Police"
            className="mx-auto w-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            AI Crime Investigation Assistant
          </h2>
          <p className="text-sm text-gray-500">For Police Department</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="flex items-center border rounded-md px-3 py-2 mb-4 shadow-lg">
            <FiUser className="text-blue-600 mr-2 font-bold" />
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2 mb-4 shadow-lg">
            <FiLock className="text-blue-600 mr-2 font-bold" />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {msg && (
            <div className="text-sm text-center text-red-500 mb-2">{msg}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
