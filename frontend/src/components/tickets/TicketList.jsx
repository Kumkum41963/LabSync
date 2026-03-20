import React from "react";
import TicketCard from "./TicketCard";
import TicketTable from "./TicketTable";
import { useRole } from "@/context/RoleContext";

const TABLE_ROLES = ["admin", "moderator", "lab_assistant"]; 
const TicketList = ({ tickets }) => {
  const { role } = useRole();
  console.log('current role:', role)
  const isTableView = TABLE_ROLES.includes(role);
  console.log('view is table:', isTableView)

  if (!tickets?.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No tickets found.
      </div>
    );
  }

  // TABLE VIEW
  if (isTableView) {
    return <TicketTable tickets={tickets} role={role} />;
  }

  // CARD LIST VIEW (existing)
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;