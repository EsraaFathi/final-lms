import React from "react";
import Registerform from "../../components/auth/Registerform";
import { useTheme } from "../../ThemeProvider";

const Register = () => {
  const { isDarkTheme } = useTheme();

  return (
    <main
      className={`min-h-screen  justify-center flex flex-col lg:flex-row ${
        // className={`min-h-screen flex flex-col md:flex-row ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Left side - Image (hidden on mobile) */}
      {/* <div className="group rounded-lg h-[169px] w-[300px] overflow-hidden aspect-w-16 aspect-h-9"> */}

      <div className="bg-primaryBG  pt-20 hidden  lg:block lg:w-1/2 lg:h-screen relative overflow-hidden  ">
        {/* <div className="bg-primaryBG hidden   md:block md:w-1/2 relative overflow-hidden md:h-screen"> */}
        <img
          src="/images/مستني ايه_1 (1).png"
          alt="Login"
          className="pt-20 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Register Form */}
      <div
        className={`w-full lg:w-1/2  ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } min-h-screen md:h-screen overflow-y-auto flex justify-center items-center p-4 md:p-12`}
      >
        <Registerform />
      </div>
    </main>
  );
};

export default Register;
