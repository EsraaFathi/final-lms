import React from "react";
import LoginForm from "../../components/auth/loginform";
import { useTheme } from "../../ThemeProvider";
// import { useTheme } from "../../components/ThemeProvider";

const Login = () => {
  const { isDarkTheme } = useTheme();

  return (
    <main
      className={`min-h-screen flex flex-col md:flex-row ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Left side - Image (hidden on mobile) */}
      <div className="bg-primaryBG pt-20 hidden md:block md:w-1/2 relative overflow-hidden md:h-screen">
        <img
          src="/images/ليك وحشة والله.png"
          alt="Register"
          className="w-full h-full pt-9 object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div
        className={`w-full md:w-1/2 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } min-h-screen md:h-screen overflow-y-auto flex justify-center items-center p-4 md:p-12`}
      >
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
