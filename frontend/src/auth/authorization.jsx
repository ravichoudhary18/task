import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  if (user) {
    return <Navigate to="/task" replace />;
  }
  return children;
};
