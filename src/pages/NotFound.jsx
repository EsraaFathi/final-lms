import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 text-center items-center flex  flex-col justify-center">
      <img
        className="w-2/5 h-2/6"
        src="/images/Oops! 404 Error with a broken robot-amico.png"
        alt=""
        // srcset=""
      />{" "}
      <Link to="/">
        <button className="bg-gradient-to-r from-GreidentColor2 to-secondaryBG shadow-md shadow-gray-500  text-white px-6 mb-5 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105  hover:shadow-gray-800 hover:shadow-md">
          {" "}
          🪄الصفحه الرئيسيه
        </button>
      </Link>
      {/* <button
        onClick={navigate(-1)}
        className="bg-gradient-to-r from-GreidentColor2 to-secondaryBG shadow-md shadow-gray-500  text-white px-6 mb-5 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105  hover:shadow-gray-800 hover:shadow-md"
      >
        {" "}
        الرجوع
      </button> */}
    </div>
  );
};

export default NotFound;
