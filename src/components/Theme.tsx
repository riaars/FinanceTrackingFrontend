import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span onClick={toggleTheme} className="theme">
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </span>
    </div>
  );
};

export default Theme;
