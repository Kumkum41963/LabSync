import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import TicketTags from "./TicketTags";
import ActionButton from "./ActionButton"; 
import { useNavigate } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const handleNavigation = async ()=>{
    navigate(`/tickets/${ticket._id}`)
  }

  return (
    <Card
      onClick={handleNavigation}
      className="
        relative cursor-pointer transition-all hover:scale-[1.01]
        bg-gradient-to-br from-[#0a0f13] via-[#0f1b22] to-[#101820]
        border border-cyan-900/40
        rounded-2xl w-full max-w-7xl mx-auto
        shadow-[0_0_12px_-2px_rgba(0,255,255,0.1)]
        hover:shadow-[0_0_25px_-3px_rgba(127,255,212,0.25)]
        duration-300 ease-out
      "
    >
      {/* ---------- HEADER SECTION ---------- */}
      <CardHeader className="pb-2 sm:pb-2">
        <div
          className="
            border border-cyan-900/40 rounded-xl px-3 py-2 sm:px-4 sm:py-3 
            bg-gradient-to-br from-[#0d1b1e] via-[#0f2230] to-[#0a192f]
            flex flex-col gap-1.5 transition-all duration-300
            hover:shadow-[0_0_18px_-3px_rgba(127,255,212,0.3)]
          "
        >
          {/* Title */}
          <CardTitle
            className="
              text-base sm:text-lg md:text-xl font-semibold
              bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 
              bg-clip-text text-transparent leading-tight break-words
            "
          >
            {ticket.title}
          </CardTitle>

          {/* Status + Priority */}
          <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
        </div>
      </CardHeader>

      {/* ---------- CONTENT SECTION ---------- */}
      <CardContent>
        {/* Description */}
        <div
          className="
            border border-cyan-900/40 rounded-xl 
            bg-gradient-to-br from-[#0e1a21] via-[#0b2230] to-[#0a1f2c]
            p-2 sm:p-3 text-gray-300 text-sm sm:text-base leading-snug 
            line-clamp-4 transition-all duration-300
            hover:border-cyan-700/50
          "
        >
          {ticket.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <TicketTags tags={ticket.tags} />
        </div>

        {/* ---------- FOOTER SECTION (Creator + Actions) ---------- */}
        <div
          className="
            border-t border-cyan-900/40 mt-3 sm:mt-4 pt-3 sm:pt-4
            flex flex-col sm:flex-row justify-between 
            items-start sm:items-center gap-3 sm:gap-0
          "
        >
          {/* Creator Info */}
          <div className="flex items-start gap-3">
            <img
              src={ticket.createdBy?.avatar || 'https://via.placeholder.com/32'}
              alt="avatar"
              className="
                w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                border border-cyan-800 flex-shrink-0
                shadow-[0_0_8px_-2px_rgba(64,224,208,0.4)]
              "
            />
            <div className="text-sm sm:text-base">
              <p className="text-cyan-400/60 leading-tight">Created by</p>
              <p className="text-cyan-200 font-medium leading-tight">
                {ticket.createdBy?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(ticket.createdAt).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Action Buttons (Edit/Delete handled internally in ActionButton) */}
          <ActionButton ticketId={ticket._id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
