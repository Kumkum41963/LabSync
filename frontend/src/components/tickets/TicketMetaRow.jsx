import React from "react";
import { Badge } from "@/components/ui/badge";

const TicketMetaRow = ({ ticket }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Badge className={`badge-${ticket.status.toLowerCase()} border`}>
        {ticket.status}
      </Badge>

      <Badge className={`badge-${ticket.priority.toLowerCase()} border`}>
        {ticket.priority}
      </Badge>

      {ticket.assignedTo && (
        <span className="text-muted-foreground">
          Assigned to:{" "}
          <span className="font-medium text-foreground">
            {ticket.assignedTo.name}
          </span>
        </span>
      )}

      {ticket.tags?.map((tag, i) => (
        <Badge key={i} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TicketMetaRow;