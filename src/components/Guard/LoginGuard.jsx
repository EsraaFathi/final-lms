import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginGuard = ({ children }) => {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) ||
    !!localStorage.getItem("token"); // Check local storage

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default LoginGuard;
