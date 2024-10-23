import React from "react";
import LoginForm from "../../components/auth/loginform";
import { useTheme } from "../../ThemeProvider";
// import { useTheme } from "../../components/ThemeProvider";

const Login = () => {
  const { isDarkTheme } = useTheme();

  return (
    <main
      className={`min-h-screen  justify-center flex flex-col lg:flex-row ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Left side - Image (hidden on mobile) */}
      <div className="bg-primaryBG pt-20 hidden lg:block lg:w-1/2 lg:h-screen relative overflow-hidden ">
        <img
          src="/images/ليك وحشة والله.png"
          alt="Register"
          className="w-full h-full pt-9 object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div
        className={`w-full lg:w-1/2 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } min-h-screen lg:h-screen overflow-y-auto flex justify-center items-center p-4 lg:p-12`}
      >
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
