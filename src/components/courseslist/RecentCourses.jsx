import { useEffect } from "react";

import CourseCard from "../MyCourses/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { CoursesAction } from "../store/slices/courses";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const RecentCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(CoursesAction());
  }, [dispatch]);

  return (
    <div>
      <div
        className="my-8 flex md:mt-20 flex-col w-100 items-center justify-center"
        variants={itemVariants}
      >
        <div
          style={{ fontFamily: "Lamsa-font-Bold" }}
          className="font-bold md:mt-8 text-3xl sm:text-4xl md:text-6xl flex  md:flex-row justify-center items-center text-center px-4"
        >
          <img
            src="/images/recentcourses.webp"
            className="h-24 w-28 sm:h-24 sm:w-24 mb-4 md:mb-0 md:h-36 md:w-40"
            alt=""
          />

          <div className="text-right mb-5">
            <div className="flex pt-10 my-2">
              <span className="text-primaryBG text-3xl md:text-6xl sm:text-2xl">
                الكورسات
              </span>
              <span className="text-secondaryBG text-3xl md:text-6xl sm:text-2xl">
                أحدث
              </span>
            </div>

            <div className="flex justify-end">
              <div className="w-32 h-1 bg-primaryBG mb-2"></div>
            </div>
            <div className="flex justify-end">
              <div className="w-20 h-1 bg-secondaryBG mb-2"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-5">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              CourseId={course._id}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentCourses;
