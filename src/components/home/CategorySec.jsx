import YearCard from "./YearCard";
import { useNavigate } from "react-router-dom";

const CategorySec = () => {
  const navigate = useNavigate();

  const handleYearClick = (grade) => {
    navigate(`/courses/${grade}`);
  };

  return (
    <>
      <div className="my-8">
        <div
          style={{ fontFamily: "Lamsa-font-Bold" }}
          className="font-bold text-2xl sm:text-3xl md:text-6xl flex  md:flex-row justify-center items-center text-center px-4"
        >
          <img
            src="/images/chooseGradewebp.webp"
            className="h-24 w-24  md:h-42 md:w-40  md:pt-0"
            alt=""
          />
          <div className="text-right md:my-12 mb-10 pt-10 md:pt-0">
            <div className="flex my-2">
              <span className="text-primaryBG">...الدراسي</span>
              <span className="text-secondaryBG">اختار صفك</span>
            </div>
            <div className="flex justify-end">
              <div className="w-40 h-1 bg-secondaryBG mb-2"></div>
            </div>
            <div className="flex justify-end">
              <div className="w-32 h-1 bg-primaryBG mb-2"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  sm:m-8  justify-items-center">
          <YearCard
            imageSrc="/images/3 sec category.jpg"
            title="الصف الثالث الثانوي"
            courseText=" كورسات الصف الثالث الثانوي "
            onClick={() => handleYearClick("third grade")}
          />
          <YearCard
            imageSrc="/images/2 sec category.jpg"
            title="الصف الثاني الثانوي"
            courseText=" كورسات الصف الثاني الثانوي "
            onClick={() => handleYearClick("second grade")}
          />

          <YearCard
            imageSrc="/images/1 sec category.jpg"
            title="الصف الاول الثانوي"
            courseText=" كورسات الصف الاول الثانوي "
            onClick={() => handleYearClick("first grade")}
          />
        </div>
      </div>
    </>
  );
};

export default CategorySec;
