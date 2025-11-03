import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { toggleTheme } from "../themeSlice";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.currentTheme);
  return (
    <div>
      <span onClick={() => dispatch(toggleTheme())} className="theme">
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
