import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import AplicanteCard from "../../components/aplicantecard";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./jobdetails.css";

const JobDetails = () => {
  const { register, handleSubmit } = useForm();
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para o carregamento

  useEffect(() => {
    const fetchCurriculos = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const response = await axios.get(
          `http://127.0.0.1:5000/getcurriculos?id_vaga=${localStorage.getItem(
            "jobId"
          )}`
        );
        setCurriculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar currículos:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchCurriculos();
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.curriculo.length > 0) {
      Array.from(data.curriculo).forEach((curriculo, index) => {
        formData.append(`curriculo${index}`, curriculo, curriculo.name);
      });
    }

    axios
      .post(
        `http://127.0.0.1:5000/enviarcurriculo?id_vaga=${localStorage.getItem(
          "jobId"
        )}`,
        formData
      )
      .then((res) => {
        console.log("Currículos enviados com sucesso", res.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar currículos:", error);
      });
  };

  return (
    <div className="jobdetail-container">
      <div className="jobdetail-sidebar">
        <Sidebar />
      </div>
      <div className="jobdetail-content">
        <div className="jobdetail-curriculos">
          <h2>Lista de Currículos</h2>
          <div className="jobdetail-cards">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Carregando currículos...</p>
              </div>
            ) : curriculos.length > 0 ? (
              curriculos.map((curriculo, index) => (
                <AplicanteCard
                  key={index}
                  name={curriculo.nome}
                  email={curriculo.email}
                  phone={curriculo.telefone}
                  skills={curriculo.habilidades}
                  experiencia={curriculo.experiencia}
                  formacao={curriculo.formacao}
                  compatibilidade={curriculo.compatibilidade}
                  resumocompatibilidade={curriculo.resumocompatibilidade}
                  resumocandidato={curriculo.resumocandidato}
                />
              ))
            ) : (
              <p>Nenhum currículo encontrado</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="jobdetail-curriculo-upload">
            <label htmlFor="curriculo">Enviar Currículos:</label>
            <input
              type="file"
              name="curriculo"
              multiple
              {...register("curriculo")}
            />
          </div>
          <button type="submit" className="jobdetail-upload-button">
            Enviar Currículos
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
