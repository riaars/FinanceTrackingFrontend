import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import Theme from "@/components/Theme";

function Header() {
  return (
    <div className="header">
      <Theme />
      <IoIosNotifications />
      <FaUserCircle />
    </div>
  );
}

export default Header;
