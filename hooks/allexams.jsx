import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosConfig/instance";

const useExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get("/exams/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setExams(response.data.exams);
      } catch (err) {
        setError("Error fetching exams. Please try again.");
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [token]);

  return { exams, loading, error };
};

export default useExams;
