import React from "react";
import TicketHeader from "./TicketHeader";
import TicketMetaRow from "./TicketMetaRow";

const TicketCard = ({ ticket }) => {
  return (
    <div
      className="glass-card border-border rounded-lg p-5 hover:scale-[1.01] transition-transform duration-300"
    >
      {/* Row 1 */}
      <TicketHeader ticket={ticket} />

      {/* Row 2 */}
      <TicketMetaRow ticket={ticket} />
    </div>
  );
};

export default TicketCard;