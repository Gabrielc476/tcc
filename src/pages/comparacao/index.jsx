import React, { useState, useEffect } from "react";
import axios from "axios";

const Comparacao = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getvaga")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao fazer requisição GET:", error);
      });
  }, []);

  return (
    <div>
      <h1>Comparação</h1>
      {data && (
        <div>
          <h2>Dados Recebidos:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Comparacao;
