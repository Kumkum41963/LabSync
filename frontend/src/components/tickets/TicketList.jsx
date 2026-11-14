import React from "react";
import TicketCard from "./TicketCard";
import TicketTable from "./TicketTable";
import { useRole } from "@/context/RoleContext";
import { useTickets } from "@/context/TicketsContext";

const TABLE_ROLES = ["admin", "moderator", "lab_assistant"];

const TicketList = ({ tickets = [] }) => {
  const { role } = useRole();
  const { pagination } = useTickets(); // Removed unused getTickets
  
  const isTableView = TABLE_ROLES.includes(role);
  const safeTickets = Array.isArray(tickets) ? tickets : [];

  if (safeTickets.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        No tickets found.
      </div>
    );
  }

  if (isTableView) {
    return (
      <TicketTable
        tickets={safeTickets}
        pagination={pagination}
        // Let TicketTable use the same page update mechanism if needed, 
        // or let TicketTable rely on TicketCard/Tickets pagination
      />
    );
  }

  return (
    <div className="space-y-6">
      {safeTickets.map((ticket) => {
        if (!ticket || !ticket._id) return null;
        return <TicketCard key={ticket._id} ticket={ticket} />;
      })}
    </div>
  );
};

export default TicketList;