import { useTheme } from "../../ThemeProvider";

/* eslint-disable react/prop-types */
const CardDetials = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();

  return (
    <div className="text-right mt-20">
      <div
        className={`w-full rounded overflow-hidden   my-10  shadow-lg
          ${
            isDarkTheme
              ? "bg-gray-700 my-9 text-white rounded-lg"
              : "bg-GreidentColor my-9 text-gray-700 rounded-lg"
          }`}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{courseDetails.title}</div>
          {/* <div className="w-full h-1 bg-secondaryBG mb-2"></div>
          <div className="w-24 h-1  bg-primaryBG mb-2"></div> */}
          <div className="flex  justify-end">
            {/* <div className="w-24 h-1  bg-primaryBG mb-2"></div> */}
            <div className="w-1/2 h-1  bg-secondaryBG mb-2"></div>
          </div>
          <div className="flex  justify-end">
            <div className="w-1/4 h-1  bg-primaryBG mb-2"></div>
            {/* <div className="w-16 h-1  bg-secondaryBG mb-2"></div> */}
          </div>
          <p className="  text-right text-base">{courseDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetials;
