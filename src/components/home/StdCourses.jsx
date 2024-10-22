import React from "react";
import CourseCard from "../MyCourses/CourseCard";

const StdCourses = () => {
  return (
    <div className="my-8">
      <div
        style={{ fontFamily: "Jenine-DemiBold" }}
        className="font-bold mb-9 text-6xl text-[#6828C9] text-center "
      >
        كورساتي{" "}
      </div>
      <div className="m-5 flex justify-center">
        <CourseCard />
      </div>
    </div>
  );
};

export default StdCourses;
