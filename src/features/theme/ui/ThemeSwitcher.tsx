import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { toggleTheme } from "../themeSlice";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.currentTheme);
  return (
    <div className="theme-switcher">
      <div
        onClick={() => dispatch(toggleTheme())}
        className={`theme ${theme === "dark" ? "active" : "inherit"}`}
      >
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </div>

      <div
        onClick={() => dispatch(toggleTheme())}
        className={`theme ${theme === "dark" ? "inherit" : "active"}`}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
