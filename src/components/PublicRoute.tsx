// routes/AlreadyLoggedInRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMeQuery } from "../features/auth/api";
import * as PATH from "../config/Path";

export default function PublicRoute() {
  const { pathname } = useLocation();
  const isPublic = [
    PATH.LOGIN,
    PATH.RESET_PASSWORD,
    PATH.FORGOT_PASSWORD,
    PATH.SIGNUP,
  ].some((x) => pathname.startsWith(x));

  const { data: user, isLoading } = useMeQuery(undefined, { skip: isPublic });

  if (isLoading) return <p>Checking session…</p>;

  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}
