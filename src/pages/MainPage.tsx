import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Content from "../layout/Content";

function MainPage() {
  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default MainPage;
