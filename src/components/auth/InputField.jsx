/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTheme } from "../../ThemeProvider";
// import { useTheme } from "../ThemeProvider";

// eslint-disable-next-line react/prop-types
const InputField = ({
  name,
  type,
  placeholder,
  className,
  icon: Icon,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkTheme } = useTheme();

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
          border 
          ${isFocused ? "border-secondaryBG  border-2" : "border-primaryBG"}
          ${
            isDarkTheme
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-white text-black placeholder-gray-500"
          }
          focus:outline-none focus:ring-1 focus:ring-secondaryBG
          ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {Icon && (
        <Icon
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
          }`}
        />
      )}
    </div>
  );
};

export default InputField;
