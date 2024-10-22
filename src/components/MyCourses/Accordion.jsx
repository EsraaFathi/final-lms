/* eslint-disable react/prop-types */
import AccordionBasic from "./AccordionBasic";
import { useTheme } from "../../ThemeProvider";

const Accordion = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={
        isDarkTheme
          ? "bg-gray-700 mt-20 mb-10 rounded-lg"
          : "bg-GreidentColor mt-20 mb-10 rounded-lg"
      }
    >
      <AccordionBasic courseDetails={courseDetails} />
    </div>
  );
};

export default Accordion;
