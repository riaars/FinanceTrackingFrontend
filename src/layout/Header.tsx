import React from "react";

function Header() {
  const loggedInUser = localStorage.getItem("username");
  return (
    <div className="header">
      <ul>
        <li className="header__item">{loggedInUser}</li>
      </ul>
    </div>
  );
}

export default Header;
