import React from 'react'
import TicketCard from "./TicketCard";

const TicketList = ({ tickets = [], onTicketClick }) => {
    if (!tickets.length)
    return (
      <p className="text-gray-400 text-center mt-10">No tickets found.</p>
    );
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map(ticket => (
        <TicketCard key={ticket._id} ticket={ticket} onClick={() => onTicketClick(ticket)} />
      ))}
    </div>
  )
}

export default TicketList