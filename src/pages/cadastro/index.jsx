import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import "./style.css";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const Cadastro = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      senha: data.password,
      empresa: data.empresa,
      idempresa: getRandomIntInclusive(0, 90000),
    };

    axios.post("http://127.0.0.1:5000/inserir-user", userData).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Nome de Usuário:</label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
        />

        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" {...register("email")} />

        <br />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
        />

        <br />

        <label htmlFor="confirm_password">Confirmar Senha:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          {...register("confirm_password")}
        />
        <br />
        <label htmlFor="Empresa">Nome da Empresa:</label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          {...register("empresa")}
        />
        <br />

        <input type="submit" value="Criar Conta" />
      </form>
    </div>
  );
};

export default Cadastro;
