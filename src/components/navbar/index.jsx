import React from "react";

const Navbar = () => {
  return (
    <div className="container">
      <div className="search-container">
        <input type="text" placeholder="pesquise vagas" />
      </div>
      <div className="icones">
        <p>notificacoes</p>
        <p>perfil</p>
      </div>
    </div>
  );
};

export default Navbar;
