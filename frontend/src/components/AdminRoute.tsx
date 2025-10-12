import React from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData).user : null;

  // Si NO hay usuario o el rol NO es admin -> redirigir
  if (!user || user.rol !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Si es admin -> dejar pasar
  return children;
}
