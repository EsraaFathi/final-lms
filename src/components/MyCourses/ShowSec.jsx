/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import CardWithCounter from "./CardWithCounter";
import { RxVideo } from "react-icons/rx";
import { FaPoundSign } from "react-icons/fa";
import useUserDetails from "../../../hooks/UserInfo";
import Payment from "../payment/Payment";
import useFetchLessons from "../../../hooks/useFetchLessons";
import { useTheme } from "../../ThemeProvider";
import { GrValidate } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";

const ShowSec = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();
  // console.log(courseDetails);

  const imageUrl = courseDetails.image.secure_url;
  // console.log(imageUrl);

  const { purchasedCourses } = useUserDetails();
  const courseId = courseDetails?._id;
  const amount = courseDetails?.price;
  const { lessons } = useFetchLessons(courseId);
  const hasPurchased = purchasedCourses?.some(
    (course) => course?.course?._id === courseId
  );
  const hasLessons = lessons && lessons.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="flex justify-center md:justify-end gap-4 md:gap-60">
          <div
            className={`font-bold mb-3 text-3xl  p-4 text-right
          ${isDarkTheme ? " text-secondaryBG" : " text-gray-700 "}`}
          >
            {courseDetails.title}
          </div>
        </div>

        <motion.div
          className="flex flex-col md:flex-row text-right justify-center items-center md:justify-end gap-24 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* card */}
          <div className="hidden md:block">
            <div
              className={`w-full h-72 flex flex-col justify-center items-center gap-2 p-4 rounded-md font-semibold  
    ${isDarkTheme ? "bg-gray-700" : "bg-yellow-50 text-primaryBG"}`}
            >
              {/* First Item (Course Duration) */}
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center items-center">
                  <button
                    style={{ fontFamily: "Lamsa-font-Bold" }}
                    className="flex w-30 mr-4 bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-1 py-1 rounded-md text-sm m-2 transition-all duration-300 transform"
                  >
                    ساعة
                    <div className="bg-[#F8F8F8] pl-2 text-gray-600 px-1 ml-2 rounded-md">
                      {courseDetails.duration}
                    </div>
                  </button>
                  <div className="flex items-center">
                    <p className="text-lg">مدة الكورس</p>
                    <RxVideo className="h-5 w-5 m-1" />
                  </div>
                </div>
                <div className="w-60 h-1 bg-gray-200"></div>
              </div>

              {/* Second Item (Last Updated Date) */}
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center items-center">
                  <button
                    style={{ fontFamily: "Lamsa-font-Bold" }}
                    className="flex mr-4 w-30 bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-1 py-1 rounded-md text-sm m-2 transition-all duration-300 transform"
                  >
                    <div className="bg-[#F8F8F8] text-gray-600 px-1 ml-2 rounded-md">
                      {new Date(courseDetails.updatedAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </div>
                  </button>
                  <div className="flex items-center">
                    <p className="text-lg">اخر تعديل</p>
                    <GrValidate className="h-5 w-5 m-1" />
                  </div>
                </div>
                <div className="w-60 h-1 bg-gray-200"></div>
              </div>

              {/* Third Item (Creation Date) */}
              <div className="w-full flex flex-col items-center">
                <div className="flex justify-center items-center">
                  <button
                    style={{ fontFamily: "Lamsa-font-Bold" }}
                    className=" mr-2 flex w-30 bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-1 py-1 rounded-md text-sm m-2 transition-all duration-300 transform"
                  >
                    <div className="bg-[#F8F8F8] text-gray-600 px-1 ml-2 rounded-md">
                      {new Date(courseDetails.createdAt).getDate() +
                        "/" +
                        (new Date(courseDetails.createdAt).getMonth() + 1) +
                        "/" +
                        new Date(courseDetails.createdAt).getFullYear()}
                    </div>
                  </button>
                  <div className="flex items-center">
                    <p className="text-lg">تاريخ الإنشاء</p>
                    <MdOutlineAccessTime className="h-5 w-5 m-1" />
                  </div>
                </div>
                <div className="w-60 h-1 bg-gray-200"></div>
              </div>
            </div>

            <div className="flex justify-center">
              {hasPurchased ? (
                hasLessons ? (
                  <motion.button
                    className="bg-gradient-to-r from-primaryBG to-GreidentColor2 m-5 w-full md:w-60 h-11 text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-700 hover:shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎇 شكرا علي اشتراكك
                  </motion.button>
                ) : (
                  <motion.button
                    className="bg-gradient-to-r from-primaryBG to-GreidentColor2 w-full m-5 md:w-60 h-11 text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-700 hover:shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎉 سيتم العرض قريبا
                  </motion.button>
                )
              ) : (
                <>
                  {hasLessons ? (
                    <motion.button
                      className="flex bg-gradient-to-r from-primaryBG to-GreidentColor2 m-5 md:ml-5 justify-center text-center w-full md:w-48 h-10 text-white px-2 py-1 rounded-md font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      جنيهًا 
                      <div className="bg-[#F8F8F8] text-gray-600 px-2 ml-2 rounded-md">
                        {courseDetails.price}
                      </div>
                    </motion.button>
                  ) : (
                    <motion.button
                      className="bg-gradient-to-r from-primaryBG to-GreidentColor2 w-full m-5 md:w-60 h-11 text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-700 hover:shadow-md"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🎉 سيتم العرض قريبا
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* photo */}

          <motion.div className="w-full md:w-2/3" variants={itemVariants}>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              <img
                src={`${imageUrl || "/images/category.jpg"}`}
                alt="Category"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="  flex flex-col md:flex-row  justify-center ">
          {hasPurchased ? (
            hasLessons ? (
              <motion.button
                className="bg-gradient-to-r from-GreidentColor2 to-secondaryBG w-full md:w-60 h-11   text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-700 hover:shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎇 شكرا علي اشتراكك
              </motion.button>
            ) : (
              <motion.button
                className="bg-gradient-to-r from-GreidentColor2 to-secondaryBG w-full md:w-60 h-11   text-white px-6 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gray-700 hover:shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎉 سيتم العرض قريبا
              </motion.button>
            )
          ) : (
            <>
              {hasLessons && (
                <div className="ml-14">
                  <Payment courseId={courseId} amount={amount} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowSec;
