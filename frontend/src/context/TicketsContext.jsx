import React, { createContext, useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/context/RoleContext";
import { api } from "@/services/api";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { role } = useRole();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  // Fetch all tickets
  const getTickets = async () => {
    if (!currentUser) {
      console.warn("[Tickets] Fetch skipped: user not logged in");
      return { success: false, message: "User not logged in", data: null };
    }

    setLoading(true);

    try {
      const response = await api.tickets.getAllTickets();
      const ticketsList = response.data?.tickets || [];
      const paginationInfo = response.data?.pagination || null;

      setTickets(ticketsList);
      setPagination(paginationInfo);

      console.log("[Tickets] Loaded:", ticketsList.length);

      return {
        success: true,
        message: "Tickets fetched successfully",
        data: ticketsList,
      };
    } catch (error) {
      console.error("[Tickets] Fetch failed:", error);
      return {
        success: false,
        message: "Failed to fetch tickets",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Fetch single ticket
  const getTicketById = async (ticketId) => {
    if (!ticketId) {
      console.warn("[Ticket] Fetch skipped: ticketId missing");
      return { success: false, message: "Ticket ID is required", data: null };
    }

    setLoading(true);

    try {
      const response = await api.tickets.getTicketById(ticketId);
      const ticket = response.data?.ticket;

      console.log("[Ticket] Loaded:", ticketId);

      return {
        success: true,
        message: "Ticket fetched successfully",
        data: ticket,
      };
    } catch (error) {
      console.error("[Ticket] Fetch failed:", error);
      return {
        success: false,
        message: "Failed to fetch ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Create ticket
  const createTicket = async (ticketData) => {
    if (!ticketData) {
      console.warn("[CreateTicket] No data provided");
      return { success: false, message: "Ticket data is required", data: null };
    }

    setLoading(true);

    try {
      const response = await api.tickets.create(ticketData);
      const newTicket = response.data?.ticket;

      setTickets((prev) => [...prev, newTicket]);

      console.log("[CreateTicket] Created:", newTicket?._id);

      return {
        success: true,
        message: "Ticket created successfully",
        data: newTicket,
      };
    } catch (error) {
      console.error("[CreateTicket] Failed:", error);
      return {
        success: false,
        message: "Failed to create ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Update ticket
  const updateTicket = async (ticketId, updateData) => {
    if (!ticketId) {
      console.warn("[UpdateTicket] ticketId missing");
      return { success: false, message: "Ticket ID is required", data: null };
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      console.warn("[UpdateTicket] No update fields provided");
      return {
        success: false,
        message: "Update data must include at least one field",
        data: null,
      };
    }

    setLoading(true);

    try {
      const response = await api.tickets.update(ticketId, updateData);
      const updatedTicket = response.data?.updatedTicket;

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );

      console.log("[UpdateTicket] Updated:", ticketId);

      return {
        success: true,
        message: "Ticket updated successfully",
        data: updatedTicket,
      };
    } catch (error) {
      console.error("[UpdateTicket] Failed:", error);
      return {
        success: false,
        message: "Failed to update ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Delete ticket
  const deleteTicket = async (ticketId) => {
    if (!ticketId) {
      console.warn("[DeleteTicket] ticketId missing");
      return { success: false, message: "Ticket ID is required" };
    }

    setLoading(true);

    try {
      await api.tickets.delete(ticketId);

      setTickets((prev) => prev.filter((t) => t._id !== ticketId));

      console.log("[DeleteTicket] Deleted:", ticketId);

      return { success: true, message: "Ticket deleted successfully" };
    } catch (error) {
      console.error("[DeleteTicket] Failed:", error);
      return {
        success: false,
        message: "Failed to delete ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Assign moderator
  const assignModerator = async (ticketId, moderatorId) => {
    if (!ticketId || !moderatorId) {
      console.warn("[AssignModerator] Missing ticketId or moderatorId");
      return {
        success: false,
        message: "Ticket ID and Moderator ID are required",
        data: null,
      };
    }

    const allowedRoles = ["lab_assistant", "admin"];
    if (!allowedRoles.includes(role)) {
      console.warn("[AssignModerator] Permission denied for role:", role);
      return {
        success: false,
        message: "You are not authorized to assign moderators",
        data: null,
      };
    }

    setLoading(true);

    try {
      const response = await api.tickets.assignModerator(ticketId, moderatorId);
      const updatedTicket = response.data?.ticket;

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );

      console.log("[AssignModerator] Assigned:", ticketId);

      return {
        success: true,
        message: "Moderator assigned successfully",
        data: updatedTicket,
      };
    } catch (error) {
      console.error("[AssignModerator] Failed:", error);
      return {
        success: false,
        message: "Failed to assign moderator",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  const refreshTickets = async () => {
    console.log("[Tickets] Refresh requested");
    return await getTickets();
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        loading,
        role,
        pagination,
        getTickets,
        getTicketById,
        createTicket,
        updateTicket,
        deleteTicket,
        assignModerator,
        refreshTickets,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);