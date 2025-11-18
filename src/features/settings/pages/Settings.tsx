import React, { useState } from "react";
import Content from "@/layout/Content";
import Account from "../ui/Account";
import Password from "./Password";

const options = ["Account", "Password", "Notification"];

function Settings() {
  const [view, setView] = useState("Account");

  return (
    <Content title={"Settings"}>
      <div>Manage your account settings and preferences</div>
      <div className="settings__container">
        <div className="settings__menus">
          {options.map((option) => (
            <button
              key={option}
              className={` ${
                view === option ? "filter-button active" : "filter-button"
              }`}
              onClick={() => setView(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="settings__content">
        {view === "Account" && <Account />}
        {view === "Password" && <Password />}
      </div>
      <div className="settings__container"></div>
    </Content>
  );
}

export default Settings;
