/* eslint-disable react/prop-types */
import ExamAccordionBasic from "./ExamAccordionBasic";
import { useTheme } from "../../ThemeProvider";

const ExamAccordion = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`
           ${
             isDarkTheme
               ? "bg-gray-700 mt-20 mb-10 rounded-lg"
               : "bg-GreidentColor mt-20 mb-10 rounded-lg"
           }
        `}
    >
      <ExamAccordionBasic courseDetails={courseDetails} />
    </div>
  );
};

export default ExamAccordion;
