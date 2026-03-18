import React, { createContext, useContext, useEffect, useState } from "react"
import { storage } from "@/services/storage"
import { useAuth } from "./AuthContext"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(storage.getTheme())
    const { currentUser } = useAuth

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        storage.setTheme(theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)