/* eslint-disable react/prop-types */
import React from "react";

const CardWithCounter = ({
  courseDetails,
  title,
  count,
  Icon,
  text,
  content,
}) => {
  return (
    <>
      <div className="flex justify-around gap-3">
        <div className="flex justify-">
          <button
            style={{ fontFamily: "Lamsa-font-Bold" }}
            className="flex w-30 bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-1 py-1 rounded-md text-sm m-2 transition-all duration-300 transform"
          >
            {text}
            <div className="bg-[#F8F8F8] text-gray-600 px-1 ml-2 rounded-md">
              {title}
            </div>
          </button>
        </div>

        <div className="flex">
          <p className=" text-xl">{content}</p>
          {Icon && <Icon className="h-6 w-6  m-1" />}{" "}
        </div>
      </div>

      <div className="w-56 h-1  bg-gray-200 "></div>
    </>
  );
};

export default CardWithCounter;
