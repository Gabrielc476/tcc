import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import AplicanteCard from "../../components/aplicantecard";
import Modal from "../../components/modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./jobdetails.css"; // Certifique-se de que esse arquivo CSS existe

const JobDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAplicante, setSelectedAplicante] = useState(null);
  const { register, handleSubmit } = useForm(); // Para lidar com o formulário de upload de currículos
  const [curriculos, setCurriculos] = useState([]); // Para armazenar os currículos reais do backend

  useEffect(() => {
    // Função para buscar currículos do backend
    const fetchCurriculos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/getcurriculos");
        setCurriculos(response.data); // Atualiza os currículos com os dados do backend
      } catch (error) {
        console.error("Erro ao buscar currículos:", error);
      }
    };

    fetchCurriculos(); // Chama a função ao montar o componente
  }, []);

  const handleCardClick = (aplicante) => {
    setSelectedAplicante(aplicante);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAplicante(null);
  };

  // Função para lidar com o envio dos currículos
  const onSubmit = (data) => {
    const formData = new FormData();

    // Adiciona vários currículos ao FormData
    if (data.curriculo.length > 0) {
      Array.from(data.curriculo).map((curriculo, index) => {
        formData.append(`curriculo${index}`, curriculo, curriculo.name);
      });
    }

    // Enviar currículos para o backend
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

  // Função para lidar com a seleção de arquivos múltiplos
  const handleFileChange = (e) => {
    console.log(e.target.files);
    setCurriculos(e.target.files); // Armazena os arquivos selecionados
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
            {curriculos.length > 0 ? (
              curriculos.map((curriculo, index) => (
                <AplicanteCard
                  key={index}
                  name={curriculo.nome}
                  email={curriculo.email}
                  phone={curriculo.telefone}
                  skills={curriculo.habilidades}
                  onClick={() => handleCardClick(curriculo)}
                />
              ))
            ) : (
              <p>Nenhum currículo encontrado</p>
            )}
          </div>
        </div>

        {/* Formulário de Upload de Currículos */}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="jobdetail-curriculo-upload">
            <label htmlFor="curriculo">Enviar Currículos:</label>
            <input
              type="file"
              name="curriculo"
              multiple
              onChange={handleFileChange} // Permite múltiplos arquivos
              {...register("curriculo")}
            />
          </div>
          <button type="submit" className="jobdetail-upload-button">
            Enviar Currículos
          </button>
        </form>
      </div>

      {selectedAplicante && (
        <Modal
          show={showModal}
          handleClose={closeModal}
          aplicante={selectedAplicante}
        />
      )}
    </div>
  );
};

export default JobDetails;
