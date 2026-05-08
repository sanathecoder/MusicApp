import { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      alert("Account Created Successfully 🎉");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  const movetologin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md hover:shadow-purple-500/20 transition duration-300">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        {/* Username */}
        <input
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email */}
        <input
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role */}
        <select
          className="w-full p-3 mb-6 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user" className="text-black">User (Listen Music)</option>
          <option value="artist" className="text-black">Artist (Create Music)</option>
        </select>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 hover:scale-[1.02] transition duration-300"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Join the music world 🎵
        </p>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={movetologin}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;