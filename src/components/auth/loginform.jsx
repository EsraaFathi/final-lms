import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { FaPhone, FaLock } from "react-icons/fa";
import { useTheme } from "../../ThemeProvider";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phoneRegExp = /^(010|011|012|015)\d{8}$/;
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "يجب إدخال رقم هاتف مصري صحيح")
      .required("يرجى إدخال رقم الهاتف"),
    password: Yup.string().required("يرجى إدخال كلمة المرور"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await dispatch(loginUser(values)).unwrap();
      toast.success("تم تسجيل الدخول بنجاح!");
      // console.log("Login successful", response);

      setTimeout(() => {
        navigate("/mycourses");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.response || error);
      toast.error("فشل تسجيل الدخول. يرجى التحقق من معلوماتك.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full ${isDarkTheme ? "bg-gray-800" : "bg-white"} max-w-md`}
    >
      <Formik
        initialValues={{ phoneNumber: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form
            className={`p-4 sm:p-8 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${
                isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
              }`}
            >
              تسجبل الدخول الي حسابك
            </h3>
            <p
              className={`${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              } mb-6 sm:mb-8 text-center text-sm sm:text-base`}
            >
              أدخل بياناتك بشكل صحيح
            </p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <InputField
                    name="phoneNumber"
                    type="text"
                    placeholder="رقم الهاتف"
                    icon={FaPhone}
                    value={values.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      handleChange({ target: { name: "phoneNumber", value } });
                    }}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <InputField
                    name="password"
                    type="password"
                    placeholder="كلمة السر"
                    icon={FaLock}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
              <button
                type="submit"
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="w-full bg-gradient-to-r from-primaryBG to-secondaryBG text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </div>
            <div className="mt-4  flex justify-between text-center">
              <Link
                to="/reset"
                className={`text-sm sm:text-base ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                نسيت كلمة السر؟
              </Link>
              <Link
                to="/register"
                className={`text-sm sm:text-base ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {" "}
                لسه معملتش حساب ؟
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default LoginForm;
