import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/auth/api";

const PrivateRoute = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("PrivateRoute user:", user);

  if (isLoading) return <p>Checking session…</p>;
  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
