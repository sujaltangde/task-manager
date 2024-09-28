import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ProtectedRoute component for React Router v6
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
 

  // If not authenticated and accessing a protected route, redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
