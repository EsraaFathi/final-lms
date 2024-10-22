import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
} from "react-icons/fa";
import { useTheme } from "../../ThemeProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userAPI from "../../../hooks/api";
import { useState } from "react";

const RegisterForm = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const phoneRegExp = /^(010|011|012|015)\d{8}$/;

  const validationSchema = Yup.object().shape({
    fName: Yup.string()
      .min(3, "يجب أن يتكون الاسم الأول من 3 أحرف على الأقل")
      .max(10, "يجب ألا يزيد الاسم الأول عن 10 أحرف")
      .required("يرجى إدخال الاسم الأول"),
    lName: Yup.string()
      .min(3, "يجب أن يتكون الاسم الأخير من 3 أحرف على الأقل")
      .max(10, "يجب ألا يزيد الاسم الأخير عن 10 أحرف")
      .required("يرجى إدخال الاسم الأخير"),
    email: Yup.string()
      .email("يجب إدخال بريد إلكتروني صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "يجب إدخال رقم هاتف مصري صحيح")
      .required("يرجى إدخال رقم الهاتف"),
    parentPhoneNumber: Yup.string()
      .matches(phoneRegExp, "يجب إدخال رقم هاتف ولي الأمر بشكل صحيح")
      .required("يرجى إدخال رقم ولي الأمر"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم"
      )
      .required("يرجى إدخال كلمة المرور"),
    classGrade: Yup.string()
      .oneOf(
        ["first grade", "second grade", "third grade"],
        "يرجى اختيار الصف الدراسي"
      )
      .required("يرجى اختيار الصف الدراسي"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const { confirmPassword, ...dataToSubmit } = values;
      const response = await userAPI.signup(dataToSubmit);

      if (response && response.success) {
        toast.success(response.message || "تم تسجيل حسابك بنجاح!");
        navigate("/login");
      } else {
        throw new Error(
          response?.message || "حدث خطأ أثناء التسجيل. الرجاء المحاولة لاحقاً."
        );
      }
    } catch (error) {
      toast.error(
        "حدث خطأ أثناء تسجيل الحساب: " +
          (error.message || "الرجاء المحاولة لاحقاً.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full mt-28 ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      } max-w-md mx-auto p-4 sm:p-8`}
    >
      <Formik
        initialValues={{
          fName: "",
          lName: "",
          email: "",
          phoneNumber: "",
          parentPhoneNumber: "",
          password: "",
          classGrade: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} p-4`}>
            <h3
              style={{ fontFamily: "Lamsa-font-Bold" }}
              className={`${
                isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
              } text-2xl sm:text-3xl font-bold mb-4 text-center`}
            >
              أنشئ حسابك الآن
            </h3>

            <div className="space-y-4" style={{ fontFamily: "18-khebrat" }}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <InputField
                    name="lName"
                    type="text"
                    placeholder="الاسم الأخير"
                    icon={FaUser}
                    value={values.lName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="lName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <InputField
                    name="fName"
                    type="text"
                    placeholder="الاسم الأول"
                    icon={FaUser}
                    value={values.fName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="fName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
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
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <InputField
                    name="parentPhoneNumber"
                    type="text"
                    placeholder="رقم ولي الأمر"
                    icon={FaPhone}
                    value={values.parentPhoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      handleChange({
                        target: { name: "parentPhoneNumber", value },
                      });
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="parentPhoneNumber"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <InputField
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  icon={FaEnvelope}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="w-full">
                <InputField
                  name="password"
                  type="password"
                  placeholder="كلمة السر"
                  icon={FaLock}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="w-full">
                <div className="relative ">
                  <Field
                    as="select"
                    name="classGrade"
                    className={`w-full px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
        border shadow-[0_0_2px_rgba(168,85,247,0.6)]
        ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
        ${
          isDarkTheme
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-black placeholder-gray-500"
        }
        focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  >
                    <option value="">اختر الصف الدراسي</option>
                    <option value="first grade">الصف الأول الثانوي</option>
                    <option value="second grade">الصف الثاني الثانوي</option>
                    <option value="third grade">الصف الثالث الثانوي</option>
                  </Field>
                  <FaGraduationCap
                    style={{
                      top: "22px",
                      fontSize: "22px",
                      marginRight: "7px",
                    }}
                    className={`absolute right-3   transform -translate-y-1/2 ${
                      isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
                    }`}
                  />
                  <ErrorMessage
                    name="classGrade"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full  bg-gradient-to-r from-primaryBG to-secondaryBG text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? " ...جاري انشاء الحساب " : "إنشاء الحساب"}
              </button>
            </div>

            <div
              className={`mt-4 text-center ${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              } text-sm`}
            >
              هل لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                className={`${
                  isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
                } hover:text-secondaryBG font-semibold transition duration-300`}
              >
                تسجيل الدخول
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
