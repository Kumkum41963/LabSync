import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/ui/Loader";

function CheckAuth({ children, allowedRoles }) {
  const location = useLocation();

  const { isAuthenticated, isLoadingAuth, currentUser } = useAuth();

  // loading state
  if (isLoadingAuth) {
    return <Loader/>
  }

  // authenticated check 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // role check
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default CheckAuth;
