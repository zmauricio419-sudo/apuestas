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

  return children;
}
