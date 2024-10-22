/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CourseCard from "../../components/MyCourses/CourseCard";
import axiosInstance from "../../axiosConfig/instance";

const CategoryCourse = ({ grade }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(grade);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/courses?classGrade=${grade}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [grade]);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:m-8 md:m-14 justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  my-11 m-5">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} CourseId={course._id} />
      ))}
    </div>
  );
};

export default CategoryCourse;
