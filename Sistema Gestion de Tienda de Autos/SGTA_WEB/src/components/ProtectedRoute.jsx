import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) return <Navigate to="/" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
