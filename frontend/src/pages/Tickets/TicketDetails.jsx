// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useTickets } from "@/hooks/useTickets";
// import TicketStatusBadge from "@/components/tickets/TicketStatusBadge";
// import TicketPriorityBadge from "@/components/tickets/TicketPriorityBadge";
// import TicketTags from "@/components/tickets/TicketTags";

// export default function TicketDetailsPage() {
//   const { id } = useParams();
//   const { fetchTicketById } = useTickets();
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     fetchTicketById(id).then(setTicket);
//   }, [id]);

//   if (!ticket)
//     return <p className="text-gray-400 p-6">Loading ticket...</p>;

//   return (
//     <div className="p-6 text-gray-100">
//       <h1 className="text-3xl text-indigo-400 font-semibold mb-2">
//         {ticket.title}
//       </h1>
//       <div className="flex gap-2 mb-4">
//         <TicketPriorityBadge priority={ticket.priority} />
//         <TicketStatusBadge status={ticket.status} />
//       </div>
//       <p className="text-gray-300 mb-3">{ticket.description}</p>
//       <TicketTags tags={ticket.tags} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";
import TicketStatusBadge from "@/components/tickets/TicketStatusBadge";
import TicketPriorityBadge from "@/components/tickets/TicketPriorityBadge";
import TicketTags from "@/components/tickets/TicketTags";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTicketById } = useTickets();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTicketById(id);
      setTicket(data);
    };
    fetchData();
  }, [id]);

  if (!ticket) {
    return (
      <div className="text-gray-400 text-center mt-20">Loading ticket...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 p-4 sm:p-6 md:p-10">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          onClick={() => navigate("/tickets")}
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </Button>
      </div>

      {/* Ticket Card */}
      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-5 sm:p-7 max-w-4xl mx-auto shadow-lg shadow-blue-900/20">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-2">
          {ticket.title}
        </h2>

        <div className="flex flex-wrap gap-3 mb-4">
          <TicketStatusBadge status={ticket.status} />
          <TicketPriorityBadge priority={ticket.priority} />
        </div>

        <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
          {ticket.description}
        </p>

        <TicketTags tags={ticket.tags} />

        <div className="border-t border-slate-800 mt-6 pt-4 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <img
              src={ticket.createdBy?.avatar || "https://via.placeholder.com/32"}
              alt=""
              className="w-10 h-10 rounded-full border border-slate-600"
            />
            <div>
              <p className="text-sm text-gray-500">Created by</p>
              <p className="text-gray-300 font-medium">
                {ticket.createdBy?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(ticket.createdAt).toLocaleString("en-GB")}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate(`/tickets/${ticket._id}/edit`)}
            >
              Edit
            </Button>
            {/* <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => )}
            >
              Delete
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
