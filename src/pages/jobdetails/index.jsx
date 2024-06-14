import React from "react";
import Sidebar from "../../components/sidebar";
import AplicanteCard from "../../components/aplicantecard";
import "./styles.css"; // Certifique-se de que esse arquivo CSS existe

const JobDetails = () => {
  // Aqui você pode definir os aplicantes diretamente
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
    <div className="job-details-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="job-details">
        <div className="aplicantes-container">
          <div className="aplicantes-category">
            <h2>Elegíveis</h2>
            {aplicantes.elegiveis.map((aplicante) => (
              <AplicanteCard key={aplicante.id} {...aplicante} />
            ))}
          </div>
          <div className="aplicantes-category">
            <h2>Desqualificados</h2>
            {aplicantes.desqualificados.map((aplicante) => (
              <AplicanteCard key={aplicante.id} {...aplicante} />
            ))}
          </div>
          <div className="aplicantes-category">
            <h2>Reaproveitados</h2>
            {aplicantes.reaproveitados.map((aplicante) => (
              <AplicanteCard key={aplicante.id} {...aplicante} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
