import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./styles.css";
import Input from "../../components/input";

const UserPage = () => {
  const { register, handleSubmit } = useForm();
  const [inputsConfig, setInputsConfig] = useState([
    { nome: "anos", tipo: "experiencia", indice: 1 },
    { nome: "conhecimentos", tipo: "conhecimento", indice: 1 },
    { nome: "idiomas", tipo: "idioma", indice: 1 },
    { nome: "graus", tipo: "grau", indice: 1 },
  ]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.curriculo.length > 0) {
      Array.from(data.curriculo).map((curriculo, index) => {
        formData.append(`curriculo${index}`, curriculo, curriculo.name);
      });
    }
    let experiencias = [];
    let conhecimentos = [];
    let linguas = [];
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
          lingua: data.lingua[i],
        };
        linguas.push(tempprof);
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

    const userData = [experiencias, conhecimentos, linguas, cursos];

    axios.post("http://127.0.0.1:5000/enviarvaga", userData).then((res) => {
      console.log(res.data);
    });
    axios
      .post("http://127.0.0.1:5000/enviarcurriculo", formData)
      .then((res) => {
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
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="container">
        <div className="titulo">
          <h1>Titulo</h1>
        </div>
        <div className="vaga-titulo">
          <h2>Descreva a vaga</h2>
        </div>
        <div className="vaga">
          <div className="Experiencia">
            <h3 className="experiencia-titulo">Experiencias</h3>
            <div className="inputs">{renderInputs("experiencia")}</div>
            <button type="button" onClick={() => handleAddInput("experiencia")}>
              Adicionar Experiência
            </button>
          </div>
          <div className="Conhecimento">
            <h3 className="conhecimento-titulo">Conhecimentos</h3>
            <div className="inputs">{renderInputs("conhecimento")}</div>
            <button
              type="button"
              onClick={() => handleAddInput("conhecimento")}
            >
              Adicionar Conhecimento
            </button>
          </div>
          <div className="Idioma">
            <h3 className="Idioma-titulo">Idioma</h3>
            <div className="inputs">{renderInputs("idioma")}</div>
            <button type="button" onClick={() => handleAddInput("idioma")}>
              Adicionar Linguagem
            </button>
          </div>
          <div className="Grau">
            <h3 className="grau-titulo">Grau de Escolaridade</h3>
            <div className="inputs">{renderInputs("grau")}</div>
            <button type="button" onClick={() => handleAddInput("grau")}>
              Adicionar Grau de Escolaridade
            </button>
          </div>
        </div>
        <div className="curriculo-container">
          <input
            type="file"
            name="curriculo"
            multiple
            {...register("curriculo")}
          />
        </div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default UserPage;
