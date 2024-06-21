import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cadastropage.css";
import { useAuth } from "../../context/AuthContext";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const Cadastro = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUserId } = useAuth;
  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      senha: data.password,
      empresa: data.empresa,
      idempresa: getRandomIntInclusive(0, 90000),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/inserir-user",
        userData
      );
      if (response.data.success) {
        setUserId(response.data.userId); // Save user ID in context
        navigate(`/homepage`);
      }
    } catch (error) {
      console.error("Cadastro error:", error);
    }
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-titulo">Criar Conta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
        <label htmlFor="username" className="cadastro-label">
          Nome de Usuário:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
          className="cadastro-input"
        />

        <br />

        <label htmlFor="email" className="cadastro-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          {...register("email")}
          className="cadastro-input"
        />

        <br />

        <label htmlFor="password" className="cadastro-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
          className="cadastro-input"
        />

        <br />

        <label htmlFor="confirm_password" className="cadastro-label">
          Confirmar Senha:
        </label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          {...register("confirm_password")}
          className="cadastro-input"
        />
        <br />
        <label htmlFor="Empresa" className="cadastro-label">
          Nome da Empresa:
        </label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          {...register("empresa")}
          className="cadastro-input"
        />
        <br />

        <input type="submit" value="Criar Conta" className="cadastro-button" />
      </form>
    </div>
  );
};

export default Cadastro;
