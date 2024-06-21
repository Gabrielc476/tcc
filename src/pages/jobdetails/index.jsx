import React from "react";
import Sidebar from "../../components/sidebar";
import AplicanteCard from "../../components/aplicantecard";
import "./jobdetails.css"; // Certifique-se de que esse arquivo CSS existe

const JobDetails = () => {
  const aplicantes = {
    elegiveis: [
      {
        id: "1",
        name: "João Silva",
        title: "Front End Developer",
        email: "joao@gmail.com",
        location: "São Paulo",
        phone: "123456789",
        skills: ["React", "JavaScript"],
      },
      {
        id: "2",
        name: "Maria Souza",
        title: "Front End Developer",
        email: "maria@gmail.com",
        location: "Rio de Janeiro",
        phone: "987654321",
        skills: ["TypeScript", "CSS"],
      },
    ],
    desqualificados: [
      {
        id: "3",
        name: "Carlos Pereira",
        title: "Back End Developer",
        email: "carlos@gmail.com",
        location: "Belo Horizonte",
        phone: "456123789",
        skills: ["Node.js", "MongoDB"],
      },
    ],
    reaproveitados: [
      {
        id: "4",
        name: "Ana Lima",
        title: "Full Stack Developer",
        email: "ana@gmail.com",
        location: "Curitiba",
        phone: "789123456",
        skills: ["Python", "Django"],
      },
    ],
  };

  return (
    <div className="jobdetail-container">
      <div className="jobdetail-sidebar">
        <Sidebar />
      </div>
      <div className="jobdetail-content">
        <div className="jobdetail-categories">
          <div className="jobdetail-category">
            <h2>Elegíveis</h2>
            <div className="jobdetail-cards">
              {aplicantes.elegiveis.map((aplicante) => (
                <AplicanteCard key={aplicante.id} {...aplicante} />
              ))}
            </div>
          </div>
          <div className="jobdetail-category">
            <h2>Desqualificados</h2>
            <div className="jobdetail-cards">
              {aplicantes.desqualificados.map((aplicante) => (
                <AplicanteCard key={aplicante.id} {...aplicante} />
              ))}
            </div>
          </div>
          <div className="jobdetail-category">
            <h2>Reaproveitados</h2>
            <div className="jobdetail-cards">
              {aplicantes.reaproveitados.map((aplicante) => (
                <AplicanteCard key={aplicante.id} {...aplicante} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
