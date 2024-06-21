import React from "react";
import "./aplicantecard.css"; // Certifique-se de importar o arquivo CSS

function AplicanteCard({ name, title, email, location, phone, skills }) {
  return (
    <div className="aplicante-card">
      <div className="aplicante-card-header">
        <div className="aplicante-card-image">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="aplicante-card-info">
          <h1>{name}</h1>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="aplicante-card-details">
        <div className="aplicante-detail-item">
          <strong>Email:</strong>
          <span>{email}</span>
        </div>
        <div className="aplicante-detail-item">
          <strong>Location:</strong>
          <span>{location}</span>
        </div>
        <div className="aplicante-detail-item">
          <strong>Phone:</strong>
          <span>{phone}</span>
        </div>
        <div className="aplicante-detail-item">
          <strong>Title:</strong>
          <span>{title}</span>
        </div>
      </div>
      <div className="aplicante-card-skills">
        {skills.map((skill) => (
          <span key={skill} className="aplicante-skill">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AplicanteCard;
