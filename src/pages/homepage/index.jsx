import React, { useState, useEffect, useId } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import JobCard from "../../components/jobcard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Use userId from AuthContext
  const navigate = useNavigate();
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userResponse = await axios.get(
          `http://127.0.0.1:5000/get-user-by-id?id=${userId}`
        );
        const userData = userResponse.data;

        const vagaResponse = await axios.get(
          `http://127.0.0.1:5000/getvaga?id=${userId}`
        );
        const vagadata = Array.isArray(vagaResponse.data)
          ? vagaResponse.data
          : [vagaResponse.data];
        setData(vagadata); // Ensure data is always an array
        console.log(vagadata);
      } catch (error) {
        console.error("Erro ao fazer requisição GET:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
      console.log(data);
    }
  }, [userId]);

  return (
    <div className="homepage-container">
      <div className="homepage-sidebar">
        <Sidebar />
      </div>
      <div className="homepage-content">
        <button
          className="homepage-add-vaga-button"
          onClick={() => navigate("/userpage")}
        >
          Adicionar Vaga
        </button>
        <div className="homepage-vagas">
          {isLoading ? (
            <p>Carregando dados...</p>
          ) : error ? (
            <p>Erro ao carregar dados: {data.length}</p>
          ) : data.length > 0 ? (
            data.map((job) => <JobCard key={job._id} props={job} />)
          ) : (
            <p>Nenhum dado encontrado. {data.length}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
