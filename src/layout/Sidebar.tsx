import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";
import { MdMenu } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";

import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authCreators, State } from "../redux";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const loggedInUser = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(authCreators, dispatch);
  const { loginResponse, signOutResponse } = useSelector(
    (state: State) => state.auth
  );

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
    { title: "Logout", path: "", icon: <IoLogOutOutline /> },
  ];

  const handleSignOut = () => {
    signOut();
    navigate(PATH.LOGIN);
  };

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
                if (sideMenu.title === "Logout") {
                  handleSignOut();
                } else {
                  setOpenSidebar(false);
                  navigate(sideMenu.path);
                }
              }}
            >
              <div className="sidebar-container-icon">
                {sideMenu.icon} {sideMenu.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
