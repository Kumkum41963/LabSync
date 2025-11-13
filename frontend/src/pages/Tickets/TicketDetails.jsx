import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";
import BackButton from "@/components/tickets/BackButton";
import TicketTags from "@/components/tickets/TicketTags";
import TicketInfoGrid from "@/components/tickets/TicketInfoGrid";
import TicketSection from "@/components/tickets/TicketSection";
import ActionButton from "@/components/tickets/ActionButton";

const TicketDetails = () => {
  const { id } = useParams();
  const { getTicketById } = useTickets();
  const [ticket, setTicket] = useState(null);

  // ✅ Fetch ticket when component mounts or id changes
  useEffect(() => {
    const fetchTicket = async () => {
      const data = await getTicketById(id);
      setTicket(data);
    };
    fetchTicket();
  }, [id, getTicketById]);

  if (!ticket)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading ticket...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f14] text-gray-200 px-4 sm:px-6 md:px-10 py-6">
      {/* 🔙 Back Button */}
      <div className="mb-6">
        <BackButton label="Back to Tickets" />
      </div>

      {/* 🎟️ Ticket Container */}
      <div
        className="
          bg-[#0d1117] border border-slate-800 rounded-2xl 
          shadow-lg shadow-cyan-900/30 
          max-w-6xl mx-auto p-6 sm:p-8
        "
      >
        {/* ---- Header Section ---- */}
        <header className="mb-6 border-b border-slate-700 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="
                text-2xl sm:text-3xl font-semibold tracking-tight
                bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500
                bg-clip-text text-transparent
              "
            >
              {ticket.title}
            </h1>

            {/* ---- Tags ---- */}
            <div className="mt-2 border-t border-slate-800 pt-1">
              {ticket.tags?.length > 0 ? (
                <TicketTags tags={ticket.tags} />
              ) : (
                <p className="text-gray-500 italic">No tags assigned.</p>
              )}
            </div>
          </div>

          {/* ✏️🗑️ Edit / Delete Buttons */}
          <div className="mt-4 sm:mt-0 flex justify-start sm:justify-end">
            <ActionButton ticketId={ticket._id} />
          </div>
        </header>

        {/* ---- Info Grid Section ---- */}
        <TicketInfoGrid
          status={ticket.status}
          priority={ticket.priority}
          createdBy={ticket.createdBy}
          assignedTo={ticket.assignedModerator}
          assignedBy={ticket.assignedByLabAssistant}
        />

        {/* ---- Description + AI Summary in Grid ---- */}
        <div
          className="
            mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 
          "
        >
          <TicketSection title="Description">
            {ticket.description ? (
              <p>{ticket.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description provided.</p>
            )}
          </TicketSection>

          <TicketSection title="AI Summary">
            {ticket.aiSummary ? (
              <p>{ticket.aiSummary}</p>
            ) : (
              <p className="text-gray-500 italic">No AI summary available.</p>
            )}
          </TicketSection>
        </div>

        {/* ---- Meta Info ---- */}
        <div
          className="
            mt-8 border-t border-dotted border-slate-700 pt-4 
            flex flex-wrap justify-between text-xs sm:text-sm text-gray-400
          "
        >
          <p>
            <span className="text-gray-500">Created at: </span>
            {new Date(ticket.createdAt).toLocaleString("en-GB")}
          </p>
          <p>
            <span className="text-gray-500">Updated at: </span>
            {new Date(ticket.updatedAt).toLocaleString("en-GB")}
          </p>
          {ticket.closedAt && (
            <p>
              <span className="text-gray-500">Closed at: </span>
              {new Date(ticket.closedAt).toLocaleString("en-GB")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
