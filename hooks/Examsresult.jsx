import { useEffect, useState } from "react";
import axiosInstance from "../src/axiosConfig/instance";

const useExamResults = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(`/exams/user/submited`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }); // Use axios instance
        const data = await response.data; // Access data directly
        setResults(data);
      } catch (error) {
        console.error("Error fetching exam results:", error);
      }
    };

    fetchResults();
  }, [token]);

  return results;
};

export default useExamResults;
