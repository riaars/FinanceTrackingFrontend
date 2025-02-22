import React from "react";
import { useNavigate } from "react-router-dom";
import * as PATH from "../config/Path";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <ul>
        <li
          className="sidebar-container__item"
          onClick={() => navigate(PATH.ADD_NEW_TRANSACTION)}
        >
          Add Transaction
        </li>
        <li className="sidebar-container__item">Transactions</li>
        <li className="sidebar-container__item">Dashboard</li>
        <li className="sidebar-container__item">Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
