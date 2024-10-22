import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosConfig/instance";

const useExamsByCourseId = (courseId) => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // console.log("Fetching exams for courseId:", courseId);

    const fetchExams = async () => {
      if (!courseId) {
        setError("No CourseId provided");

        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        const response = await axiosInstance.get(`/exams/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            courseId, // Include courseId as a query parameter
          },
        });
        // if (response.data.success) {
        setExamData(response.data.exams);
        // console.log(response.data.exams); // For debugging purposes only
        // } else {
        //   throw new Error("Failed to fetch exams");
        // }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchExams();
    }
  }, [courseId, token]);

  return { examData, loading, error };
};

export default useExamsByCourseId;
