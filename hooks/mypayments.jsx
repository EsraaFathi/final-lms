import { useEffect, useState } from "react";
import axiosInstance from "../src/axiosConfig/instance";
// import axiosInstance from "../src/axiosConfig/instance"; // Import the axios instance

const useUserPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get(`payments/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setPayments(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPayments();
    }
  }, [userId, token]);

  return { payments, loading, error };
};

export default useUserPayments;
