import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

type UserRole = "admin" | "rider" | "worker";

type ProtectedRouteProps = {
  allowedRole: UserRole;
};

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  // get logged in user

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const user = useAuthStore((state) => state.user);

  // not logged in → home page
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // logged in but wrong role
  if (user.role !== allowedRole) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/" replace />;

      case "rider":
        return <Navigate to="/rider/dashboard" replace />;

      case "worker":
        return <Navigate to="/worker/dashboard" replace />;

      default:
        return <Navigate to="/auth/login" replace />;
    }
  }

  // correct role → allow access
  return <Outlet />;
};

export default ProtectedRoute;
