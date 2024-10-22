import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../src/axiosConfig/instance";

const usePurchaseByCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  const purchaseCode = async (code) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `courses/purchasebycode`,
        { code: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);

      navigate("/mycourses");
    } catch (err) {
      console.error("Error response:", err.response);
      setError(err.response ? translateErrorMessage(err.response.data) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const translateErrorMessage = (message) => {
    switch (message) {
      case "Course purchased successfully using code.":
        return "تم شراء الكورس بنجاح باستخدام الكود.";
      case "This code has already been used.":
        return "هذا الكود قد تم استخدامه بالفعل.";
      case "You are already enrolled in this course.":
        return "أنت مسجل بالفعل في هذه الكورس.";
      default:
        return message; // Return the original message if no translation is found
    }
  };

  return { purchaseCode, loading, error, responseData };
};

export default usePurchaseByCode;
