// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import useExamById from "../../../hooks/Exambyid";
// import axiosInstance from "../../axiosConfig/instance";
// import { useTheme } from "../../ThemeProvider";

// const Exam = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [error, setError] = useState("");
//   const [apiError, setApiError] = useState("");

//   // Get the exam data from the hook
//   const examData = useExamById().exam;
//   const token = localStorage.getItem("token");

//   // Safely extract the secure_url from the current question
//   const imageUrl =
//     examData?.question[currentQuestion]?.questionImage?.secure_url || "";

//   // console.log(imageUrl);
//   if (!examData) {
//     return <div>Loading...</div>;
//   }

//   const questions = examData.question;

//   const handleAnswerSelect = (answer) => {
//     setError("");

//     if (selectedAnswers.includes(answer)) {
//       setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
//     } else {
//       setSelectedAnswers([...selectedAnswers, answer]); // Add to the array
//     }
//   };

//   // Function to submit the answer to the API
//   const submitAnswer = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `exams/${examData._id}/submit`,
//         { answers: selectedAnswers }, // Send the array of answers
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       setApiError("An error occurred while submitting your answer.");
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (selectedAnswers.length === 0) {
//       setError("Please select at least one answer before submitting.");
//       return;
//     }

//     const result = await submitAnswer();
//     if (result) {
//       setScore(result.score);
//       setShowResult(true);
//     }
//   };

//   const handleNextQuestion = () => {
//     setSelectedAnswers([]);
//     setShowResult(false);
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   const { isDarkTheme } = useTheme();

//   return (
//     <div
//       className={`min-h-screen pt-32
//     ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"}
//       py-12 px-4 sm:px-6 lg:px-8`}
//     >
//       <div
//         className={`max-w-3xl mx-auto ${
//           isDarkTheme ? "bg-gray-700" : "bg-gray-100"
//         } shadow-md rounded-lg overflow-hidden`}
//       >
//         <div className="p-6">
//           {currentQuestion < questions.length ? (
//             <div>
//               <h2 className="text-xl font-semibold text-[#6828C9] mb-4">
//                 السؤال {currentQuestion + 1} من {questions.length}
//               </h2>
//               <p className="text-lg text-gray-700 mb-6">
//                 {questions[currentQuestion].questionTitle}
//               </p>
//               {/* Image Section */}
//               <div
//                 className="w-full mb-5 h-48 bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url('${
//                     imageUrl || "/images/category.jpg"
//                   }')`,
//                   backgroundColor: imageUrl ? "transparent" : "#f0f0f0", // fallback color
//                 }}
//               ></div>
//               <div className="space-y-4">
//                 {Object.entries(questions[currentQuestion].options).map(
//                   ([key, answer]) => (
//                     <label
//                       key={key}
//                       className={`flex items-center p-4 rounded-lg transition-colors ${
//                         selectedAnswers.includes(key)
//                           ? "bg-blue-100 border-blue-500"
//                           : "bg-gray-50 border-gray-200 hover:bg-gray-100"
//                       } border-2 cursor-pointer`}
//                     >
//                       <input
//                         type="checkbox"
//                         name="answer"
//                         value={key}
//                         checked={selectedAnswers.includes(key)}
//                         onChange={() => handleAnswerSelect(key)}
//                         className="form-checkbox h-5 w-5 text-blue-600"
//                       />
//                       <span className="ml-2 text-gray-700">{answer}</span>
//                     </label>
//                   )
//                 )}
//               </div>
//               {error && <p className="text-red-500 mt-2">{error}</p>}
//               {apiError && <p className="text-red-500 mt-2">{apiError}</p>}{" "}
//               {/* Display API error */}
//               {!showResult ? (
//                 <button
//                   onClick={handleSubmit}
//                   className="mt-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                 >
//                   إرسال{" "}
//                 </button>
//               ) : (
//                 <div className="mt-6">
//                   <p
//                     className={`text-lg font-semibold ${
//                       selectedAnswers.includes(
//                         questions[currentQuestion].answer
//                       )
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {selectedAnswers.includes(
//                       questions[currentQuestion].answer
//                     ) ? (
//                       <>
//                         <FaCheckCircle className="inline-block mr-2" />
//                         إجابه صحيحه !
//                       </>
//                     ) : (
//                       <>
//                         <FaTimesCircle className="inline-block mr-2" />
//                         الاجابه الصح هيا : إجابه غلط !{" "}
//                         {questions[currentQuestion].answer}
//                       </>
//                     )}
//                   </p>
//                   <button
//                     onClick={handleNextQuestion}
//                     className="mt-4 w-full bg-gradient-to-r from-[#a368fa] to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     السؤال التالي
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 خلصت الامتحان اخيرا
//               </h2>
//               <p className="text-xl text-gray-700 mb-6">
//                 الدرجه : {score} من {questions.length}
//               </p>
//               <p className="text-lg text-gray-600">
//                 نسبه نجاحك: {((score / questions.length) * 100).toFixed(2)}%
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Exam;
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useExamById from "../../../hooks/Exambyid";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  // Get the exam data from the hook
  const examData = useExamById().exam;
  const token = localStorage.getItem("token");

  // Safely extract the secure_url from the current question
  const imageUrl =
    examData?.question[currentQuestion]?.questionImage?.secure_url || "";

  if (!examData) {
    return <div>Loading...</div>;
  }

  const questions = examData.question;

  const handleAnswerSelect = (answer) => {
    setError("");

    if (selectedAnswers.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
    } else {
      setSelectedAnswers([...selectedAnswers, answer]); // Add to the array
    }
  };

  // Function to submit the answer to the API
  const submitAnswer = async () => {
    try {
      const response = await axiosInstance.post(
        `exams/${examData._id}/submit`,
        { answers: selectedAnswers }, // Send the array of answers
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      setApiError("An error occurred while submitting your answer.");
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswers.length === 0) {
      setError("Please select at least one answer before submitting.");
      return;
    }

    const result = await submitAnswer();
    if (result) {
      setScore(result.score);
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswers([]);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const { isDarkTheme } = useTheme();

  const handleImageClick = () => {
    setIsImageFullScreen(true);
  };

  const closeModal = () => {
    setIsImageFullScreen(false);
  };

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
        <div className="p-6">
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
                        type="radio" // Changed to radio for single selection
                        name="answer"
                        value={key}
                        checked={selectedAnswers.includes(key)}
                        onChange={() => setSelectedAnswers([key])} // Select only one answer
                        className="form-radio h-5 w-5 text-yellow-100"
                      />
                      <span className="ml-2 text-gray-700">{answer}</span>
                    </label>
                  )
                )}
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {apiError && <p className="text-red-500 mt-2">{apiError}</p>}{" "}
              {/* Display API error */}
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full bg-gradient-to-r from-primaryBG to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  إرسال{" "}
                </button>
              ) : (
                <div className="mt-6">
                  <p
                    className={`text-lg font-semibold ${
                      selectedAnswers.includes(
                        questions[currentQuestion].answer
                      )
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedAnswers.includes(
                      questions[currentQuestion].answer
                    ) ? (
                      <>
                        <FaCheckCircle className="inline-block mr-2" />
                        إجابه صحيحه !
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="inline-block mr-2" />
                        الاجابه الصح هيا : إجابه غلط !{" "}
                        {questions[currentQuestion].answer}
                      </>
                    )}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-4 w-full bg-gradient-to-r from-[#a368fa] to-[#e0f485] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    السؤال التالي
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خلصت الامتحان اخيرا
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                الدرجه : {score} من {questions.length}
              </p>
              <p className="text-lg text-gray-600">
                نسبه نجاحك: {((score / questions.length) * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageFullScreen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <img
            src={imageUrl}
            alt="Question"
            className="max-w-full max-h-full rounded-lg"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      )}
    </div>
  );
};

export default Exam;
