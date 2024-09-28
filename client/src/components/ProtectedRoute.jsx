import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ProtectedRoute component for React Router v6
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
