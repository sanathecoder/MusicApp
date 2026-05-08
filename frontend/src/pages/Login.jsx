import { useState, useContext } from "react";
import API from "@/api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);

      //SAVE TO LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "artist") {
        navigate("/artist/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const movetoregiter = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md hover:shadow-pink-500/20 transition duration-300">

        {/* Welcome text */}
        <p className="text-center text-sm text-gray-400 mb-2">
          Welcome back 👋
        </p>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Login
          
        </h2>

        {/* Email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />

        {/* Password */}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 hover:scale-[1.02] transition duration-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={movetoregiter}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;