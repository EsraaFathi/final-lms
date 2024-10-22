import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/users/forget", { email }); // Use axiosInstance
      setMessage(response.data.message || "Check your email for a reset link.");
    } catch (error) {
      setMessage("Error sending reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`flex items-center justify-center h-screen 
        ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"}

    `}
      style={{
        backgroundImage: "url('/images/background texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={` p-8 rounded shadow-md w-96         ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        }
`}
      >
        <h2
          className={`text-2xl  font-bold mb-6 text-center  *:
          ${isDarkTheme ? "text-secondaryBG" : "text-primaryBG"}
          `}
        >
          إعاده تعيين كلمه السر
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block text-right  mb-2  text-gray-600`}
              htmlFor="email"
            >
              البريد الالكتروني{" "}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white bg-gradient-to-r from-secondaryBG to-GreidentColor2 rounded  transition duration-200 ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "جاري التحميل..." : "إرسال لينك التأكيد"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
