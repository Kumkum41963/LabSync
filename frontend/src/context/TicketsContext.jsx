import React, { createContext, useContext, useState, useCallback } from "react";
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

  // getTickets to accept params
  const getTickets = async (queryParams = {}) => {
    if (!currentUser) {
      return { success: false, message: "User not logged in", data: null };
    }

    setLoading(true);

    try {
      // Pass queryParams to your API call (e.g., axios params)
      const response = await api.tickets.getAllTickets(queryParams);
      const ticketsList = response.data?.tickets || [];
      const paginationInfo = response.data?.pagination || null;

      setTickets(ticketsList);
      setPagination(paginationInfo);

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
  const getTicketById = useCallback(async (ticketId) => {
    if (!ticketId) {
      // console.warn("[Ticket] Fetch skipped: ticketId missing");
      return { success: false, message: "Ticket ID is required", data: null };
    }

    setLoading(true);

    try {
      const response = await api.tickets.getTicketById(ticketId);
      const ticket = response.data?.ticket;

      // console.log("[Ticket] Loaded:", ticketId);
      // console.log("[Ticket] Data:", ticket);

      if (ticket) {
        setTickets(prevTickets => {
          const exists = prevTickets.some(t => t._id === ticketId || t._id === ticket._id);
          if (exists) {
            return prevTickets.map(t => (t._id === ticketId || t._id === ticket._id) ? ticket : t);
          } else {
            return [...prevTickets, ticket];
          }
        });
      }

      return {
        success: true,
        message: "Ticket fetched successfully",
        data: ticket,
      };
    } catch (error) {
      // console.error("[Ticket] Fetch failed:", error);
      return {
        success: false,
        message: "Failed to fetch ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  }, [setTickets]);

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
      }
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
  const assignMod = async (ticketId, moderatorId) => {
    if (!ticketId || !moderatorId) {
      console.warn("[AssignMod] Missing ticketId or moderatorId");
      return {
        success: false,
        message: "Ticket ID and Moderator ID are required",
        data: null,
      };
    }

    const allowedRoles = ["lab_assistant", "admin"];
    if (!allowedRoles.includes(role)) {
      console.warn("[AssignMod] Permission denied for role:", role);
      return {
        success: false,
        message: "You are not authorized to assign moderators",
        data: null,
      };
    }

    setLoading(true);

    try {
      const response = await api.tickets.assignMod(ticketId, moderatorId);
      const updatedTicket = response.data?.ticket;

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );

      console.log("[AssignMod] Assigned:", ticketId);

      return {
        success: true,
        message: "Moderator assigned successfully",
        data: updatedTicket,
      };
    } catch (error) {
      console.error("[AssignMod] Failed:", error);
      return {
        success: false,
        message: "Failed to assign moderator",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Unassign Mod
  const unassignMod = async (ticketId) => {
    if (!ticketId) {
      console.warn("[UnassignMod] Missing ticketId");
      return { success: false, message: "Ticket ID is required", data: null };
    }

    const allowedRoles = ["lab_assistant", "admin"];
    if (!allowedRoles.includes(role)) {
      console.warn("[UnassignMod] Permission denied for role:", role);
      return {
        success: false,
        message: "You are not authorized to unassign moderators",
        data: null,
      };
    }

    setLoading(true);

    try {
      const response = await api.tickets.unassignMod(ticketId);
      const updatedTicket = response.data?.ticket;

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );

      console.log("[UnassignMod] Unassigned:", ticketId);

      return {
        success: true,
        message: "Moderator unassigned successfully",
        data: updatedTicket,
      };
    } catch (error) {
      console.error("[UnassignMod] Failed:", error);
      return {
        success: false,
        message: "Failed to unassign moderator",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Moderator/Staff update (comment + status with locking check)
  const updateTicketByModerator = async (ticketId, updateData) => {
    if (!ticketId) {
      console.warn("[UpdateTicketByMod] Missing ticketId");
      return { success: false, message: "Ticket ID is required", data: null };
    }

    setLoading(true);

    try {
      const response = await api.tickets.updateTicketByModerator(ticketId, updateData);
      const updatedTicket = response.data?.ticket;

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );

      return {
        success: true,
        message: "Ticket updated successfully",
        data: updatedTicket,
      };
    } catch (error) {
      console.error("[UpdateTicketByMod] Failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update ticket",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  // Get suggested moderators for a specific ticket
  const getSuggestedModerators = async (ticketId) => {
    if (!ticketId) {
      console.warn("[GetSuggestedModerators] Missing ticketId");
      return { success: false, message: "Ticket ID is required", data: [] };
    }

    try {
      const response = await api.tickets.getSuggestedModerators(ticketId);
      const suggested = response.data?.suggestedModerators || response.data || [];

      console.log("[GetSuggestedModerators] Loaded:", suggested.length);
      return {
        success: true,
        message: "Suggested moderators fetched successfully",
        data: suggested,
      };
    } catch (error) {
      console.error("[GetSuggestedModerators] Failed:", error);
      return {
        success: false,
        message: "Failed to fetch suggested moderators",
        error,
        data: [],
      };
    }
  };

  // Fetch comments for a specific ticket
  const getCommentsByTicket = async (ticketId) => {
    console.log(`[DEBUG Context] Fetching comments request for ticketId: ${ticketId}`);
    try {
      const response = await api.comments.getByTicket(ticketId);
      const comments = response.data?.comments || [];
      console.log(`[DEBUG Context] Successfully fetched ${comments.length} comments for ticketId: ${ticketId}`, comments);
      return { success: true, data: comments };
    } catch (error) {
      console.error(`[DEBUG ERROR Context] Failed to fetch comments for ticketId: ${ticketId}`, error);
      return { success: false, data: [] };
    }
  };

  // Add a comment
  const addComment = async (ticketId, text) => {
    console.log(`[DEBUG Context] Attempting to add comment to ticketId: ${ticketId}`, { text });
    setLoading(true);
    try {
      const response = await api.comments.create(ticketId, text);
      const newComment = response.data?.comment;
      console.log(`[DEBUG Context] Comment created successfully on server:`, newComment);

      // Update local tickets state so the ticket reflects the new comment immediately
      setTickets((prev) =>
        prev.map((t) => {
          if (t._id === ticketId) {
            console.log(`[DEBUG Context] Updating local ticket state for ID: ${ticketId} with new comment`);
            return {
              ...t,
              comments: [...(t.comments || []), newComment],
            };
          }
          return t;
        })
      );

      return { success: true, data: newComment };
    } catch (error) {
      console.error(`[DEBUG ERROR Context] Failed to add comment for ticketId: ${ticketId}`, error);
      return { success: false, message: error.response?.data?.message || "Failed to add comment" };
    } finally {
      setLoading(false);
    }
  };

  // Update a comment
  const updateComment = async (commentId, ticketId, text) => {
    console.log(`[DEBUG Context] Attempting to update commentId: ${commentId} for ticketId: ${ticketId}`, { text });
    try {
      const response = await api.comments.update(commentId, text);
      const updatedComment = response.data?.comment;
      console.log(`[DEBUG Context] Comment updated successfully on server:`, updatedComment);

      setTickets((prev) =>
        prev.map((t) => {
          if (t._id === ticketId) {
            console.log(`[DEBUG Context] Updating local ticket state comments array for ticketId: ${ticketId}`);
            return {
              ...t,
              comments: t.comments.map((c) => (c._id === commentId ? updatedComment : c)),
            };
          }
          return t;
        })
      );

      return { success: true, data: updatedComment };
    } catch (error) {
      console.error(`[DEBUG ERROR Context] Failed to update commentId: ${commentId}`, error);
      return { success: false, message: error.response?.data?.message || "Failed to update comment" };
    }
  };

  // Delete a comment
  const deleteComment = async (commentId, ticketId) => {
    console.log(`[DEBUG Context] Attempting to delete commentId: ${commentId} from ticketId: ${ticketId}`);
    try {
      await api.comments.delete(commentId);
      console.log(`[DEBUG Context] CommentId: ${commentId} deleted successfully on server`);

      setTickets((prev) =>
        prev.map((t) => {
          if (t._id === ticketId) {
            console.log(`[DEBUG Context] Removing commentId: ${commentId} from local ticket state array`);
            return {
              ...t,
              comments: t.comments.filter((c) => c._id !== commentId),
            };
          }
          return t;
        })
      );

      return { success: true };
    } catch (error) {
      console.error(`[DEBUG ERROR Context] Failed to delete commentId: ${commentId}`, error);
      return { success: false, message: error.response?.data?.message || "Failed to delete" };
    }
  }

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
        assignMod,
        unassignMod,
        updateTicketByModerator,
        getSuggestedModerators,
        addComment,
        updateComment,
        deleteComment,
        getCommentsByTicket,
        refreshTickets,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);