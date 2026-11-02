import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";

const AppLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Suspense fallback={<p>Loading…</p>}>
          <Outlet />
        </Suspense>
        <BottomBar />
      </div>
    </div>
  );
};

export default AppLayout;
