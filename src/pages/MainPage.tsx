import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Content from "../layout/Content";
import { Route, Routes } from "react-router-dom";
import * as PATH from "../config/Path";
import AddTransaction from "./AddTransaction";

function MainPage() {
  return (
    <div className="app">
      {/* <div className="sidebar">
        <Sidebar />
      </div>
      <Header />
      <div className="content">
        <Routes>
          {<Route path={PATH.HOMEPAGE} element={<Content />} />}
          <Route path={PATH.ADD_NEW_TRANSACTION} element={<AddTransaction />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default MainPage;
