import React from "react";
import "./modal.css"; // Certifique-se de que esse arquivo CSS existe

const Modal = ({ show, handleClose, aplicante }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
        <div className="modal-header">
          <h1>{aplicante.name}</h1>
          <h2>{aplicante.title}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-detail-item">
            <strong>Email:</strong>
            <span>{aplicante.email}</span>
          </div>
          <div className="modal-detail-item">
            <strong>Location:</strong>
            <span>{aplicante.location}</span>
          </div>
          <div className="modal-detail-item">
            <strong>Phone:</strong>
            <span>{aplicante.phone}</span>
          </div>
          <div className="modal-detail-item">
            <strong>Resumo:</strong>
            <p>{aplicante.resumo}</p>
          </div>
          <div className="modal-skills">
            <strong>Skills:</strong>
            {aplicante.skills.map((skill) => (
              <span key={skill} className="modal-skill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
