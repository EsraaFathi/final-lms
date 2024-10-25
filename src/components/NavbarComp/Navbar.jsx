import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTheme } from "../../ThemeProvider";
import { HiOutlineLogin } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/auth";
import OverlayPortal from "../../layouts/OvarlayPortal";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setNav(false);
    }
  };

  return (
    <>
      {nav && <OverlayPortal onClick={handleOutsideClick} />}

      <div
        style={{ fontFamily: "Lamsa-font-Bold" }}
        className={`fixed top-0 left-0 right-0 z-[9999] bg-primaryBG flex justify-between items-center  m-4 mx-6 px-4 rounded-xl text-white   transition-colors duration-300 ${
          isDarkTheme ? "text-white" : ""
        }`}
      >
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-4 mx-5 ">
            {isAuthenticated ? (
              <Link to="/myprofile" className="flex">
                <img
                  src="/images/defaultperson.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <button
                  style={{ fontFamily: "Lamsa-font-Bold" }}
                  onClick={handleLogout}
                  className="font-bold text-xl text-secondaryBG px-4 py-2 rounded-md transition duration-300 animate-pulse hover:animate-none hover:shadow-md hover:shadow-GreidentColor"
                >
                  تسجيل خروج
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button
                    className={`font-bold flex px-4 text-xl py-1 rounded-md g transition duration-300 ml-4 transform ${
                      isDarkTheme
                        ? "bg-gray-700 text-secondaryBG hover:bg-gray-600 hover:shadow-gray-400 hover:shadow-md"
                        : "bg-white text-primaryBG  hover:shadow-xl hover:shadow-gray-800"
                    }`}
                  >
                    <p>أنشيء حسابك بسهوله </p>
                    <span className="pt-1 mx-2">
                      <HiOutlineLogin />
                    </span>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="font-bold text-xl text-secondaryBG px-4 py-2 rounded-md transition duration-300 animate-pulse hover:animate-none hover:shadow-lg hover:shadow-gray-500">
                    تسجيل دخول
                  </button>
                </Link>
              </>
            )}
          </div>

          <div onClick={handleNav} className="block md:hidden">
            {nav ? (
              <AiOutlineClose className="cursor-pointer" size={20} />
            ) : (
              <AiOutlineMenu className="cursor-pointer" size={35} />
            )}
          </div>
        </div>

        <ul
          className={`fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 ease-in-out duration-500 z-[9999]  ${
            nav
              ? isDarkTheme
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-black"
              : "left-[-100%]"
          }`}
        >
          <div className="p-4 flex justify-end">
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={handleNav}
            />
          </div>
          {isAuthenticated ? (
            <>
              <li className="p-4">
                <Link to="/myprofile" onClick={handleNav}>
                  <button className="bg-transparent text-primaryBG mb-4 px-4 py-2 rounded-md border border-primaryBG hover:bg-primaryBG hover:text-white hover:shadow-lg hover:shadow-gray-800 transition duration-300 ml-4 transform">
                    لوحة التحكم
                  </button>
                </Link>

                <Link to="/" onClick={handleNav}>
                  <button
                    onClick={handleLogout}
                    className="bg-transparent text-primaryBG px-4 py-2 rounded-md border border-primaryBG hover:bg-primaryBG hover:text-white hover:shadow-lg hover:shadow-gray-800 transition duration-300 ml-4 transform"
                  >
                    تسجيل خروج{" "}
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="p-4">
                <Link to="/login" onClick={handleNav}>
                  <button className="bg-transparent text-primaryBG px-4 py-2 rounded-md border border-primaryBG hover:bg-primaryBG hover:text-white hover:shadow-lg hover:shadow-gray-800 transition duration-300  transform">
                    تسجيل الدخول{" "}
                  </button>
                </Link>
              </li>
              <li className="p-4">
                <Link to="/register" onClick={handleNav}>
                  <button className="bg-primaryBG text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300 animate-pulse hover:animate-none hover:shadow-lg hover:shadow-purple-300">
                    إنشاء حساب
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center relative">
          {/* <DarkModeSwitcher /> */}
          <div className="mr-4 cursor-pointer" onClick={toggleTheme}>
            <img
              src="/images/Animation - 1729177991149.gif"
              alt="User"
              className="w-16 h-auto p relative z-10  md:w-20 lg:w-24"
            />
          </div>
          <Link to="/">
            <div className="mr-4">
              {/* <img
                src="/images/logoooo.png"
                alt="User"
                className="w-40 h-20 p-3 relative z-10"
              /> */}
              <img
                src="/images/logoooo.png"
                alt="User"
                className=" aspect-w-16 aspect-h-9 w-32 h-auto p-2 relative z-10  md:w-32 lg:w-40"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
