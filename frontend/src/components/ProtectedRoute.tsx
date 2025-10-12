import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: Props) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
