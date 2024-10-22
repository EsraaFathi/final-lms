import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="pt-24 text-center items-center flex  flex-col justify-center">
      <img
        className="w-2/5 h-2/6"
        src="/images/oops-404-error-with-a-broken-robot-animate (1).svg"
        alt=""
        // srcset=""
      />{" "}
      <Link to="/">
        <button className="bg-gradient-to-r from-[#a368fa]  shadow-lg shadow-gray-800 to-[#8ccce8] text-white px-6 mb-5 py-1 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105  hover:shadow-gray-800 hover:shadow-xl">
          {" "}
          الصفحه الرئيسيه
        </button>
      </Link>
    </div>
  );
};

export default Error;
