import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import "./userpage.css"; // Certifique-se de que esse arquivo CSS existe
//chatgpt crie um id para a vaga e envie nos objetos das chamadas de api
const UserPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [inputsConfig, setInputsConfig] = useState([
    { nome: "anos", tipo: "experiencia", indice: 1 },
    { nome: "conhecimentos", tipo: "conhecimento", indice: 1 },
    { nome: "idiomas", tipo: "idioma", indice: 1 },
    { nome: "graus", tipo: "grau", indice: 1 },
  ]);
  const { userId } = useAuth();

  const onSubmit = async (data) => {
    const formData = new FormData();

    let experiencias = [];
    let conhecimentos = [];
    let idiomas = [];
    let cursos = [];
    for (let i = 0; i < data.anos.length; i++) {
      if (data.anos[i] !== undefined) {
        let tempexp = {
          anos: data.anos[i],
          requerimento: data.requerimento[i],
        };
        experiencias.push(tempexp);
      }
    }
    for (let i = 0; i < data.descricao.length; i++) {
      if (data.descricao[i] !== undefined) {
        let tempdesc = {
          descricao: data.descricao[i],
        };
        conhecimentos.push(tempdesc);
      }
    }
    for (let i = 0; i < data.proficiencia.length; i++) {
      if (data.proficiencia[i] !== undefined) {
        let tempprof = {
          proficiencia: data.proficiencia[i],
          idioma: data.idioma[i],
        };
        idiomas.push(tempprof);
      }
    }
    for (let i = 0; i < data.curso.length; i++) {
      if (data.curso[i] !== undefined) {
        let tempcur = {
          curso: data.curso[i],
          situacao: data.situação[i],
        };
        cursos.push(tempcur);
      }
    }

    const userData = {
      userId: userId,
      nome: data.nome,
      resumo: data.resumo,
      experiencias: experiencias,
      conhecimentos: conhecimentos,
      idiomas: idiomas,
      cursos: cursos,
    };

    axios.post("http://127.0.0.1:5000/enviarvaga", userData).then((res) => {
      console.log(res.data);
    });
  };

  const handleAddInput = (tipo) => {
    const lastIndex = inputsConfig.filter(
      (input) => input.tipo === tipo
    ).length;
    const newInput = {
      nome: `${tipo}${lastIndex + 1}`,
      tipo,
      indice: lastIndex + 1,
    };
    setInputsConfig([...inputsConfig, newInput]);
  };

  const renderInputs = (tipo) => {
    return inputsConfig
      .filter((input) => input.tipo === tipo)
      .map((input, index) => (
        <div key={index}>
          <Input
            nome={input.nome}
            tipo={input.tipo}
            indice={input.indice}
            register={register}
          />
        </div>
      ));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="cadastrovaga-form"
    >
      <div className="cadastrovaga-container">
        <div className="cadastrovaga-titulo">
          <h1>Descreva a vaga</h1>
        </div>
        <div className="cadastrovaga-vaga">
          <div className="cadastrovaga-nome-vaga">
            <h3 className="cadastrovaga-nome-titulo">
              <div className="cadastrovaga-input-nome">
                <input
                  type="text"
                  placeholder="nome da vaga"
                  name="nome"
                  {...register("nome")}
                />
              </div>
            </h3>
          </div>
          <div className="cadastrovaga-resumo-vaga">
            <h3 className="cadastrovaga-resumo-titulo">
              <div className="cadastrovaga-input-resumo">
                <input
                  type="text"
                  placeholder="escreva um pequeno resumo da vaga"
                  name="resumo"
                  {...register("resumo")}
                />
              </div>
            </h3>
          </div>
          <div className="cadastrovaga-experiencia">
            <h3 className="cadastrovaga-experiencia-titulo">Experiencias</h3>
            <div className="cadastrovaga-inputs">
              {renderInputs("experiencia")}
            </div>
            <button
              type="button"
              className="cadastrovaga-add-button"
              onClick={() => handleAddInput("experiencia")}
            >
              Adicionar Experiência
            </button>
          </div>
          <div className="cadastrovaga-conhecimento">
            <h3 className="cadastrovaga-conhecimento-titulo">Conhecimentos</h3>
            <div className="cadastrovaga-inputs">
              {renderInputs("conhecimento")}
            </div>
            <button
              type="button"
              className="cadastrovaga-add-button"
              onClick={() => handleAddInput("conhecimento")}
            >
              Adicionar Conhecimento
            </button>
          </div>
          <div className="cadastrovaga-idioma">
            <h3 className="cadastrovaga-idioma-titulo">Idioma</h3>
            <div className="cadastrovaga-inputs">{renderInputs("idioma")}</div>
            <button
              type="button"
              className="cadastrovaga-add-button"
              onClick={() => handleAddInput("idioma")}
            >
              Adicionar Linguagem
            </button>
          </div>
          <div className="cadastrovaga-grau">
            <h3 className="cadastrovaga-grau-titulo">Grau de Escolaridade</h3>
            <div className="cadastrovaga-inputs">{renderInputs("grau")}</div>
            <button
              type="button"
              className="cadastrovaga-add-button"
              onClick={() => handleAddInput("grau")}
            >
              Adicionar Grau de Escolaridade
            </button>
          </div>
        </div>

        <input type="submit" className="cadastrovaga-submit" />
      </div>
    </form>
  );
};

export default UserPage;
