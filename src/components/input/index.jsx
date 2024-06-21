import React from "react";
import "./Input.css"; // Certifique-se de que esse arquivo CSS existe

const Input = ({ nome, tipo, indice, register }) => {
  if (tipo === "experiencia") {
    return (
      <div className="cadastrovaga-input">
        <input
          type="text"
          placeholder="anos"
          name={`anos.${indice}`}
          {...register(`anos.${indice}`)}
          className="cadastrovaga-input-anos"
        />
        <p>anos de experiencia em: </p>
        <input
          type="text"
          placeholder="requerimento"
          name={`requerimento.${indice}`}
          {...register(`requerimento.${indice}`)}
          className="cadastrovaga-input-requerimento"
        />
      </div>
    );
  } else if (tipo === "conhecimento") {
    return (
      <div className="cadastrovaga-input">
        <p>Conhecimento em: </p>
        <input
          type="text"
          placeholder="descrição"
          name={`descricao.${indice}`}
          {...register(`descricao.${indice}`)}
          className="cadastrovaga-input-descricao"
        />
      </div>
    );
  } else if (tipo === "idioma") {
    return (
      <div className="cadastrovaga-input">
        <input
          type="text"
          placeholder="proficiencia"
          name={`proficiencia.${indice}`}
          {...register(`proficiencia.${indice}`)}
          className="cadastrovaga-input-proficiencia"
        />
        <p>em: </p>
        <input
          type="text"
          placeholder="idioma"
          name={`idioma.${indice}`}
          {...register(`idioma.${indice}`)}
          className="cadastrovaga-input-idioma"
        />
      </div>
    );
  } else if (tipo === "grau") {
    return (
      <div className="cadastrovaga-input">
        <input
          type="text"
          placeholder="curso"
          name={`curso.${indice}`}
          {...register(`curso.${indice}`)}
          className="cadastrovaga-input-curso"
        />
        <p>Situação: </p>
        <input
          type="text"
          placeholder="situação"
          name={`situação.${indice}`}
          {...register(`situação.${indice}`)}
          className="cadastrovaga-input-situacao"
        />
      </div>
    );
  }
};

export default Input;
