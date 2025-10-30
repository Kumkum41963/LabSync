// src/utils/AppRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  ProtectedRoute: only allows access if user is logged in.
  RoleRoute: only allows access if logged in AND has one of allowed roles.
  We use <Outlet /> pattern with react-router v6 to wrap nested routes.
*/

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export const RoleRoute = ({ allowedRoles = [], redirectTo = "/" }) => {
  const { user } = useAuth();
  // if not logged in -> go to login
  if (!user) return <Navigate to="/login" replace />;
  // if role not allowed -> redirect to fallback
  if (!allowedRoles.includes(user.role)) return <Navigate to={redirectTo} replace />;
  // allowed -> render children (Outlet)
  return <Outlet />;
};
