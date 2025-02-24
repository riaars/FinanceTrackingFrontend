import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";

function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const sideMenus = [
    { title: "Dashboard", path: PATH.DASHBOARD },
    { title: "Add Transaction", path: PATH.ADD_NEW_TRANSACTION },
    { title: "Transaction", path: PATH.TRANSACTIONS },
    { title: "Settings", path: PATH.SETTINGS },
  ];

  const activeMenu = (menu_path: string) => {
    return location.pathname === menu_path ? "active" : "inherit";
  };

  return (
    <div className="sidebar-container">
      <ul>
        {sideMenus.map((sideMenu) => (
          <li
            className={`sidebar-container__item ${activeMenu(sideMenu.path)}`}
            onClick={() => navigate(sideMenu.path)}
          >
            {sideMenu.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
