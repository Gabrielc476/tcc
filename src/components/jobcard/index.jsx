import React from "react";
import { useNavigate } from "react-router-dom";
import "./jobcard.css";

const JobCard = ({ props }) => {
  const {
    _id,
    titulo,
    descricao,
    experiencias,
    conhecimentos,
    idiomas,
    formacao,
  } = props;

  const navigate = useNavigate();

  // Função para navegar e salvar o ID da vaga no localStorage
  const handleClick = () => {
    localStorage.setItem("jobId", _id); // Armazena o ID da vaga no localStorage
    navigate("/vaga"); // Navega para a página de detalhes da vaga
  };

  return (
    <div className="job-card" onClick={handleClick}>
      <div className="job-card-header">
        <div className="job-card-title">{titulo}</div>
      </div>
      <div className="job-card-details">
        <div className="job-card-detail-item">
          <strong>Descrição:</strong> {descricao}
        </div>
        <div className="job-card-detail-item">
          <strong>Experiências:</strong>{" "}
          {experiencias
            .map((exp) => `${exp.anos} anos em ${exp.requerimento}`)
            .join(", ")}
        </div>
        <div className="job-card-detail-item">
          <strong>Conhecimentos:</strong>{" "}
          {conhecimentos.map((con) => con.descricao).join(", ")}
        </div>
        <div className="job-card-detail-item">
          <strong>Idiomas:</strong>{" "}
          {idiomas
            .map((idioma) => `${idioma.idioma} (${idioma.proficiencia})`)
            .join(", ")}
        </div>
        <div className="job-card-detail-item">
          <strong>Formação:</strong>{" "}
          {formacao
            .map((form) => `${form.curso} (${form.situacao})`)
            .join(", ")}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
