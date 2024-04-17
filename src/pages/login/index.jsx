import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const getUsers = async (username, password) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/getuser/${username}`);
      setData(res.data);
      console.log(res.data);
      check(res.data.senha, password);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const check = (formsenha, ressenha) => {
    if (formsenha === ressenha) {
      console.log("match");
    }
  };
  const onSubmit = async (dados) => {
    await getUsers(dados.username, dados.password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="username" {...register("username")} />
        <input type="password" name="password" {...register("password")} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
