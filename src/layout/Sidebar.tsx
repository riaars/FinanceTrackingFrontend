import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";
import { MdMenu } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(false);

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
    <>
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
          {sideMenus.map((sideMenu) => (
            <li
              key={sideMenu.title}
              className={`sidebar-container__item ${activeMenu(sideMenu.path)}`}
              onClick={() => {
                setOpenSidebar(false);
                navigate(sideMenu.path);
              }}
            >
              {sideMenu.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
