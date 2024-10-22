import { motion } from "framer-motion";
import CourseCard from "../../components/MyCourses/CourseCard";
import RecentCourses from "../../components/courseslist/RecentCourses";
import useUserDetails from "../../../hooks/UserInfo";
import "./../../App.css";
const MyCourses = () => {
  const { purchasedCourses } = useUserDetails();

  return (
    <motion.div className="pt-24 flex flex-col gap-8">
      <div className="my-8">
        <motion.div className="my flex flex-wrap justify-center items-center gap-6">
          {/* Left Image */}
          <img
            src="/images/courseD.webp"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-40 lg:w-40 mx-4"
            alt="Course Image"
          />

          {/* Center Text */}
          <div className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-secondaryBG text-center">
            كورساتي
          </div>

          {/* Right Image */}
          <img
            src="/images/courseD.webp"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-40 lg:w-40 mx-4"
            alt="Course Image"
          />
        </motion.div>

        <div className="m-5 flex justify-center">
          {purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {purchasedCourses.map((course) => {
                if (course.course) {
                  return (
                    <CourseCard
                      key={course.course._id}
                      CourseId={course.course._id}
                      course={course.course}
                    />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">لايوجد كورسات حتي الان</p>
          )}
        </div>
      </div>
      <RecentCourses />
    </motion.div>
  );
};

export default MyCourses;
