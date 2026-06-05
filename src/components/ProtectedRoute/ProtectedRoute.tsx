import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext();

  console.log("🔒 ProtectedRoute - user:", user, "loading:", loading);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
