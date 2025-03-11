import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

function Settings() {
  const loggedInUser = localStorage.getItem("email");
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="page_title">Settings</div>
      <div>
        <p>Email: {loggedInUser}</p>
        <div>
          Switch theme:
          <span onClick={toggleTheme} className="theme">
            {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </span>
        </div>
      </div>
    </>
  );
}

export default Settings;
