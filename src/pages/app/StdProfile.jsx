// export default StudentProfile;
import React, { useState, useEffect } from "react"; // Import useEffect
import { FaUser, FaBook, FaBell } from "react-icons/fa";
import { FaWallet, FaWandMagicSparkles } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";
import { useTheme } from "../../ThemeProvider";
import useUserDetails from "./../../../hooks/UserInfo";
import useExams from "../../../hooks/allexams";
import useExamResults from "../../../hooks/Examsresult";
import useUserPayments from "../../../hooks/mypayments";
import usePurchaseByCode from "../../../hooks/CodeCenter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentProfile = () => {
  const { isDarkTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(true);
  const [showExamsDetails, setShowExamsDetails] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showCodeCenter, setShowCodeCenter] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userDetails, purchasedCourses, error, loading } = useUserDetails();
  // const { exams, loading: examsLoading, error: examsError } = useExams();
  // console.log(userDetails);
  // const submitedExams = userDetails.submitedExams;
  const examResults = useExamResults();
  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
  } = useUserPayments();

  const {
    purchaseCode,
    loading: codeLoading,
    error: codeError,
    responseData,
  } = usePurchaseByCode();
  const [codeInput, setCodeInput] = useState("");

  const skills = [
    { name: "متوسط الكورسات اللي اشتريتها", level: 75 },
    { name: "متوسط الاختبارات اللي خلصتها", level: 85 },
    { name: "متوسط النتائج اللي جبتها", level: 70 },
  ];

  const Exams = [
    { name: "الدرس الاول", grade: 92, progress: 75 },
    { name: "الدرس الثاني ", grade: 88, progress: 80 },
    { name: "الدرس الثالث", grade: 85, progress: 60 },
    { name: "الدرس الرابع", grade: 90, progress: 70 },
  ];

  const chartData = {
    labels: Exams.map((exam) => exam.name),
    datasets: [
      {
        label: "النسبه",
        data: Exams.map((exam) => exam.grade),
        borderColor: "#e9ef7b",
        backgroundColor: "#9f6ceb",
        borderWidth: 1,
      },
      {
        label: "Progress",
        data: Exams.map((exam) => exam.progress),
        borderColor: "#9f6ceb",
        backgroundColor: "#e9ef7b",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "إحصائيات الدروس",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div
      className={`flex pt-24 text-center justify-center ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-100"
      }`}
      dir="rtl"
    >
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 ${
          isDarkTheme ? "bg-gray-700" : "bg-white"
        } shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar header */}
        <div
          className={`flex items-center mt-5 z-[1200]  justify-center h-12 rounded-lg ${
            isDarkTheme ? "bg-primaryBG" : "bg-primaryBG"
          }`}
        >
          <h2
            className={`text-2xl  font-extrabold ${
              isDarkTheme
                ? "text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG"
                : "text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG"
            }`}
          >
            لوحه التحكم
          </h2>
        </div>

        {/* Sidebar navigation */}
        <nav className="mt-5">
          <a
            href="#"
            className={`flex items-center px-6 py-2 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowUserDetails(true);
              setShowExamsDetails(false);
              setShowCodeCenter(false);
              setShowCourseDetails(false);
              setShowResults(false);
              setShowPayments(false);
            }}
          >
            <FaUser className="ml-3 text-secondaryBG" />
            ملف المستخدم
          </a>
          <a
            href="#"
            className={`flex items-center px-6 py-2 mt-5 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowCodeCenter(true);
              setShowUserDetails(false);
              setShowCourseDetails(false);
              setShowExamsDetails(false);
              setShowResults(false);
              setShowPayments(false);
            }}
          >
            <FaBell className="ml-3 text-secondaryBG" />
            أكواد السنتر
          </a>
          <a
            href="#"
            className={`flex items-center px-6 py-2 mt-5 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowUserDetails(false);
              setShowExamsDetails(false);
              setShowCodeCenter(false);
              setShowCourseDetails(true);
              setShowResults(false);
              setShowPayments(false);
            }}
          >
            <FaBook className="ml-3 text-secondaryBG" />
            كورساتي
          </a>

          {/* <a
            href="#"
            className={`flex items-center px-6 py-2 mt-5 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowExamsDetails(true);
              setShowCodeCenter(false);
              setShowCourseDetails(false);
              setShowUserDetails(false);
              setShowResults(false);
              setShowPayments(false);
            }}
          >
            <MdQuiz className="ml-3 text-secondaryBG" />
            الامتحانات
          </a> */}

          <a
            href="#"
            className={`flex items-center px-6 py-2 mt-5 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowResults(true);
              setShowExamsDetails(false);
              setShowCodeCenter(false);
              setShowCourseDetails(false);
              setShowUserDetails(false);
              setShowPayments(false);
            }}
          >
            <FaWandMagicSparkles className="ml-3 text-secondaryBG" />
            النتائج
          </a>

          <a
            href="#"
            className={`flex items-center px-6 py-2 mt-5 text-xl ${
              isDarkTheme
                ? "text-gray-300 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setShowPayments(true);
              setShowResults(false);
              setShowExamsDetails(false);
              setShowCodeCenter(false);
              setShowCourseDetails(false);
              setShowUserDetails(false);
            }}
          >
            <FaWallet className="ml-3 text-secondaryBG" />
            الفواتير
          </a>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            backgroundImage: "url('/images/background texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            backgroundImage: "url('/images/background texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-grow p-10 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}
        style={{
          backgroundImage: "url('/images/background texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          className="lg:hidden fixed  ml-5  top-4 left-4 z-[1200] mt-24 p-1 bg-gradient-to-r from-GreidentColor2 to-secondaryBG  text-white rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? "إغلاق" : "لوحه التحكم"}
        </button>
        {showUserDetails && userDetails ? ( // Check if userDetails is not null
          <div
            className={`grid text-center grid-cols-1 md:grid-cols-2 gap-10 ${
              isDarkTheme ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Student Info */}
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkTheme ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="md:flex items-center mb-6">
                <img
                  src="/images/defaultperson.jpg"
                  alt="student"
                  className="w-20 h-20 rounded-full ml-4"
                />
                <div>
                  <h2
                    className={`text-2xl font-semibold ${
                      isDarkTheme ? "text-gray-300" : "text-gray-15/90"
                    }`}
                  >
                    {`${userDetails.fName}  ${userDetails.lName}`}
                  </h2>
                  <p
                    className={`${
                      isDarkTheme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {userDetails.email}
                  </p>
                  <p
                    className={`${
                      isDarkTheme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {userDetails.classGrade || "N/A"}{" "}
                    {/* Default to "N/A" if classGrade is undefined */}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h3
                  className={`text-xl font-semibold ${
                    isDarkTheme ? "text-gray-300" : "text-gray-15/90"
                  } mb-4`}
                >
                  إحصائيات كورساتك
                </h3>
                {skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span
                        className={`${
                          isDarkTheme ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {skill.name}
                      </span>
                      {/* <span
                        className={`${
                          isDarkTheme ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {skill.level}%
                      </span> */}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-GreidentColor2 to-secondaryBG h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Statistics */}
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkTheme ? "bg-gray-700" : "bg-white"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-6 ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
              >
                إحصائيات الدروس
              </h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        ) : (
          <p
            className={`text-center ${
              isDarkTheme ? "text-gray-300" : "text-black"
            }`}
          >
            {/* جاري التحميل... */}
          </p>
        )}
        {/* COURSE Details */}
        {showCourseDetails && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-md ${
              isDarkTheme ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex justify-around">
              <h3
                className={`text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG mb-6 ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
                style={{ cursor: "pointer" }}
              >
                كورساتك اللي اشتركت فيها{" "}
              </h3>
              <Link to="/mycourses">
                <motion.button
                  className={`bg-gradient-to-r from-GreidentColor2 to-secondaryBG text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    isDarkTheme ? "text-gray-800" : "text-white"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  عرض كورساتك{" "}
                </motion.button>
              </Link>
            </div>

            {purchasedCourses.length > 0 ? ( // Check if there are purchased courses
              <div className="overflow-x-auto">
                <table
                  className={`w-full text-left ${
                    isDarkTheme ? "text-gray-300" : "text-black"
                  }`}
                  dir="rtl"
                >
                  <thead>
                    <tr
                      className={`${
                        isDarkTheme ? "bg-gray-600" : "bg-gray-100"
                      }`}
                    >
                      <th className="p-3 text-xl text-right">الكورس</th>
                      <th className="p-3 text-xl text-right">الصف الدراسي</th>
                      <th className="p-3 text-xl text-right">مده الكورس</th>
                      <th className="p-3 text-xl text-right">السعر</th>

                      <th className="p-3 text-xl text-right">تاريخ الدفع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedCourses.map((course, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3 text-right">
                          {course.course && course.course.title
                            ? course.course.title
                            : "تم الحذف"}
                        </td>{" "}
                        <td className="p-3 text-right">
                          {course.course && course.course.classGrade
                            ? course.course.classGrade
                            : "تم الحذف"}
                        </td>{" "}
                        <td className="p-3 text-right">
                          {course.course && course.course.duration
                            ? course.course.duration
                            : "تم الحذف"}
                        </td>{" "}
                        <td className="p-3 text-right">
                          {course.course && course.course.isFree ? (
                            <span className="text-green-500">مجاني</span> // Apply green text color
                          ) : course.course && course.course.price !== null ? (
                            `${course.course.price} EGP`
                          ) : (
                            "تم الحذف"
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {new Date(course.purchaseDate).toLocaleDateString()}
                        </td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p
                className={`text-center ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
              >
                لايوجد كورسات حتي الان{" "}
              </p>
            )}
          </div>
        )}
        {/* RESULTS */}
        {showResults && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-md ${
              isDarkTheme ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex justify-around">
              <h3
                className={`text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG mb-6 ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
                style={{ cursor: "pointer" }}
              >
                النتائج
              </h3>
            </div>
            {examResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table
                  className={`w-full text-left ${
                    isDarkTheme ? "text-gray-300" : "text-black"
                  }`}
                  dir="rtl"
                >
                  <thead>
                    <tr
                      className={`${
                        isDarkTheme ? "bg-gray-600" : "bg-gray-100"
                      }`}
                    >
                      <th className="p-3 text-xl text-right">العنوان</th>
                      <th className="p-3 text-xl text-right">النتيجة</th>
                      <th className="p-3 text-xl text-right">عدد الأسئلة</th>
                      <th className="p-3 text-xl text-right">النسبة المئوية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((result, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3 text-right">
                          {result?.exam?.title || "لا يوجد"}
                        </td>
                        <td className="p-3 text-center">{result.score}</td>
                        <td className="p-3 text-center">
                          {result.totalQuestions}
                        </td>
                        <td className="p-3 text-center text-green-600">
                          {result.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p
                className={`text-center ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
              >
                لايوجد نتايج حتي الان{" "}
              </p>
            )}
          </div>
        )}
        {/* EXAMS */}
        {/* {showExamsDetails && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-md ${
              isDarkTheme ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex justify-around">
              <h3
                className={`text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG mb-6 ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
                style={{ cursor: "pointer" }}
              >
                الامتحانات
              </h3>
            </div>
            {submitedExams.length > 0 ? (
              <div className="overflow-x-auto">
                <table
                  className={`w-full text-left ${
                    isDarkTheme ? "text-gray-300" : "text-black"
                  }`}
                  dir="rtl"
                >
                  <thead>
                    <tr
                      className={`${
                        isDarkTheme ? "bg-gray-600" : "bg-gray-100"
                      }`}
                    >
                      <th className="p-3 text-xl text-right">العنوان</th>
                      <th className="p-3 text-xl text-right">الكورس</th>
                      <th className="p-3 text-xl text-right">عدد الأسئلة</th>

                      <th className="p-3 text-xl text-right">الدرجة</th>
                      <th className="p-3 text-xl text-right">النسبة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submitedExams.map((exam, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3 text-right">
                          title exam
                        </td>

                        <td className="p-3 text-right">
                          title course
                    
                        </td>
                        <td className="p-3 text-right">
                          {exam.totalQuestions}
                          {new Date(exam.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">{exam.score} درجة</td>
                        <td className="p-3 text-green-400 text-right">
                          {exam.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p
                className={`text-center ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
              >
                لايوجد امتحانات حتي الان{" "}
              </p>
            )}
          </div>
        )} */}
        {/* Code Center */}
        {showCodeCenter && (
          <div>
            {/* Form Section */}
            <div
              className={`mt-10 p-6 rounded-lg shadow-md flex justify-center items-center ${
                isDarkTheme ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="w-full max-w-md">
                <h3
                  className={`text-2xl font-semibold mb-4 text-center ${
                    isDarkTheme ? "text-gray-300" : "text-black"
                  }`}
                >
                  لو كنت طالب سنتر :
                </h3>
                <form
                  className="flex flex-col my-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    try {
                      purchaseCode(codeInput);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <label
                    htmlFor="inputField"
                    className={`mb-10 text-lg text-center ${
                      isDarkTheme ? "text-gray-300" : "text-black"
                    }`}
                  >
                    اكتب الكود على كارت السنتر بتاعك هنا عشان تتفتح ليك باقي
                    محاضرات السنتر بتاعتك
                  </label>
                  <input
                    type="text"
                    id="inputField"
                    value={codeInput} // Bind the input value to state
                    onChange={(e) => setCodeInput(e.target.value)} // Update state on input change
                    className={`p-2 border ${
                      isDarkTheme
                        ? "border-gray-600 bg-gray-700 text-gray-300"
                        : "border-gray-300 bg-white text-black"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-GreidentColor2`}
                    placeholder="اكتب هنا..."
                  />
                  <button
                    type="submit"
                    className={`mt-4 bg-gradient-to-r from-GreidentColor2 to-secondaryBG text-white p-2 rounded-md hover:bg-[#7a5bc4] ${
                      isDarkTheme ? "text-gray-800" : "text-white"
                    }`}
                    disabled={codeLoading} // Disable button while loading
                  >
                    {codeLoading ? "جاري التحميل..." : "إرسال"}{" "}
                    {/* Show loading text */}
                  </button>
                </form>
                {codeError && (
                  <p className="text-red-500">{codeError.message}</p>
                )}{" "}
                {/* Show error message */}
                {responseData && (
                  <p className="text-green-500">{responseData.message}</p>
                )}{" "}
                {/* Show success message */}
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
          </div>
        )}
        {/* Payments */}
        {showPayments && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-md ${
              isDarkTheme ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="flex justify-around">
              <h3
                className={`text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-GreidentColor2 to-secondaryBG mb-6 ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
                style={{ cursor: "pointer" }}
              >
                تفاصيل المدفوعات
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table
                className={`w-full text-left ${
                  isDarkTheme ? "text-gray-300" : "text-black"
                }`}
                dir="rtl"
              >
                <thead>
                  <tr
                    className={`${isDarkTheme ? "bg-gray-600" : "bg-gray-100"}`}
                  >
                    <th className="p-3 text-xl text-right">رقم الفاتورة</th>
                    <th className="p-3 text-xl text-right">المبلغ</th>
                    <th className="p-3 text-xl text-right">طريقة الدفع</th>
                    <th className="p-3 text-xl text-right">الحالة</th>
                    <th className="p-3 text-xl text-right">تاريخ الدفع</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsLoading ? ( // Show loading state
                    <tr>
                      <td colSpan="5" className="text-center">
                        جاري التحميل...
                      </td>
                    </tr>
                  ) : paymentsError ? ( // Show error state
                    <tr>
                      <td colSpan="5" className="text-center">
                        خطأ في تحميل المدفوعات
                      </td>
                    </tr>
                  ) : payments.length > 0 ? ( // Show payment details
                    payments.map((payment, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3 text-right">{payment.invoiceId}</td>
                        <td className="p-3 text-right">
                          {payment.amount} {payment.currency}
                        </td>
                        <td className="p-3 text-right">
                          {payment.paymentMethod}
                        </td>
                        <td className="p-3 text-right">{payment.status}</td>
                        <td className="p-3 text-right">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    // No payments found
                    <tr>
                      <td colSpan="5" className="text-center">
                        لا توجد مدفوعات
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
