import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null; // wait for check

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}