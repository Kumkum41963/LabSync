import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { storage } from "@/services/storage"

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {

    const { currentUser } = useAuth()
    const [role, setRole] = useState(storage.getRole())

    // Mount the role everytime page loads (user changes: login, logout, signup)
    useEffect(() => {
        if (!currentUser) {
            setRole(null)
        } else {
            setRole(storage.getRole())
        }
    }, [currentUser])

    const updateRole = (newRole) => {
        setRole(newRole)
        storage.setRole(newRole)
    }

    const hasRole = (allowedRoles = []) => {
        const res = allowedRoles.includes(role)
        return res
    }

    return (
        <RoleContext.Provider value={{ role, updateRole, hasRole }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => useContext(RoleContext)