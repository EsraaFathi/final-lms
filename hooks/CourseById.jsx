import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../src/axiosConfig/instance";

const useGetCourseById = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { CourseId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!CourseId) {
        setError("No CourseId provided");

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/courses/${CourseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCourseDetails(response.data);
        console.log("setCourseDetails", response.data);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching course details"
        );
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [CourseId, token]);

  return { courseDetails, loading, error };
};

export default useGetCourseById;
