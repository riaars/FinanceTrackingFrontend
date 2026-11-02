import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as PATH from "@/config/Path";
import PrivateRoute from "@/components/PrivateRoute";
import PublicRoute from "@/components/PublicRoute";
import AppLayout from "@/layout/AppLayout";
import { useAppSelector } from "./app/hooks";

const Login = lazy(() => import("@/features/auth/pages/Login"));
const Signup = lazy(() => import("@/features/auth/pages/Signup"));
const VerifyEmail = lazy(() => import("@/features/auth/pages/VerifyEmail"));
const ForgotPassword = lazy(
  () => import("@/features/auth/pages/ForgotPassword")
);
const ResetPassword = lazy(() => import("@/features/auth/pages/ResetPassword"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard"));
const Transactions = lazy(
  () => import("@/features/transaction/pages/Transactions")
);
const Budgets = lazy(() => import("@/features/budgets/pages/Budgets"));
const Recurring = lazy(() => import("@/features/recurring/pages/Recurring"));
const Settings = lazy(() => import("@/features/settings/pages/Settings"));

function App() {
  const theme = useAppSelector((s) => s.theme.currentTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading…</p>}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={PATH.SIGNUP} element={<Signup />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.VERIFY_EMAIL} element={<VerifyEmail />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path={PATH.DASHBOARD} element={<Dashboard />} />
              <Route path={PATH.TRANSACTIONS} element={<Transactions />} />
              <Route path={PATH.BUDGETS} element={<Budgets />} />
              <Route path={PATH.RECURRING} element={<Recurring />} />
              <Route path={PATH.SETTINGS} element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
