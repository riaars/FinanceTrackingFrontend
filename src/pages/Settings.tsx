import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators } from "../redux";
import { useDispatch } from "react-redux";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

function Settings() {
  const dispatch = useDispatch();
  const loggedInUser = localStorage.getItem("email");
  const { signOut } = bindActionCreators(authCreators, dispatch);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(PATH.LOGIN);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(PATH.LOGIN);
    }
  }, [navigate]);

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
        <Button
          title="Logout"
          className="primary-button"
          onClick={handleSignOut}
        />
      </div>
    </>
  );
}

export default Settings;
