import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { ROLE_PERMISSIONS } from "@/utils/rolePermissions"

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {

    const { user } = useAuth
    const [role, setRole] = useState(null)
    const [permissions, setPermissions] = useState({})

    // Mount the role everytime page loads (user changes: login, logout, signup)
    useEffect(() => {
        if (!user) {
            setRole(null)
            setPermissions({})
        } else {
            const userRole = user.role || "student"
            setRole(userRole)
            setPermissions(ROLE_PERMISSIONS[userRole] || {})
        }
    }, [user])

    // Helper to check if the current role has a given permission
    const hasPermission = (permissionKey) => {
        if (!permissions) return false;
        return permissions[permissionKey] || false
    }

    return (
        <RoleContext.Provider value={{ role, permissions, hasPermission }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => useContext(RoleContext)