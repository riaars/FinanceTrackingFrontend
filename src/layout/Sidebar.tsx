import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as PATH from "@/config/Path";
import Logo from "@/assets/images/logo.png";
import { MdMenu } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoIosRepeat } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { useLogoutMutation, useMeQuery } from "../features/auth/api";
import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";

function Sidebar() {
  const { data: user } = useMeQuery();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const location = useLocation();

  const [openSidebar, setOpenSidebar] = useState(false);

  const sideMenus = [
    {
      title: "Dashboard",
      path: PATH.DASHBOARD,
      icon: <RiDashboardLine />,
    },
    {
      title: "Transactions",
      path: PATH.TRANSACTIONS,
      icon: <AiOutlineTransaction />,
    },
    {
      title: "Budgets",
      path: PATH.BUDGETS,
      icon: <IoWalletOutline />,
    },
    {
      title: "Recurring",
      path: PATH.RECURRING,
      icon: <IoIosRepeat />,
    },
    { title: "Settings", path: PATH.SETTINGS, icon: <LuSettings /> },
  ];

  const handleSignOut = async () => {
    await logout().unwrap();
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
          <div className="auth__header">
            <Link to={PATH.DASHBOARD} className="auth__logo">
              <img className="logo__icon" src={Logo} />
              <h3>Trexo</h3>
            </Link>
          </div>
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

        <div>
          <ul className="sidebar-container__item">
            <li>
              <div className="sidebar__bottom">
                <span className="sidebar-container__username">
                  {user?.data.email}
                </span>
                <ThemeSwitcher />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
