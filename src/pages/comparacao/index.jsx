import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import JobCard from "../../components/jobcard";

const Comparacao = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error
  const storedUsername = localStorage.getItem("username");
  let dados = [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true

      try {
        // Retrieve user data based on username (assuming an API endpoint exists)
        const userResponse = await axios.get(
          `http://127.0.0.1:5000/get-user-by-username?username=${storedUsername}`
        );
        const userData = userResponse.data;
        console.log("User Data:", userData); // Log retrieved user data

        // Assuming you want to use retrieved user data (modify as needed)
        const vagaResponse = await axios.get("http://127.0.0.1:5000/getvaga");
        setData(vagaResponse.data);
        console.log(vagaResponse.data); // Log retrieved job vacancy data (unchanged)
        dados = vagaResponse.data;
      } catch (error) {
        console.error("Erro ao fazer requisição GET:", error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
        console.log(dados); // Log job vacancy data (unchanged)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="vagas">
        {isLoading ? (
          <p>Carregando dados...</p>
        ) : error ? (
          <p>Erro ao carregar dados: {error.message}</p>
        ) : data ? (
          data.map((job) => <JobCard key={job.company} {...job} />)
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Comparacao;
