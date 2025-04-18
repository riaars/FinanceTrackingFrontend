import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";
import Content from "../layout/Content";

function Settings() {
  const loggedInUser = localStorage.getItem("email");
  const { theme, toggleTheme } = useTheme();

  return (
    <Content title={"Settings"}>
      <div>
        <p>Email: {loggedInUser}</p>
        <div>
          Switch theme:
          <span onClick={toggleTheme} className="theme">
            {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
          </span>
        </div>
      </div>
    </Content>
  );
}

export default Settings;
