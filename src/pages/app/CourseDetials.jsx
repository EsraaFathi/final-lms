import React from "react";
// import { useParams } from "react-router-dom";
import ShowSec from "../../components/MyCourses/ShowSec";
import { motion } from "framer-motion";
import Accordion from "../../components/MyCourses/Accordion";
import CardDetials from "../../components/MyCourses/CardDetials";
import useGetCourseById from "../../../hooks/CourseById";

const CourseDetials = () => {
  const { courseDetails, loading, error } = useGetCourseById();
  // console.log(courseDetails);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-24 p-5 text-right">
      <motion.div className="my flex flex-row justify-center items-center gap-6">
        {/* Image */}
        <img
          src="/images/courseD.webp"
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-40 lg:w-40 mx-4"
          alt="Course Image"
        />

        {/* Center Text */}
        <div className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-secondaryBG text-center">
          تفاصيل الكورس
        </div>
      </motion.div>

      <ShowSec courseDetails={courseDetails} />
      <CardDetials courseDetails={courseDetails} />
      <Accordion courseDetails={courseDetails} />
    </div>
  );
};

export default CourseDetials;
