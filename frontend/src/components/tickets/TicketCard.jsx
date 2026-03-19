import React from "react";
import TicketHeader from "./TicketHeader";
import TicketMetaRow from "./TicketMetaRow";

const TicketCard = ({ ticket }) => {
  return (
    <div
      className="
        border border-border rounded-xl p-5
        bg-background hover-elevate
        transition-all
      "
    >
      {/* Row 1 */}
      <TicketHeader ticket={ticket} />

      {/* Row 2 */}
      <TicketMetaRow ticket={ticket} />
    </div>
  );
};

export default TicketCard;