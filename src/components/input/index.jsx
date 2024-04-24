import React from "react";

const Input = ({ nome, tipo, indice, register }) => {
  if (tipo === "experiencia") {
    return (
      <div className="input">
        <input
          type="text"
          placeholder="anos"
          name={`anos.${indice}`}
          {...register(`anos.${indice}`)}
        />
        <p>anos de experiencia em: </p>
        <input
          type="text"
          placeholder="requerimento"
          name={`requerimento.${indice}`}
          {...register(`requerimento.${indice}`)}
        />
      </div>
    );
  } else if (tipo === "conhecimento") {
    return (
      <div className="input">
        <p>Conhecimento em: </p>
        <input
          type="text"
          placeholder="descrição"
          name={`descricao.${indice}`}
          {...register(`descricao.${indice}`)}
        />
      </div>
    );
  } else if (tipo === "idioma") {
    return (
      <div className="input">
        <input
          type="text"
          placeholder="proficiencia"
          name={`proficiencia.${indice}`}
          {...register(`proficiencia.${indice}`)}
        />
        <p>em: </p>
        <input
          type="text"
          placeholder="idioma"
          name={`idioma.${indice}`}
          {...register(`idioma.${indice}`)}
        />
      </div>
    );
  } else if (tipo === "grau") {
    return (
      <div className="input">
        <input
          type="text"
          placeholder="curso"
          name={`curso.${indice}`}
          {...register(`curso.${indice}`)}
        />
        <p>Situação: </p>
        <input
          type="text"
          placeholder="situação"
          name={`situação.${indice}`}
          {...register(`situação.${indice}`)}
        />
      </div>
    );
  }
};

export default Input;
