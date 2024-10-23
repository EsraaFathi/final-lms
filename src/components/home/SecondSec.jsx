import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const SecondSec = () => {
  return (
    <div className=" bg-no-repeat bg-center mb-16">
      <div
        style={{ fontFamily: "Lamsa-font-Bold" }}
        className="font-bold md:mt-8 text-3xl sm:text-4xl md:text-6xl flex justify-center items-center text-center"
      >
        <img
          src="/images/why.webp"
          className="h-24 w-28 sm:h-32 sm:w-32 md:h-36 md:w-40 mr-4" // Adjusted sizes for responsiveness
          alt=""
        />

        <div className="text-right mb-5">
          <div className="flex pt-10 my-2">
            <span className="text-secondaryBG text-xl sm:text-4xl md:text-6xl">
              المعلم الأول
            </span>
            <span className="text-primaryBG text-xl sm:text-54l md:text-6xl">
              {""} ليه تختار
            </span>
          </div>
          <div className="flex justify-end">
            <div className="w-32 h-1 bg-primaryBG mb-2"></div>
          </div>
          <div className="flex justify-end">
            <div className="w-20 h-1 bg-secondaryBG mb-2"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 gap-1 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            // icon={LuFileSpreadsheet}
            backgroundImage="'/images/اختبارات شاملة.png'"
            image="/images/task_15591446.png"
            description="اختبارات شاملة …
تدريبات و امتحانات مستمرة عشان ندربك تحل ببساطة و سرعة من غير اي مشكلة"
            className="my-4 bg-[#D4CEE4] text-white text-2xl z-0 max-w-xs font-stroke mx-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            // icon={FaRegStar}
            backgroundImage="'/images/هتحس بالفرق.png'"
            image="/images/podium_16275752.png"
            className="bg-gradient-to-r from-primaryBG to-GreidentColor2 my-4 bg-cover bg-center bg-blend-overlay transform text-white scale-110 z-30 shadow-gray-500 shadow-lg max-w-xs mx-auto"
            // className="bg-gradient-to-r from-blue-500 to-purple-500 my-4 transform text-white scale-110 z-30 shadow-gray-500 shadow-lg max-w-xs mx-auto"
            description="هتحس بالفرق ..
خرّجنا أوائل جمهورية، وكل سنة بنثبت إن النجاح مش حظ، معانا هتكون من الأوائل لأننا مش بنعلّمك بس، إحنا بنأسسك للتميز!"
            // className=" bg-gradient-to-r from-primaryBG to-GreidentColor my-4 transform text-white scale-110 z-30 shadow-gray-500 shadow-lg max-w-xs mx-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card
            backgroundImage="'/images/دعم مستمر.png'"
            // icon={MdOutlineContactSupport}
            image="/images/support_17576947.png"
            description="دعم فني مستمر …
معاك فريق دعم متاح طول اليوم
علشان نساعدك تحل اي مشكلة تقابلك في اسرع وقت ممكن ."
            className="my-4 bg-[#D4CEE4] text-white z-0 max-w-xs font-stroke mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SecondSec;
