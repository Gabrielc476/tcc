import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const Cadastro = () => {
  const { register, handleSubmit } = useForm();
  const { success, setSuccess } = useState(false);
  const [focused, setFocused] = useState(false);
  const [data, setData] = useState([]);
  const [usernameDisp, setUsernameDisp] = useState(true);
  const [emaildisp, setEmailDisp] = useState(true);
  const [msg, setMsg] = useState("");

  const handleAvaliable = (userdisp, emaildisp, msg) => {
    setUsernameDisp(userdisp);
    setEmailDisp(emaildisp);
    setMsg(msg);
  };

  const getUsers = async (username) => {
    const res = await axios.get(` http://127.0.0.1:5000/getuser/${username}`);
    setData(res.data);
    console.log(data);
  };

  const checkAvaliable = async (username, email) => {
    const res = await axios.get(
      ` http://127.0.0.1:5000/checkuser?username=${username}&email=${email}`
    );
    handleAvaliable(
      res.data.nomedisponivel,
      res.data.emaildisponivel,
      res.data.mensagem
    );
  };

  const onSubmit = async (dados) => {
    if (regex.test(dados.password) && dados.password == dados.confirmpassword) {
      const userData = {
        userid: getRandomIntInclusive(0, 10000),
        username: dados.username,
        email: dados.email,
        senha: dados.password,
        idade: dados.age,
      };
      await checkAvaliable(userData.username, userData.email);
      if (usernameDisp === true && emaildisp === true) {
        const changeData = (userData) => {
          setData(userData);
        };
        changeData(userData);
        axios
          .post("http://127.0.0.1:5000/inserir-user", userData)
          .then((response) => {
            console.log(response.status, response.data);
          });
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Cadastro</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            {...register("username", { required: true })}
            className="form-input"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            className="form-input"
            placeholder="E-mail"
          />
        </div>
        <div className="senha">
          <input
            type="password"
            name="password"
            {...register("password", { required: true })}
            className="form-input"
            placeholder="senha"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {focused == true && (
            <span className="senha-req">
              A senha deve conter letras maiscula, minuscula, minimo 8
              caracteres, numeros e simbolos como: . ! $
            </span>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmpassword"
            {...register("confirmpassword", { required: true })}
            className="form-input"
            placeholder="confirmar senha"
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            {...register("age", { required: true })}
            className="form-input"
            placeholder="idade"
          />
        </div>

        <input type="submit" value="Cadastrar-se" />
      </form>
    </div>
  );
};

export default Cadastro;
