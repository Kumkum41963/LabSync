import { useEffect, useState, useContext, createContext } from "react";
import { storage } from "@/services/storage";
import { api } from "@/services/api";

// Create global auth context
const AuthContext = createContext(null);

// Provider component wrapping the entire app
export const AuthProvider = ({ children }) => {

  // Store the current user in state if exists already
  const [currentUser, setCurrentUser] = useState(storage.getUser());
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [users, setUsers] = useState([]); // for a list of all users 

  const saveSession = (data) => {
    // Use the new token if provided, otherwise stick with the one we have
    const token = data.token || storage.getToken();
    const user = data.user;

    storage.setToken(token);
    storage.setRole(user.role);
    storage.setUser(user);
    setCurrentUser(user);
  };

  const clearSession = () => {
    console.log("[Auth] Clearing session");
    storage.clearLocalStorage();
    setCurrentUser(null);
  };

  // handle login + store token in user
  const handleLogin = async (formData) => {
    setIsLoadingAuth(true)
    try {
      console.log("[Auth] Login start", formData);
      const res = await api.auth.login(formData);
      saveSession(res.data);
      console.log("[Auth] Login success", res.data);
    } catch (err) {
      if (err.respone) {
        const { status } = err.response
        if (status === 400 || status === 401) {
          alert("Invalid Credentials")
        }
      }
      console.error("Login failed:", err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoadingAuth(false)
    }
  };

  // handle signup + store token n user
  const handleSignup = async (formData) => {
    setIsLoadingAuth(true)
    try {
      console.log("[Auth] Login start", formData);
      const res = await api.auth.signup(formData);
      saveSession(res.data);
      console.log("[Auth] Signup success", res.data);
    } catch (err) {
      console.error("Signup failed:", err.message);
      throw new Error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoadingAuth(false)
    }
  };

  // Clear local storage and logout
  const handleLogout = async () => {
    try {
      console.log("[Auth] Logout start");
      await api.auth.logout();
      clearSession();
      console.log("[Auth] Logout success");
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleUpdateRole = async (targetId, newRole) => {
    try {
      const res = await api.auth.updateRole(targetId, newRole);
      // If I edited myself, sync my local state
      if (res.data?.user && currentUser?.id === targetId) {
        saveSession({ user: res.data.user });
      }
      return res.data;
    } catch (err) {
      console.log('Error in updating role:', err.message);
      throw err;
    }
  };

  const handleUpdateSkills = async (targetId, newSkills) => {
    try {
      const res = await api.auth.updateSkills(targetId, newSkills);
      // If I edited myself, sync my local state
      if (res.data?.user && currentUser?.id === targetId) {
        saveSession({ user: res.data.user });
      }
      return res.data;
    } catch (err) {
      console.log('Error in updating skills:', err.message);
      throw err;
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await api.auth.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err.message);
    }
  };

  return (
    // Everything inside "value" is accessible by other components
    // that use the useAuthContext() hook below.
    <AuthContext.Provider
      value={{
        currentUser,
        isLoadingAuth,
        handleLogin,
        handleLogout,
        handleSignup,
        handleUpdateRole,
        handleUpdateSkills,
        fetchAllUsers,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
// This is a convenience function so that components can call useAuthContext()
// instead of useContext(AuthContext) directly.
export const useAuth = () => useContext(AuthContext);
