import React from "react";
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

  return (
    <div className="job-card">
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
