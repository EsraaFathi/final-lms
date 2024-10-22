import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("resetToken", token);
    }
  }, [token]);

  const storedToken = localStorage.getItem("resetToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("كلمات المرور غير متطابقة.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `users/reset/${storedToken}}`,
        {
          password: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "تم إعادة تعيين كلمة السر بنجاح.");
      localStorage.removeItem("resetToken");
    } catch (error) {
      setMessage("خطأ في إعادة تعيين كلمة السر. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/images/background texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          إعادة تعيين كلمة السر
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-right text-gray-700 mb-2"
              htmlFor="newPassword"
            >
              كلمة السر الجديدة
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-right text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              تأكيد كلمة السر
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white bg-gradient-to-r from-secondaryBG to-GreidentColor2 rounded hover:bg-primaryBG transition duration-200 ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "جاري التحميل..." : "إرسال كلمة السر الجديدة"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default NewPassword;
