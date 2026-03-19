import React from "react";
import TicketCard from "./TicketCard";

const TicketList = ({ tickets }) => {
  if (!tickets?.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No tickets found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;