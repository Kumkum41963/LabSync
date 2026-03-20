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

  const saveSession = (data) => {
    console.log("[Auth] Saving session", data);
    console.log('how is data like in saving session:', data)
    storage.setToken(data.token);
    storage.setRole(data.user.role);
    storage.setUser(data.user);
    setCurrentUser(data.user);
  };

  const clearSession = () => {
    console.log("[Auth] Clearing session");
    storage.clearSession();
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
      if(err.respone) {
        const {status }= err.response
        if(status === 400 || status === 401) {
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
       console.error("Logout failed:", err.message);
      throw new Error(err.response?.data?.message || "Logout failed");
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
