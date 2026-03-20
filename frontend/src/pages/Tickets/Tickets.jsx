import React, { useEffect, useState } from "react";
import { useTickets } from "@/context/TicketsContext";
import TicketList from "@/components/tickets/TicketList";
import RaiseTicketButton from "@/components/tickets/RaiseTicketButton";
import TicketsHeader from "@/components/tickets/TicketsHeader";
import PaginationControls from "@/components/tickets/PaginationControls";
import { useRole } from "@/context/RoleContext";

const Tickets = () => {
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

  // on every mount set the tickets paras
  useEffect(() => {
    getTickets(params); // return tickets with matching params
  }, [params]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">
            Manage lab issues and support tickets
          </p>
        </div>

        {/* Create Ticket */}
        <RaiseTicketButton />
      </div>

      {/* Filters + List */}
      <div className="glass-panel bg-card border border-border rounded-lg shadow-sm p-5 space-y-6">
        {/* Search and Filter */}
        <TicketsHeader params={params} setParams={setParams} />

        {/* All Tickets */}
        <TicketList tickets={tickets} />

        <PaginationControls
          page={params.page}
          totalPages={pagination?.totalPages || 1}
          onChange={(page) => setParams((p) => ({ ...p, page }))}
        />
      </div>
    </div>
  );
};

export default Tickets;