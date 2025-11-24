import { AppMenus } from "@/utils/categoryIcons";
import React from "react";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const activeMenu = (menu_path: string) => {
    return location.pathname === menu_path ? "active" : "inherit";
  };

  const navigate = useNavigate();
  return (
    <div className="bottom-bar">
      <ul className="bottom-bar-menus">
        {AppMenus.map((menu) => (
          <li
            className={`bottom-bar-menu ${activeMenu(menu.path)}`}
            onClick={() => navigate(menu.path)}
          >
            {menu.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
