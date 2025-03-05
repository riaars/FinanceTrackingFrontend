import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";
import { MdMenu } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoBarChartOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";

function Sidebar() {
  const loggedInUser = localStorage.getItem("username");

  const navigate = useNavigate();

  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(false);

  const sideMenus = [
    {
      title: "Dashboard",
      path: PATH.DASHBOARD,
      icon: <LuChartNoAxesColumnIncreasing />,
    },
    {
      title: "Transactions",
      path: PATH.TRANSACTIONS,
      icon: <AiOutlineTransaction />,
    },
    { title: "Settings", path: PATH.SETTINGS, icon: <LuSettings /> },
  ];

  const activeMenu = (menu_path: string) => {
    return location.pathname === menu_path ? "active" : "inherit";
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-collapse-menu"
        onClick={() => {
          setOpenSidebar(!openSidebar);
        }}
      >
        <MdMenu />
      </div>
      <div className={`sidebar-container ${openSidebar ? "open" : "close"}`}>
        <ul className={`sidebar-container__menu`}>
          <div className="sidebar-container__header">{loggedInUser}</div>
          {sideMenus.map((sideMenu) => (
            <li
              key={sideMenu.title}
              className={`sidebar-container__item ${activeMenu(sideMenu.path)}`}
              onClick={() => {
                setOpenSidebar(false);
                navigate(sideMenu.path);
              }}
            >
              {sideMenu.icon} {sideMenu.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
