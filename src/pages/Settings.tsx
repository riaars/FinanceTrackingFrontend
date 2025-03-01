import React, { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators } from "../redux";
import { useDispatch } from "react-redux";

function Settings() {
  const dispatch = useDispatch();
  const loggedInUser = localStorage.getItem("email");
  const { signOut } = bindActionCreators(authCreators, dispatch);

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
