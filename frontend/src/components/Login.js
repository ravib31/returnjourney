import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!formData.email || !formData.password) {
        alert("Please provide both email and password.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        alert("User logged in");
        navigate("/calendar");
      }
    } catch (error) {
      if (error.response) {
        console.log("Backend Error:", error.response.data);
        alert(error.response.data.message || "Error during login");
      } else {
        console.log("Error:", error.message);
        alert("Please try again after some time");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-950 transition-colors duration-300"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-600">
          If you are not a registered user,{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            click here
          </Link>{" "}
          to sign up.
        </p>
      </div>
    </div>
  );
}

export default Login;
