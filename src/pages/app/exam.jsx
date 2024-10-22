import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useExamById from "../../../hooks/Exambyid";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [end, setEnd] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [examStartedAt, setExamStartedAt] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(0);
  const { isDarkTheme } = useTheme();

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
    if (examData?.duration && examStartedAt) {
      const durationInMs = examData.duration * 60 * 1000;
      const startTime = new Date(examStartedAt).getTime();
      const currentTime = Date.now();
      const timeLeft = startTime + durationInMs - currentTime;

      if (timeLeft > 0) {
        setRemainingTime(Math.floor(timeLeft / 1000));
        const timer = setInterval(() => {
          const newTimeLeft = startTime + durationInMs - Date.now();
          if (newTimeLeft <= 0) {
            clearInterval(timer);
            handleAutoSubmit();
          } else {
            setRemainingTime(Math.floor(newTimeLeft / 1000));
          }
        }, 1000);
        return () => clearInterval(timer);
      } else {
        handleAutoSubmit();
      }
    }
  }, [examData, examStartedAt]);

  const handleAutoSubmit = async () => {
    setTimeUp(true);
    localStorage.removeItem("examId");
    localStorage.removeItem("examStartedAt");
    const result = await submitAnswer(allAnswers);
    if (result) {
      setScore(result.score);
      setPercentage(result.percentage);
      setEnd(true);
      setShowResult(true);
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
      console.log(allAnswers);

      console.log(response.data);

      return response.data;
    } catch (err) {
      setApiError("An error occurred while submitting your answer.");
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    setTimeUp(false);
    if (allAnswers.length !== examData.question.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    const result = await submitAnswer();
    if (result) {
      setScore(result.score);
      setPercentage(result.percentage);
      setShowResult(true);
      setEnd(true);
      localStorage.removeItem("examId");
      localStorage.removeItem("examStartedAt");
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswers.length > 0) {
      setAllAnswers([...allAnswers, ...selectedAnswers]);
    }
    setSelectedAnswers([]);
    setShowResult(false);
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
      className={`min-h-screen pt-32 transition-all duration-300 ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-100"
      } py-12 px-4`}
    >
      <div
        className={`max-w-3xl mx-auto ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        } shadow-md rounded-lg overflow-hidden`}
      >
        {timeUp ? (
          <div className="text-center my-50">
            <h2 className="text-5xl font-bold text-red-600 mb-4">
              😒 وقت الامتحان انتهى!
            </h2>
            <p>تم تسليم الامتحان تلقائياً</p>
          </div>
        ) : (
          <>
            <div className="p-6">
              {!end && (
                <>
                  <div className="text-right mb-4 text-lg font-bold text-gray-700">
                    ⌚ مدة الامتحان : {examData.duration} دقيقة
                  </div>
                  <div className="text-right mb-4 text-lg font-bold text-gray-700">
                    👌 الوقت المتبقي: {formatTime(remainingTime)} دقيقة
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
                  <div
                    className="w-full mb-5 h-48 bg-cover bg-center cursor-pointer"
                    style={{
                      backgroundImage: `url('${
                        imageUrl || "/images/category.jpg"
                      }')`,
                      backgroundColor: imageUrl ? "transparent" : "#f0f0f0",
                    }}
                    title="Click to view full screen"
                  ></div>
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
                  {!end && (
                    <button
                      onClick={handleSubmit}
                      className="mt-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
                    >
                      تسليم الامتحان
                    </button>
                  )}
                </>
              )}
              {end && (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      😎 خلصت الامتحان اخيرا
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                      ✌️ الدرجه النهاييه بتاعتك هيا {score} من{" "}
                      {questions.length}
                    </p>
                    <p className="text-xl text-gray-700 mb-6">
                      {" "}
                      النسبه المئويه {percentage}{" "}
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;
