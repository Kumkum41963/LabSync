import React, { useEffect, useState } from "react";
import { useTickets } from "@/context/TicketsContext";
import TicketList from "@/components/tickets/TicketList";
import RaiseTicketButton from "@/components/tickets/RaiseTicketButton";
import TicketsHeader from "@/components/tickets/TicketsHeader";
import PaginationControls from "@/components/tickets/PaginationControls";

// In Tickets.jsx

const Tickets = () => {
  // Destructure pagination from useTickets context
  const { tickets, getTickets, pagination } = useTickets();

  const [params, setParams] = useState({
    search: "",
    status: "",
    priority: "",
    tag: "",
    assigned: "",
    sort: "createdAt-desc",
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    // Pass params here so API fetches the correct page/filters!
    getTickets(params);
  }, [params]);

  return (
    <div className="min-h-screen bg-background text-foreground p-3 lg:p-3 space-y-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">
            Manage lab issues and support tickets
          </p>
        </div>
        <RaiseTicketButton />
      </div>

      {/* Filters + List */}
      <div className="glass-panel bg-card border border-border rounded-2xl shadow-sm p-4 space-y-6">
        <TicketsHeader params={params} setParams={setParams} />

        {/* All Tickets */}
        <TicketList tickets={tickets} />

        {/* UNCOMMENTED & WIRED UP */}
        <PaginationControls
          page={params.page}
          totalPages={pagination?.totalPages || 1}
          onChange={(newPage) => 
            setParams((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default Tickets;