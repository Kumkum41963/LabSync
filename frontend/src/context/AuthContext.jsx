import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

// Create global auth context
const AuthContext = createContext(null);

// Provider component wrapping the entire app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const API = import.meta.env.VITE_BASE_URL;


  // Fetch user whenever so token changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authToken) {
        setCurrentUser(null);
        setIsLoadingAuth(false);
        return; // Exit fxn early if no logged-in user
      }

      try {
        const res = await axios.get(`${API}/auth/current-user`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCurrentUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Token validation failed:", err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
      } finally {
        // Stop showing loading spinner whether request succeeded or failed
        setIsLoadingAuth(false);
      }
    };

    fetchUserProfile();
  }, [authToken]);

  // handle login + store token n user
  const handleLogin = async (credentials) => {
    try {
      const res = await axios.post(`${API}/auth/login`, credentials);
      console.log('res from server back too client after login:', res)
      const { token, user } = res.data;
      console.log("token:", token);
      console.log("user:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthToken(token);
      setCurrentUser(user);

      console.log("successful login");
      console.log('actual stored user:', currentUser)
      console.log('token:', token)
      console.log('currentUser:', user)

      return user;
    } catch (err) {
      console.error("Login failed:", err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // handle signup + store token n user
  const handleSignup = async (credentials) => {
    try {
      const res = await axios.post(`${API}/auth/signup`, credentials);
      const { token, user } = res.data;
      console.log("token:", token);
      console.log("user:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
      setCurrentUser(user);

      console.log("successful signup");
      console.log('token:', token)
      console.log('currentUser:', user)

      return user;
    } catch (err) {
      console.error("Signup failed:", err.message);
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // Clear local storage and logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setCurrentUser(null);
  };

  return (
    // Everything inside "value" is accessible by other components
    // that use the useAuthContext() hook below.
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
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
