/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaPlay, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import useUserDetails from "../../../hooks/UserInfo";
import { useTheme } from "../../ThemeProvider";
import useExamsByCourseId from "../../../hooks/CourseExams";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ParentAccordion = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();
  const { purchasedCourses, userDetails, submitedExams } = useUserDetails();
  const courseId = courseDetails._id;
  const { examData, error } = useExamsByCourseId(courseId);
  const hasPurchased = purchasedCourses.some(
    (course) => course.course._id === courseId
  );

  // // State to track if each exam is submitted or not
  const [submittedExamsStatus, setSubmittedExamsStatus] = useState({});

  // // Effect to check which exams are submitted
  useEffect(() => {
    // console.log("submitedExams", submitedExams);
    // console.log("examData", examData);

    if (Array.isArray(examData) && submitedExams.length > 0) {
      const status = {};

      // Extract the `exam` IDs from the `submitedExams` array
      const submittedExamIds = submitedExams.map(
        (submittedExam) => submittedExam.exam
      );

      examData.forEach((exam) => {
        console.log("Checking Exam ID:", exam._id);

        const isSubmitted = submittedExamIds.includes(exam._id);
        console.log("Is submitted:", isSubmitted);

        status[exam._id] = isSubmitted;
      });

      console.log("status", status);

      setSubmittedExamsStatus(status);
    }
  }, [examData, userDetails]);

  const accordionData = Array.isArray(examData)
    ? examData.map((exam) => {
        const examAlreadySubmitted = submittedExamsStatus[exam._id] || false;
        console.log(exam._id);

        return {
          title: exam.title,
          content: (
            <div>
              {/* <h3 className="font-bold text-3xl text-secondaryBG my-2">
                الامتحانات
              </h3> */}

              <div className="flex justify-end">
                <div className="w-24 h-1 bg-primaryBG mb-2"></div>
              </div>
              <div className="flex justify-end">
                <div className="w-16 h-1 bg-secondaryBG mb-2"></div>
              </div>

              {examData.length > 0 ? (
                <div key={exam._id} className="mb-4 flex flex-col">
                  <motion.p
                    className="font-medium mb-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {exam.title}
                  </motion.p>

                  {hasPurchased ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{
                        scale: 1.05,
                        color: "#15B7FF",
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {examAlreadySubmitted ? (
                        <Link
                          to={`/exam-notfound`}
                          className="flex flex-col items-center underline text-red-600 transition-colors duration-300"
                        >
                          <FaLock className="mb-1" />
                          <span>لقد قمت بتقديم هذا الامتحان من قبل</span>
                        </Link>
                      ) : (
                        // If not submitted, show the "فتح الامتحان" button
                        <Link
                          to={`/exam`}
                          className="flex flex-col items-center underline text-secondaryBG transition-colors duration-300"
                          onClick={() => {
                            localStorage.setItem(
                              "examStartedAt",
                              new Date().toISOString()
                            );
                            localStorage.setItem("examId", exam._id);
                          }}
                        >
                          <FaPlay className="mb-1" />
                          <span>فتح الامتحان</span>
                        </Link>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FaLock className="mb-1" />
                      <span>اشترك عشان تمتحن👌</span>
                    </div>
                  )}
                </div>
              ) : (
                <p>مفيش امتحانات لسه😊</p>
              )}
            </div>
          ),
        };
      })
    : [];

  return (
    <div className="container mx-auto p-4 text-right">
      <h1
        className={`mb-6 text-2xl font-bold   text-primaryBG  
           ${isDarkTheme ? " text-white" : " text-gray-700 "}`}
      >
        امتحانات الكورس
      </h1>
      <div className="flex  justify-end">
        <div className="w-1/2 h-1  bg-secondaryBG mb-2"></div>
      </div>
      <div className="flex  justify-end">
        <div className="w-1/4 h-1  bg-primaryBG mb-2"></div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {examData?.length > 0 ? (
        <NestedAccordion items={accordionData} />
      ) : (
        <p>مفيش امتحانات لسه😊</p>
      )}
    </div>
  );
};

export default ParentAccordion;
//
const AccordionItem = ({ title, children, isOpen, toggleAccordion }) => {
  return (
    <div className="mb-2 rounded-lg">
      <button
        className="flex w-full items-center justify-between  bg-gradient-to-r from-GreidentColor2 to-secondaryBG hover:bg-gradient-to-r hover:from-primaryBG hover:to-secondaryBG p-4 font-semibold rounded-md text-gray-100 "
        onClick={toggleAccordion}
      >
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        <span>
          <motion.div
            className=" flex gap-10 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <span className="text-right">{title}</span>

            <img
              src="/images/task_15591446.png"
              alt="Card image"
              className="w-8 h-8 object-cover"
            />
          </motion.div>
        </span>
      </button>
      {isOpen && <div className="text-right p-4">{children}</div>}
    </div>
  );
};
const NestedAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        >
          {item.content}
          {item.nestedItems && <NestedAccordion items={item.nestedItems} />}
        </AccordionItem>
      ))}
    </div>
  );
};
