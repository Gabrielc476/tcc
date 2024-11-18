import React from "react";
import "./aplicantecard.css";

const AplicanteCard = ({
  name,
  email,
  phone,
  skills,
  experiencia,
  formacao,
  compatibilidade,
  resumocompatibilidade,
  resumocandidato,
}) => {
  return (
    <div className="aplicante-card">
      <div className="aplicante-card-content">
        <div className="aplicante-card-text">
          <div className="aplicante-card-header">
            <h3>{name}</h3>
          </div>
          <div className="aplicante-card-info">
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Telefone:</strong> {phone}
            </p>
            <p>
              <strong>Resumo da Compatibilidade:</strong>{" "}
              {resumocompatibilidade}
            </p>
            <p>
              <strong>Resumo do Candidato:</strong> {resumocandidato}
            </p>
          </div>
          <div className="aplicante-card-skills">
            <strong>Habilidades:</strong> {skills.join(", ")}
          </div>

          <div className="aplicante-experiencia">
            <strong>Experiência Profissional:</strong>
            {experiencia.map((exp, index) => (
              <p key={index} className="experiencia-item">
                <strong>Cargo:</strong> {exp.cargo}, <strong>Empresa:</strong>{" "}
                {exp.empresa}, <strong>Duração:</strong> {exp.duracao}
              </p>
            ))}
          </div>

          <div className="aplicante-formacao">
            <strong>Formação:</strong>
            {formacao.map((form, index) => (
              <p key={index} className="formacao-item">
                <strong>Curso:</strong> {form.curso},{" "}
                <strong>Instituição:</strong> {form.instituicao},{" "}
                <strong>Ano:</strong> {form.ano}
              </p>
            ))}
          </div>
        </div>

        <div className="compatibilidade-container">
          <div className="compatibilidade-circle">
            <span>{compatibilidade}%</span>
          </div>
          <p className="compatibilidade-title">Compatibilidade</p>
        </div>
      </div>
    </div>
  );
};

export default AplicanteCard;
