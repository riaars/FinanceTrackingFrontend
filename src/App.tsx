import Login from "@/features/auth/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "@/features/auth/pages/Signup";

import * as PATH from "@/config/Path";
import Sidebar from "@/layout/Sidebar";
import Header from "@/layout/Header";

import Transactions from "@/features/transaction/pages/Transactions";
import PrivateRoute from "@/components/PrivateRoute";
import React, { useEffect } from "react";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Settings from "@/features/settings/pages/Settings";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import PublicRoute from "@/components/PublicRoute";
import { useAppSelector } from "./app/hooks";

function App() {
  const theme = useAppSelector((s) => s.theme.currentTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="app">
        <Sidebar />
        <div className="content">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PATH.SIGNUP} element={<Signup />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.VERIFY_EMAIL} element={<VerifyEmail />} />
          <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path={PATH.DASHBOARD}
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path={PATH.TRANSACTIONS}
            element={
              <Layout>
                <Transactions />
              </Layout>
            }
          />
          <Route
            path={PATH.SETTINGS}
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;
