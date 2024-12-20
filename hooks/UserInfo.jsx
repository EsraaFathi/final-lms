import { useState, useEffect } from "react";
import axiosInstance from "../src/axiosConfig/instance";

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [submitedExams, setSubmitedExams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data && response.data.user) {
          setUserDetails(response.data.user);
          setPurchasedCourses(response.data.user.purchasedCourses);
          setSubmitedExams(response.data.user.submitedExams);
          // console.log("user", response.data.user);
          // console.log("submitedExams HOOKKK", response.data.user.submitedExams);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchUserDetails();
    }
  }, [userId, token]);

  return { userDetails, purchasedCourses, submitedExams, error, loading };
};

export default useUserDetails;
