import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // If user is logged in, get their role. Otherwise, null.
  const role = currentUser?.role || null;

  // Simple "Yes/No" helpers
  const isAdmin = role === 'admin';
  const isLabAssistant = role === 'lab_assistant';
  const isModerator = role === 'moderator';
  const isStudent = role === 'student';

  // The function you can use in your HTML
  // Example: hasRole(['admin', 'moderator'])
  const hasRole = (rolesArray) => rolesArray.includes(role);

  return (
    <RoleContext.Provider value={{ role, isAdmin, isModerator, hasRole , isLabAssistant, isStudent}}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);