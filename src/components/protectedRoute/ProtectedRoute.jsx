import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;
