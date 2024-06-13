import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate(); // Utilize useNavigate

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", data);
      if (response.data.success) {
        // Login successful, redirect to Comparacao with username
        navigate(`/comparacao`); // Use navigate
        localStorage.setItem("username", data.username);
      } else {
        setLoginError(response.data.message); // Set error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
