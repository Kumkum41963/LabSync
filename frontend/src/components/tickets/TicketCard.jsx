import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import TicketTags from "./TicketTags";
import { Button } from "@/components/ui/button";

const TicketCard = ({ ticket, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="relative cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg bg-[#0d1117] border border-slate-800 rounded-2xl w-full max-w-7xl mx-auto shadow-blue-900/20"
    >
      {/* HEADER: Title + Status + Priority */}
      <CardHeader className="pb-2 sm:pb-2">
        <div
          className="border border-slate-700 rounded-xl px-3 py-2 sm:px-4 sm:py-3 bg-[#111827]
                     flex flex-col gap-1.5 transition-all duration-300
                     hover:shadow-md hover:shadow-blue-900/30 w-full"
        >
          {/* Title */}
          <CardTitle
            className="text-base sm:text-lg md:text-xl font-semibold text-gray-100 leading-tight break-words"
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

      {/* DESCRIPTION */}
      <CardContent>
        <div
          className="border border-slate-700 rounded-xl bg-[#111827] p-2 sm:p-3 text-gray-400
                     text-sm sm:text-base leading-snug line-clamp-4 transition-all duration-300"
        >
          {ticket.description}
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-2">
          <TicketTags tags={ticket.tags} />
        </div>

        {/* CREATOR INFO + EDIT BUTTON */}
        <div
          className="border-t border-slate-800 mt-3 sm:mt-4 pt-3 sm:pt-4
                     flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0"
        >
          <div className="flex items-start gap-3">
            <img
              src={ticket.createdBy?.avatar || "https://via.placeholder.com/32"}
              alt="avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-600 flex-shrink-0"
            />
            <div className="text-sm sm:text-base">
              <p className="text-gray-500 leading-tight">Created by</p>
              <p className="text-gray-300 font-medium leading-tight">
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

          <Button
            size="sm"
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg shadow-md shadow-blue-900/30 w-full sm:w-auto"
            onClick={(e) => {
              e.stopPropagation();
              console.log("✏️ Edit clicked for:", ticket._id);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg shadow-md shadow-blue-900/30 w-full sm:w-auto"
            onClick={(e) => {
              e.stopPropagation();
              console.log("✏️ Delete clicked for:", ticket._id);
            }}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
