import React from "react";
import "./styles.css";

const JobCard = ({
  titulo,
  descrição,
  experiencias,
  conhecimentos,
  idiomas,
  formação,
  onClick,
  ...props
}) => {
  return (
    <div className="job-card" {...props} onClick={onClick}>
      <div className="job-card-header">
        <div className="job-card-title">{titulo}</div>
      </div>
      <div className="job-card-details">
        <div className="job-card-detail-item">
          <strong>Descrição:</strong> {descrição}
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
          {formação
            .map((form) => `${form.curso} (${form.situacao})`)
            .join(", ")}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
