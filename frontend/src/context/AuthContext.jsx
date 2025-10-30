import { useEffect, useState, useContext, createContext } from "react";
import useAxios from "@/hooks/useAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const axiosInstance = useAxios()
    const navigate = useNavigate();     // for redirecting after login/signup
    const [user, setUser] = useState(() => {
        // load user from localStorage if present (initial state)
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const [loading, setLoading] = useState(false)


    // SIGNUP: call backend register endpoint, save token & user on success
    const signup = async ({ name, email, password, role = "student" }) => {
        setLoading(true);
        try {
            // adjust endpoint to match your backend; common is POST /auth/register or /auth/signup
            const res = await axiosInstance.post("/auth/signup", { name, email, password, role });
            // backend should return { token, user }
            const { token, user: userObj } = res.data;

            // persist token & user locally
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userObj));

            // update context
            setUser(userObj);

            // success — redirect to dashboard or tickets
            navigate("/");

            return { success: true };
        } catch (err) {
            // return useful error message to caller
            const message = err.response?.data?.message || err.message || "Signup failed";
            console.error("Signup error at authContext:", message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // LOGIN: call backend login endpoint, save token & user on success
    const login = async (email, password) => {
        setLoading(true)

        try {
            const res = await axiosInstance.post("/auth/login", { email, password })
            const { token, user: userObj } = res.data;
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(userObj))
            setUser(userObj)
            navigate("/"); // redirect after login
            return { success: true }
        } catch (error) {
            const message = err.response?.data?.message || err.message || "Login failed";
            console.error("Login error:", message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading , signup}}>
            {children}
        </AuthContext.Provider>
    )

}

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);