import { useEffect, useState } from "react";

import axiosInstance from "../src/axiosConfig/instance";

const useFetchLessons = (courseId) => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get("/lessons/all/", {
          params: { courseId },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (
          response.data &&
          response.data.lessons &&
          Array.isArray(response.data.lessons)
        ) {
          setLessons(response.data.lessons);
        } else {
          setError("تنسيق البيانات من API غير صالح");
          setLessons([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (courseId) {
      fetchLessons();
    }
  }, [courseId, token]);

  return { lessons, error };
};

export default useFetchLessons;
