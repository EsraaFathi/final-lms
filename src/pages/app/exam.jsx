import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useExamById from "../../../hooks/Exambyid";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [precentage, setPrecentage] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [end, setEnd] = useState(true);
  const [allAnswers, setAllAnswers] = useState([]); // New state to store all answers

  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [examStartedAt, setExamStartedAt] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(0); // New state for timer
  const { isDarkTheme } = useTheme();

  // Get the exam data from the hook
  const { exam: examData } = useExamById();
  const token = localStorage.getItem("token");

  // Handle page reload or exit confirmation
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your progress will be lost!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Automatically submit when leaving or reloading the page
  useEffect(() => {
    const handleUnload = async (event) => {
      await handleAutoSubmit();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [selectedAnswers, examStartedAt]);

  useEffect(() => {
    if (examData?.duration && examStartedAt) {
      const durationInMs = examData.duration * 60 * 1000; // Convert duration to milliseconds
      const startTime = new Date(examStartedAt).getTime();
      const currentTime = Date.now();
      const timeLeft = startTime + durationInMs - currentTime;

      if (timeLeft > 0) {
        setRemainingTime(Math.floor(timeLeft / 1000)); // Set the remaining time in seconds

        const timer = setInterval(() => {
          const newTimeLeft = startTime + durationInMs - Date.now();
          if (newTimeLeft <= 0) {
            clearInterval(timer);
            handleAutoSubmit();
          } else {
            setRemainingTime(Math.floor(newTimeLeft / 1000)); // Update the remaining time
          }
        }, 1000);

        return () => clearInterval(timer);
      } else {
        handleAutoSubmit();
      }
    }
  }, [examData, examStartedAt]);
  // AUTO SUBMIT WHEN RELOAD OT TIMEOUT

  const handleAutoSubmit = async () => {
    setTimeUp(true);
    localStorage.removeItem("examId");
    localStorage.removeItem("examStartedAt");
    const result = await submitAnswer(allAnswers); // Pass allAnswers instead of selectedAnswers
    if (result) {
      setScore(result.score);
      setPrecentage(result.percentage);
      setEnd(true);
      setShowResult(true);
    }
  };
  // FILL ANSWERSW
  const submitAnswer = async () => {
    try {
      const response = await axiosInstance.post(
        `exams/${examData._id}/submit`,
        {
          answers: selectedAnswers, // Use the passed answers parameter
          startedAt: examStartedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("answers", selectedAnswers);

      console.log("response submit answers", response.data);

      return response.data;
    } catch (err) {
      setApiError("An error occurred while submitting your answer.");
      console.error(err);
    }
  };
  // SUBMIT
  const handleSubmit = async () => {
    if (selectedAnswers.length === 0) {
      setError("Please select at least one answer before submitting.");
      return;
    }
    const result = await submitAnswer(allAnswers); // Pass allAnswers instead of selectedAnswers

    // const result = await submitAnswer();
    if (result) {
      setScore(result.score);
      setPrecentage(result.percentage);

      // setShowResult(true);
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
    // setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleImageClick = () => {
    setIsImageFullScreen(true);
  };

  const closeModal = () => {
    setIsImageFullScreen(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Safely extract the secure_url from the current question
  const imageUrl =
    examData?.question[currentQuestion]?.questionImage?.secure_url || "";

  if (!examData) {
    return <div>Loading...</div>;
  }

  const questions = examData.question;

  return (
    <div
      className={`min-h-screen pt-32 transition-all duration-300 ${
        isImageFullScreen ? "-lg" : ""
      }
      ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"}
      py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div
        className={`max-w-3xl mx-auto ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        } shadow-md rounded-lg overflow-hidden`}
      >
        {timeUp ? (
          <div className="text-center my-50">
            <h2 className="text-5xl font-bold text-red-600 mb-4">
              😒وقت الامتحان انتهى!
            </h2>
            <p>تم تسليم الامتحان تلقائياً</p>
          </div>
        ) : (
          <>
            <div className="p-6">
              {end && (
                <>
                  <div className="text-right mb-4 text-lg font-bold text-gray-700">
                    ⌚مدة الامتحان :{examData.duration} دقيقة
                  </div>
                  {/* Timer Display */}
                  <div className="text-right mb-4 text-lg font-bold text-gray-700">
                    👌 خد بالك الوقت المتبقي: {formatTime(remainingTime)} دقيقة
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
                  {/* Image Section */}
                  <div
                    id="question-image"
                    className="w-full mb-5 h-48 bg-cover bg-center cursor-pointer"
                    style={{
                      backgroundImage: `url('${
                        imageUrl || "/images/category.jpg"
                      }')`,
                      backgroundColor: imageUrl ? "transparent" : "#f0f0f0", // fallback color
                    }}
                    onClick={handleImageClick}
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
                  {apiError && (
                    <p className="text-red-500 mt-2">{apiError}</p>
                  )}{" "}
                  <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    إرسال{" "}
                  </button>
                  <div className="mt-6">
                    <button
                      onClick={handleNextQuestion}
                      className="mt-4 w-full bg-gradient-to-r from-GreidentColor2 to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      السؤال التالي
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    😎خلصت الامتحان اخيرا
                  </h2>
                  <p className="text-xl text-gray-700 mb-6">
                    ✌️الدرجه النهاييه بتاعتك هيا {score} من {questions.length}
                  </p>
                  <p className="text-xl text-gray-700 mb-6">
                    النسبه المئويه{precentage} ⚡
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;
