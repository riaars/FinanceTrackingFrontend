import React from "react";

function Settings() {
  const loggedInUser = localStorage.getItem("email");
  return (
    <div>
      <h1>Settings</h1>
      <p>email: {loggedInUser}</p>
    </div>
  );
}

export default Settings;
