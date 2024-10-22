import { useParams } from "react-router-dom";
import CategoryCourse from "./CategoryCourse";
import { useTheme } from "../../ThemeProvider";

const GradeCoursesPage = () => {
  const { grade } = useParams();
  const { isDarkTheme } = useTheme();
  // console.log(grade);

  const gradeTitles = {
    "first grade": "الصف الاول الثانوي",
    "second grade": "الصف الثاني الثانوي",
    "third grade": "الصف الثالث الثانوي",
  };

  return (
    <>
      <div className=" pt-24  my-">
        <div className="flex justify-center">
          <img
            src="/images/categorygif.gif"
            className="h-36 w-40 mt-10 "
            alt=""
            // srcset=""
          />

          <div
            style={{ fontFamily: "Lamsa-font-Bold" }}
            className={`font-bold pt-10 text-3xl sm:text-3xl md:text-6xl lg:text-7xl text-center 
             ${
               isDarkTheme
                 ? "my-9 text-secondaryBG rounded-lg"
                 : "my-9 text-primaryBG rounded-lg"
             }`}
          >
            {gradeTitles[grade]}
          </div>
        </div>
        <CategoryCourse grade={grade} />
      </div>
    </>
  );
};

export default GradeCoursesPage;
