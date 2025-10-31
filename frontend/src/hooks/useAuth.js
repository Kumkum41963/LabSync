import { useAuthContext } from "@/context/AuthContext";

// Cleaner way to use auth context inside any component
export const useAuth = () => {
  const {
    currentUser,
    authToken,
    isLoadingAuth,
    handleLogin,
    handleSignup,
    handleLogout,
    isAuthenticated,
  } = useAuthContext();

  return {
    currentUser,
    authToken,
    isLoadingAuth,
    handleLogin,
    handleSignup,
    handleLogout,
    isAuthenticated,
  };
};