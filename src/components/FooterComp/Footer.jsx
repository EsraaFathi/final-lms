/* eslint-disable react/no-unknown-property */

import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import { useTheme } from "../../ThemeProvider";

const Footer = () => {
  const { isDarkTheme } = useTheme();

  return (
    // <footer
    //   className={`text-white ${
    //     isDarkTheme ? "bg-gray-800 text-white" : "bg-primaryBG text-white"
    //   } rtl transition-colors duration-300`}
    //   style={{
    //     backgroundImage: "url('/images/Final footer texture.png')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    //   <div className="container mx-auto p-5">
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       {/* Support Section */}
    //       <div className="flex flex-col items-center">
    //         <h5 className="uppercase mb-6 text-2xl font-bold">الدعم الفني</h5>
    //         <ul className="my-3">
    //           <a
    //             href="https://wa.me/01121139388"
    //             className="hover:underline text-xl"
    //           >
    //             <li className="flex items-center justify-center bg-GreidentColor hover:bg-white text-TextPrimaryColor rounded-lg p-2 w-full max-w-xs">
    //               <p className="mr-2">01121139388</p>
    //               <IoLogoWhatsapp size={30} />
    //             </li>
    //           </a>
    //         </ul>
    //         <div className="flex mt-5 text-GreidentColor gap-4">
    //           <a href="https://www.facebook.com/mrahmedhodeab">
    //             <FaFacebook size={30} className="hover:text-white" />
    //           </a>
    //           <a href="https://www.youtube.com/@mrahmedhodeab">
    //             <FaYoutube size={30} className="hover:text-white" />
    //           </a>
    //           <a href="https://www.instagram.com/mrahmedhodeab">
    //             <FaInstagram size={30} className="hover:text-white" />
    //           </a>
    //           <a href="https://t.me/mrahmedhodeab">
    //             <FaTelegram size={30} className="hover:text-white" />
    //           </a>
    //         </div>
    //       </div>

    //       {/* Logo Section */}
    //       <div className="flex flex-col items-center text-center">
    //         <img
    //           src="/images/لوجو فوتر.png"
    //           alt="logo"
    //           className="w-32 h-auto"
    //         />
    //         <p className="text-lg mt-3">
    //           خبرة 10 سنوات في تدريس مادة الرياضيات للثانوية العامة معد لأوائل
    //           الجمهوريه في مادة الرياضيات
    //         </p>
    //       </div>

    //       {/* Registration Methods Section */}
    //       <div className="flex flex-col items-center">
    //         <h5 className="uppercase mb-6 text-2xl font-bold">طرق التسجيل</h5>
    //         <ul className="w-full max-w-xs">
    //           <li className="mb-4 cursor-pointer bg-GreidentColor hover:bg-white text-TextPrimaryColor rounded-lg p-3">
    //             <Link to="/" className="hover:underline">
    //               شرح طريقه التسجيل علي الموقع
    //             </Link>
    //           </li>
    //           <li className="cursor-pointer bg-GreidentColor hover:bg-white text-TextPrimaryColor rounded-lg p-3">
    //             <Link to="/about" className="hover:underline">
    //               شرح طريقه التسجيل بالكود
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer
      className={` text-white ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-primaryBG text-white"
      } rtl transition-colors duration-300`}
      style={{
        // boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.3)",
        backgroundImage: "url('/images/Final footer texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="text-center mt-20 md:text-center flex flex-col justify-start items-center ">
            <h5 className="uppercase mb-6 text-4xl font-bold">الدعم الفني</h5>
            <ul className="my-3">
              <a
                href="https://wa.me/01121139388"
                className="hover:underline  text-xl"
              >
                <li className=" flex items-center w-44 cursor-pointer justify-center bg-GreidentColor   hover:bg-white text-TextPrimaryColor rounded-lg p-1">
                  <p className="">01121139388</p>
                  <IoLogoWhatsapp size={30} />
                </li>
              </a>
            </ul>
            <div className="flex mt-5 text-GreidentColor justify-center gap-4 md:justify-center">
              <a
                href="https://www.facebook.com/mrahmedhodeab"
                className={`${
                  isDarkTheme ? "hover:text-white" : "hover:text-white"
                } transition-colors duration-300`}
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.youtube.com/@mrahmedhodeab"
                className={`${
                  isDarkTheme ? "hover:text-white" : "hover:text-white"
                } transition-colors duration-300`}
              >
                <FaYoutube size={30} />
              </a>

              <a
                href="https://www.instagram.com/mrahmedhodeab"
                className={`${
                  isDarkTheme ? "hover:text-white" : "hover:text-white"
                } transition-colors duration-300`}
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://t.me/mrahmedhodeab"
                className={`${
                  isDarkTheme ? "hover:text-white" : "hover:text-white"
                } transition-colors duration-300`}
              >
                <FaTelegram size={30} />
              </a>
            </div>
          </div>

          <div className=" text-center w-full p-5 py-10 ">
            <img src="/images/لوجو فوتر.png" className="tl" alt="logo" />
            <p className="text-2xl mt-3">
              خبرة 10 سنوات في تدريس مادة الرياضيات للثانوية العامة معد لأوائل
              الجمهوريه في مادة الرياضيات
            </p>
          </div>

          <div className=" flex flex-col justify-start items-center  mt-20 md:text-center">
            <h5 className="uppercase mb-6 text-4xl font-bold">طرق التسجيل </h5>

            <ul>
              <li className="w-54 mb-4 cursor-pointer bg-GreidentColor shadow-lg  hover:bg-white text-TextPrimaryColor rounded-lg p-3">
                <Link
                  to="/"
                  className="hover:underline md:text-right text-center"
                >
                  شرح طريقه التسجيل علي الموقع
                </Link>
              </li>
              <li className="  w-54 cursor-pointer md:text-right text-center  mb-6 md:mb-0 bg-GreidentColor shadow-lg  hover:bg-white text-TextPrimaryColor rounded-lg p-3">
                <Link to="/about" className="hover:underline r">
                  شرح طريقه التسجيل بالكود{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className={`mt-10 w-full ${isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-[#f4f4f9] text-gray-300"} py-2 transition-colors duration-300`}>
        <div className="flex justify-around w-full items-center">© {new Date().getFullYear()} CamitAi جميع الحقوق محفوظة لشركة</div>
      </div> */}
    </footer>
  );
};

export default Footer;
