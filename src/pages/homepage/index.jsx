import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import JobCard from "../../components/jobcard";
import { useAuth } from "../../context/AuthContext";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Use userId from AuthContext

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log(userId);
      try {
        // Retrieve user data based on userId (assuming an API endpoint exists)
        const userResponse = await axios.get(
          `http://127.0.0.1:5000/get-user-by-id?id=${userId}`
        );
        const userData = userResponse.data;
        console.log(userId);
        console.log("User Data:", userData);

        // Retrieve job vacancy data
        const vagaResponse = await axios.get("http://127.0.0.1:5000/getvaga");
        setData(vagaResponse.data);
        console.log(vagaResponse.data);
      } catch (error) {
        console.error("Erro ao fazer requisição GET:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="homepage-container">
      <div className="sidebar">
        <Sidebar />
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

export default Homepage;
