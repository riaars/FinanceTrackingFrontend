import React, { useState } from "react";

import useTheme from "../hooks/useTheme";
import Content from "../layout/Content";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

function Settings() {
  const username = localStorage.getItem("username") || null;
  const email = localStorage.getItem("email") || null;

  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  const togglePasswordChange = () => {
    setOpenChangePasswordDialog((prev) => !prev);
  };
  return (
    <Content title={"Settings"}>
      <div>
        <h2>Profile</h2>
        <p>Username: {username}</p>
        <p>
          Email: <span className="link">{email} </span>{" "}
        </p>

        <button
          className="primary-button"
          onClick={() => setOpenChangePasswordDialog(true)}
        >
          Change password
        </button>
      </div>

      {openChangePasswordDialog && (
        <ChangePasswordDialog toggleDialog={togglePasswordChange} />
      )}
    </Content>
  );
}

export default Settings;
