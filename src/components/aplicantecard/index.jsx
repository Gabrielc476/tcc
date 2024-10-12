import React from "react";
import "./aplicantecard.css";

const AplicanteCard = ({ name, email, phone, skills, onClick }) => {
  return (
    <div className="aplicante-card" onClick={onClick}>
      <h3>{name}</h3>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Telefone:</strong> {phone}
      </p>
      <p>
        <strong>Habilidades:</strong> {skills.join(", ")}
      </p>
    </div>
  );
};

export default AplicanteCard;
