import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../ThemeProvider";
import { Link } from "react-router-dom";

const FirstSec = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className="container mx-auto mr-5 px-4 ">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Right Column */}
        <motion.div
          className="  container flex-1 w-full md:w-1/2 bg-cover bg-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src={
              isDarkTheme ? "/images/hero image.png" : "/images/hero image.png"
            }
            alt="Description"
            className="md:mt-10 md:p-14 p-5 hidden md:block  rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Left Column */}
        <motion.div
          className="w-full flex-1 justify-end  container md:mt-10 md:py-20 md:w-1/2 mb-8 md:mb-0 "
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex-col  justify-">
            {/* Adjust font size responsively for the large heading */}
            <h1 className="text-6xl  sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl text-right text-secondaryBG">
              أ/احمد
            </h1>
            <h1 className="text-6xl md:mr-20 sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl text-center md:text-center text-primaryBG">
              هديب
            </h1>
          </div>

          <div className="flex flex-col justify-end">
            <div className="my-10 flex justify-end">
              {/* Responsive font sizes for the subheading */}
              <h2 className="text-4xl sm:text-3xl md:text-6xl text-primaryBG text-center">
                متشيلش هم{" "}
                <span className="text-4xl sm:text-3xl md:text-6xl  text-secondaryBG">
                  الرياضة
                </span>
              </h2>
            </div>

            {/* Responsive divider */}
            <div className="flex justify-end">
              <div className="w-24 sm:w-28 md:w-72 h-1 bg-primaryBG mb-2"></div>
            </div>
          </div>

          <Link to="/myprofile">
            <div className="flex justify-center sm:justify-start my-6 md:my-16">
              {" "}
              <motion.button
                style={{ fontFamily: "Lamsa-font-Bold" }}
                className="flex bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  className="h-8 w-8 md:h-10 md:w-10"
                  src="/images/flag_4957085.png"
                  alt="Flag"
                />
                <span>! ابدأ رحلتك دلوقتي</span>
              </motion.button>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FirstSec;
