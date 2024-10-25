/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Payment from "../payment/Payment";
import useUserDetails from "../../../hooks/UserInfo";

const CourseCard = ({ CourseId, course, className }) => {
  const navigate = useNavigate();
  const amount = course?.price || 0;
  const { purchasedCourses } = useUserDetails();
  // console.log(purchasedCourses);

  const imageUrl = course.image.secure_url;
  // console.log(course);

  const hasPurchased = purchasedCourses?.some(
    (purchasedCourse) => purchasedCourse?.course?._id === CourseId
  );

  const handleViewContent = () => {
    navigate(`/singlecourse/${CourseId}`);
  };
  //  "...." +
  const limitWords = (description, limit = 20) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") : description;
  };

  return (
    <div
      key={CourseId}
      // className={`w-[273px] sm:w-[320px] max-w-sm m-5 lg:w-[320px] ${className}`}
      className={` max-w-sm m-5  ${className}`}
    >
      {/* </div>  h-[192px] w-[341px] */}
      <div className="bg-GreidentColor rounded-xl p-4 flex flex-col  lg:flex lg:flex-col lg:items- relative">
        <div
          className="aspect-w-16 aspect-h-9 w-[256px] h-[144px] w-auto flex-none bg-cover rounded-lg text-center overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
          style={{
            backgroundImage: `url('${
              imageUrl || "/images/DA7f-ezgif.com-gif-maker.gif"
            }')`,
            backgroundColor: imageUrl ? "transparent" : "#f0f0f0",
          }}
          title="Course Image"
        ></div>

        <div
          className="mt-4 lg:mt-6 text-center lg:text-left w-full flex-grow overflow-hidden"
          style={{ maxHeight: "300px" }}
        >
          <div className="text-right flex justify-between items-center font-bold text-xl">
            {!hasPurchased && (
              <motion.button
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="flex bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-1 py-1 rounded-md text-sm m-2 transition-all duration-300 transform  "
              >
                جنيها
                <div className="bg-[#F8F8F8] text-gray-600 px-1 ml-2 rounded-md">
                  {course ? (course.isFree ? "مجاني" : course.price) : "N/A"}
                </div>
              </motion.button>
            )}
            <span className="text-right text-black bg-clip-text">
              {course && course.title
                ? course.title.length > 20
                  ? `${course.title.slice(0, 20)}... `
                  : course.title
                : "No Title Available"}
            </span>
          </div>
          <div className=" flex justify-end">
            <div className="w-1/2 h-1 flex justify-center bg-primaryBG mb-2"></div>
          </div>

          <p className="text-right mb-2 text-gray-500 text-lg">
            {course && course.classGrade
              ? course.classGrade === "third grade"
                ? "الصف الثالث الثانوي"
                : course.classGrade === "second grade"
                ? "الصف الثاني الثانوي"
                : course.classGrade === "first grade"
                ? "الصف الأول الثانوي"
                : "N/A"
              : "N/A"}
          </p>

          <p className="text-right text-base overflow-hidden max-h-20">
            <span className="bg-gradient-to-r text-gray-500 bg-clip-text">
              {course && course.description
                ? course.description.split(" ").length > 7
                  ? limitWords(course.description, 12)
                  : course.description
                : "No description available"}
            </span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-between mt-4 w-full">
          {hasPurchased ? (
            <>
              <motion.button
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-2 py-1 rounded-lg text-lg w-full md:w-auto transition-all duration-300 transform"
              >
                💥 تم الاشتراك
              </motion.button>
              <motion.button
                onClick={handleViewContent}
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="bg-GreidentColor border-2 border-primaryBG text-primaryBG hover:border-0 hover:bg-gradient-to-r from-primaryBG to-GreidentColor2 hover:text-white px-2 py-1 rounded-md text-lg w-full md:w-auto transition-all duration-300 transform"
              >
                محتوي الكورس
              </motion.button>
            </>
          ) : (
            <>
              <div className="w-full md:w-auto">
                <Payment courseId={CourseId} amount={amount} course={course} />
              </div>
              <motion.button
                onClick={handleViewContent}
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="bg-GreidentColor border-2 border-primaryBG text-primaryBG hover:border-0 hover:bg-gradient-to-r from-primaryBG to-GreidentColor2 hover:text-white px-2 py-1 rounded-md text-lg w-full md:w-auto transition-all duration-300 transform"
              >
                محتوي الكورس
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
