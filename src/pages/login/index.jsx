import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./loginpage.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { setUserId } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", data);
      if (response.data.success) {
        setUserId(response.data.userId);
        navigate(`/homepage`);
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: "Username is required" })}
            className="login-input"
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: "Password is required" })}
            className="login-input"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="login-cadastrobutton"
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
