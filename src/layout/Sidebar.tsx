import React from "react";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul>
        <li className="sidebar-container__item">Dashboard</li>
        <li className="sidebar-container__item">Expense Tracking</li>
        <li className="sidebar-container__item">Income Tracking</li>
        <li className="sidebar-container__item">Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
