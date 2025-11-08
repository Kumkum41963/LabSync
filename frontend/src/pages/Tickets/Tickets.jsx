import { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import { useTickets } from "@/context/TicketsContext";
import TicketList from "@/components/tickets/TicketList";
import TicketForm from "@/components/tickets/TicketForm";
import RaiseTicketButton from "@/components/tickets/RaiseTicketButton";

export default function Tickets() {
  const { role } = useRole();
  const { tickets, getTickets, createTicket } = useTickets();
  const [creating, setCreating] = useState(false);

  // in every mount we fetch the tickets again to keep it updated
  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="p-6 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-indigo-400">Tickets</h1>
        {(role === "student" || role === "admin")  && <RaiseTicketButton />}
      </div>

      {(role === "student" || role === "admin") && creating ? (
        // show the for to create ticket
        <TicketForm
          onSubmit={async (data) => {
            await createTicket(data);
            setCreating(false);
          }}
          loading={false}
        />
      ) : (
        // else display all fetched tickets from DB 
        <TicketList tickets={tickets} onTicketClick={(t) => console.log("View", t)} />
      )}
    </div>
  );
}

