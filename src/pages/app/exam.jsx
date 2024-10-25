/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import useExamById from "../../../hooks/Exambyid";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import ImageWithFullscreen from "../../components/FullScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [end, setEnd] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false); // New state to track if the exam is submitted
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [examStartedAt, setExamStartedAt] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(0);
  const { isDarkTheme } = useTheme();

  const timerRef = useRef(null); // To store the timer reference
  const navigate = useNavigate();

  const { exam: examData } = useExamById();
  const token = localStorage.getItem("token");

  // Confirm before reload
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Auto-submit when reloading
  useEffect(() => {
    const handleUnload = async () => {
      await handleAutoSubmit();
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [allAnswers, examStartedAt]);

  // Timer for the exam
  useEffect(() => {
    if (examData?.duration && examStartedAt && !examSubmitted) {
      setTotalQuestions(examData.question.length);

      // Add examSubmitted to condition
      const durationInMs = examData.duration * 60 * 1000;
      const startTime = new Date(examStartedAt).getTime();
      const currentTime = Date.now();
      const timeLeft = startTime + durationInMs - currentTime;

      if (timeLeft > 0) {
        setRemainingTime(Math.floor(timeLeft / 1000));
        timerRef.current = setInterval(() => {
          const newTimeLeft = startTime + durationInMs - Date.now();
          if (newTimeLeft <= 0) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
          } else {
            setRemainingTime(Math.floor(newTimeLeft / 1000));
          }
        }, 1000);
        return () => clearInterval(timerRef.current);
      } else {
        handleAutoSubmit();
      }
    }
  }, [examData, examStartedAt, examSubmitted]);
  //

  // Stop the timer if user submits early
  const handleSubmit = async () => {
    if (allAnswers.length !== examData.question.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    clearInterval(timerRef.current); // Stop the timer when the user submits
    setExamSubmitted(true); // Mark the exam as submitted
    const result = await submitAnswer();
    if (result) {
      setScore(result.score);
      setPercentage(result.percentage);
      // console.log(result);
      setResultShow(true);
      setEnd(true);
      localStorage.removeItem("examId");
      localStorage.removeItem("examStartedAt");
    }
  };

  const handleAutoSubmit = async () => {
    if (!examSubmitted) {
      // Check if exam is already submitted
      setTimeUp(true);
      clearInterval(timerRef.current); // Stop the timer when time is up
      localStorage.removeItem("examId");
      localStorage.removeItem("examStartedAt");
      const result = await submitAnswer(allAnswers);
      if (result) {
        setScore(result.score);
        setPercentage(result.percentage);
        setEnd(true);
      }
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await axiosInstance.post(
        `exams/${examData._id}/submit`,
        {
          answers: allAnswers,
          startedAt: examStartedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      if (
        err?.response?.data?.message === "You have already submitted this exam"
      ) {
        // Correct 'err' reference
        toast.error("امتحنته قبل كده");
        // navigate(-1);
      } else {
        // Handle other errors
        toast.error("An error occurred while submitting the exam");
      }
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswers.length > 0) {
      setAllAnswers([...allAnswers, ...selectedAnswers]);
    }
    setSelectedAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const imageUrl =
    examData?.question[currentQuestion]?.questionImage?.secure_url || "";

  if (!examData) {
    return <div>Loading...</div>;
  }

  const questions = examData.question;

  return (
    <div
      style={{
        backgroundImage: "url('/images/background texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`min-h-screen pt-32 transition-all duration-300 ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-100"
      } py-12 px-4`}
    >
      <div
        className={`max-w-2xl mx-auto my-auto ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        } shadow-md rounded-lg overflow-hidden`}
      >
        {timeUp ? (
          <>
            <div className="flex flex-col justify-center items-center ">
              <div className="text-center my-52">
                <h2 className="text-5xl font-bold text-red-600 mb-4">
                  😒 وقت الامتحان انتهى
                </h2>
                <p>تم تسليم الامتحان تلقائياً</p>
              </div>
              <Link to="/">
                <button className="bg-gradient-to-r text-center from-GreidentColor2 to-secondaryBG shadow-md shadow-gray-800  text-white px-6 mb-5 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105  hover:shadow-gray-800 hover:shadow-md">
                  🪄 الصفحة الرئيسية{" "}
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="p-6">
              {!end && (
                <>
                  <div className=" flex-col gap-3 my-3">
                    <h1 className="text-center text-lg md:text-xl text-secondaryBG my-5 mb-10">
                      (العلم➗الوقت)✖️ الصبر🟰التفوق
                    </h1>
                    <div className="text-right mb-4 text-lg font-bold ">
                      ⌚ مدة الامتحان : {examData.duration} دقيقة
                    </div>
                    <div className="text-right mb-4 text-lg font-bold ">
                      👌 الوقت المتبقي: {formatTime(remainingTime)} دقيقة
                    </div>
                  </div>
                </>
              )}
              {currentQuestion < questions.length ? (
                <div>
                  <h2 className="text-xl font-semibold text-[#6828C9] mb-4">
                    السؤال {currentQuestion + 1} من {questions.length}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {questions[currentQuestion].questionTitle}
                  </p>

                  <div className="w-full mb-5 h-60 bg-cover bg-center cursor-pointer">
                    <ImageWithFullscreen
                      src={imageUrl || "/images/category.jpg"}
                      alt="Category Image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    {Object.entries(questions[currentQuestion].options).map(
                      ([key, answer]) => (
                        <label
                          key={key}
                          className={`flex items-center p-4 rounded-lg transition-colors ${
                            selectedAnswers.includes(key)
                              ? "bg-yellow-50 border-secondaryBG"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          } border-2 cursor-pointer`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={key}
                            checked={selectedAnswers.includes(key)}
                            onChange={() => setSelectedAnswers([key])}
                            className="form-radio h-5 w-5 text-yellow-100"
                          />
                          <span className="ml-2 text-gray-700">{answer}</span>
                        </label>
                      )
                    )}
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
                  <button
                    onClick={handleNextQuestion}
                    className="mt-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
                  >
                    السؤال التالي
                  </button>
                </div>
              ) : (
                <>
                  {!resultShow && (
                    <button
                      onClick={handleSubmit}
                      className="my-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
                    >
                      تسليم الامتحان👍
                    </button>
                  )}
                </>
              )}
              {resultShow && (
                <>
                  <div className="flex flex-col my-5 justify-center items-center gap-5">
                    <h2 className="md:text-3xl text-lg my-20 font-bold text-green-500">
                      ❤️ جاوبت على جميع الأسئلة
                    </h2>
                    <p className="md:text-2xl text-lg mb-4">
                      ✌️ الدرجة النهائية بتاعتك هيا {score} من
                      {questions.length}
                    </p>

                    <p className="md:text-2xl text-lg mb-4">
                      ⚡النسبة المئوية {percentage}
                    </p>

                    <p className="text-2xl  mb-4">
                      {totalQuestions}🟰عدد الأسئلة
                    </p>

                    <Link to="/">
                      <button className=" my-10 bg-gradient-to-r from-GreidentColor2 to-secondaryBG shadow-md shadow-gray-800  text-white px-6 mb-5 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105  hover:shadow-gray-800 hover:shadow-md">
                        {" "}
                        🪄 الصفحة الرئيسية{" "}
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Exam;
