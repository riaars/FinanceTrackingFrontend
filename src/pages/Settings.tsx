import React from "react";
import Button from "../components/Button";

function Settings() {
  const loggedInUser = localStorage.getItem("email");
  return (
    <div>
      <h1>Settings</h1>
      <p>email: {loggedInUser}</p>
      <Button title="Logout" className="action-button" />
    </div>
  );
}

export default Settings;
