import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosConfig/instance";

const useExamById = () => {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const examId = localStorage.getItem("examId"); // Retrieve examId from local storage

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axiosInstance.get(`/exams/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setExam(response.data.exam);
        console.log(response.data.exam);
      } catch (err) {
        setError("Error fetching exam details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchExam();
    }
  }, [examId, token]);

  return { exam, loading, error };
};

export default useExamById;
