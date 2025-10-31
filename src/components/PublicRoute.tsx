// routes/AlreadyLoggedInRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/auth/api";

export default function PublicRoute() {
  const { data: user, isLoading } = useMeQuery();

  if (isLoading) return <p>Checking session…</p>;

  // If user is logged in, redirect them elsewhere (e.g., dashboard)
  if (user) return <Navigate to="/" replace />;

  // Otherwise, allow access to login/register routes
  return <Outlet />;
}
