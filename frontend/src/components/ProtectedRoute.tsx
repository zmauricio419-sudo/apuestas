import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: Props) {
  const user = localStorage.getItem("user"); // Aquí puedes guardar token o JSON con datos

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  export function AdminRoute({ children }: { children: JSX.Element }) {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "admin") {
    return <Navigate to="/dashboard" replace />; // redirige si no es admin
  }


  return children;
}
