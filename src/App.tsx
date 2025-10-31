import Login from "@/features/auth/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "@/features/auth/pages/Signup";

import * as PATH from "@/config/Path";
import Sidebar from "@/layout/Sidebar";
import Header from "@/layout/Header";

import Transactions from "@/features/transaction/pages/Transactions";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import PrivateRoute from "@/components/PrivateRoute";
import React from "react";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import useTheme from "@/hooks/useTheme";
import Settings from "@/features/settings/pages/Settings";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import PublicRoute from "@/components/PublicRoute";

function App() {
  const { theme } = useTheme(); /**Move it later to redux**/

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
