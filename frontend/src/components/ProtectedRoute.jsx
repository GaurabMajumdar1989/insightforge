import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If AuthContext is still checking refresh token
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // Not logged in? Redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
