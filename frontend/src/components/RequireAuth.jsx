import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated()) {
    // send to login (root) and keep attempted path in state
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
}
