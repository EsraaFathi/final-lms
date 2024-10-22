/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";

const Card = ({
  image,
  description,
  className,
  backgroundImage,
  textColor,
}) => {
  return (
    <motion.div
      className={` max-w-sm rounded-2xl overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-4 py-4 ">
          {/* Optional Foreground Image Section */}
          {image && (
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <img
                src={image}
                alt="Card image"
                className="w-24 h-24 object-cover"
              />
            </motion.div>
          )}

          {/* Description Section */}
          <motion.div
            className="text-xl   text-center"
            style={{
              color: textColor,
              direction: "rtl",
              fontFamily: "Lamsa-font-Bold",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {description}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
