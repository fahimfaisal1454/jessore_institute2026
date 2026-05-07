import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { isAuthenticated, role } = useAuth();

  // Wait for auth check
  if (isAuthenticated === null) return null;

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}