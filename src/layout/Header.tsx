import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import Theme from "@/components/Theme";
import ThemeSwitcher from "@/features/theme/ui/ThemeSwitcher";

function Header() {
  return (
    <div className="header">
      <ThemeSwitcher />
      <IoIosNotifications />
      <FaUserCircle />
    </div>
  );
}

export default Header;
