import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/ui/Loader";

function CheckAuth({ children, allowedRoles }) {
  const location = useLocation();

  const {
    isAuthenticated,
    currentUser,
  } = useAuth();

  console.log("1️⃣ CHECK AUTH:", {
    currentUser,
    isAuthenticated,
    role: currentUser?.role,
    allowedRoles,
  });

  if (!isAuthenticated) {
    console.log("2️⃣ REDIRECTING TO LOGIN");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser?.role)
  ) {
    console.log("3️⃣ REDIRECTING TO UNAUTHORIZED");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("4️⃣ AUTH PASSED — RENDERING CHILDREN");

  return children;
}

export default CheckAuth;
