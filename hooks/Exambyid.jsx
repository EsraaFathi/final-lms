import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../src/axiosConfig/instance";

const useExamById = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axiosInstance.get(`exams/exams/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setExam(response.data.exam);
      } catch (err) {
        setError("Error fetching exam details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExam();
    }
  }, [id, token]);

  return { exam, loading, error };
};

export default useExamById;
